const STATE_COOKIE = "pupsy_oauth_state";
const ADMIN_URL = "https://pupsystores-glitch.github.io/PUPSYWEB/admin/oauth-callback.html";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      if (request.method === "OPTIONS") return apiResponse(null, 204, request);
      if (!env.VOTES_DB) return apiResponse({ error: "Vote storage is not configured." }, 503, request);
      if (url.pathname === "/api/votes" && request.method === "POST") return castVote(request, env);
      if (url.pathname === "/api/votes" && request.method === "GET") return getVoteCount(url, request, env);
      if (url.pathname === "/api/contacts" && request.method === "POST") return saveContact(request, env);
      if (url.pathname === "/api/contacts/status" && request.method === "POST") return updateContactStatus(request, env);
      if (url.pathname === "/api/stats" && request.method === "GET") return getVoteStats(request, env);
      return apiResponse({ error: "Not found" }, 404, request);
    }

    if (request.method !== "GET") {
      return new Response("Method not allowed", { status: 405, headers: { Allow: "GET" } });
    }

    if (url.pathname === "/auth") {
      return startOAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return finishOAuth(request, url, env);
    }

    return new Response("PUPSY CMS OAuth worker is running.", {
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" },
    });
  },
};

const STORE_ORIGIN = "https://pupsystores-glitch.github.io";
const REPO = "pupsystores-glitch/PUPSYWEB";

function corsHeaders(request) {
  const origin = request.headers.get("Origin") || "";
  const allowed = origin === STORE_ORIGIN || /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
  return {
    "Access-Control-Allow-Origin": allowed ? origin : STORE_ORIGIN,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

function apiResponse(body, status, request) {
  return new Response(body == null ? null : JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
  });
}

async function readJson(request) {
  try { return await request.json(); } catch { return null; }
}

async function castVote(request, env) {
  const body = await readJson(request);
  const productId = typeof body?.productId === "string" ? body.productId.trim().slice(0, 160) : "";
  const title = typeof body?.title === "string" ? body.title.trim().slice(0, 200) : "";
  const voterId = typeof body?.voterId === "string" && /^[a-f0-9-]{32,64}$/i.test(body.voterId) ? body.voterId : "";
  if (!productId || !title || !voterId) return apiResponse({ error: "Invalid vote data." }, 400, request);
  const id = crypto.randomUUID();
  await env.VOTES_DB.prepare("INSERT OR IGNORE INTO votes (id, product_id, product_title, voter_id, created_at) VALUES (?, ?, ?, ?, datetime('now'))")
    .bind(id, productId, title, voterId).run();
  const vote = await env.VOTES_DB.prepare("SELECT id FROM votes WHERE product_id = ? AND voter_id = ?").bind(productId, voterId).first();
  const row = await env.VOTES_DB.prepare("SELECT COUNT(*) AS count FROM votes WHERE product_id = ?").bind(productId).first();
  return apiResponse({ voteId: vote.id, count: row.count, duplicate: vote.id !== id }, 200, request);
}

async function getVoteCount(url, request, env) {
  const productId = (url.searchParams.get("productId") || "").trim().slice(0, 160);
  if (!productId) return apiResponse({ error: "Product ID required." }, 400, request);
  const row = await env.VOTES_DB.prepare("SELECT COUNT(*) AS count FROM votes WHERE product_id = ?").bind(productId).first();
  return apiResponse({ count: row.count }, 200, request);
}

async function saveContact(request, env) {
  const body = await readJson(request);
  const voteId = typeof body?.voteId === "string" ? body.voteId : "";
  const contact = typeof body?.contact === "string" ? body.contact.trim().slice(0, 200) : "";
  if (!/^[0-9a-f-]{36}$/i.test(voteId) || contact.length < 5 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !/^[+\d][\d\s().-]{5,24}$/.test(contact)) {
    return apiResponse({ error: "Enter a valid email address or phone number." }, 400, request);
  }
  const vote = await env.VOTES_DB.prepare("SELECT id FROM votes WHERE id = ?").bind(voteId).first();
  if (!vote) return apiResponse({ error: "Vote not found." }, 404, request);
  await env.VOTES_DB.prepare("INSERT INTO vote_contacts (vote_id, contact, created_at) VALUES (?, ?, datetime('now')) ON CONFLICT(vote_id) DO UPDATE SET contact = excluded.contact, created_at = excluded.created_at")
    .bind(voteId, contact).run();
  return apiResponse({ saved: true }, 200, request);
}

async function updateContactStatus(request, env) {
  const body = await readJson(request);
  const voteId = typeof body?.voteId === "string" ? body.voteId : "";
  const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return apiResponse({ error: "Admin authorization required." }, 401, request);
  if (!/^[0-9a-f-]{36}$/i.test(voteId) || typeof body?.contacted !== "boolean") {
    return apiResponse({ error: "Invalid contact status." }, 400, request);
  }
  const repoResponse = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "PUPSY-votes" },
  });
  if (!repoResponse.ok) return apiResponse({ error: "GitHub admin authorization failed." }, 403, request);
  const repo = await repoResponse.json();
  if (!repo.permissions?.push && !repo.permissions?.admin) return apiResponse({ error: "Repository write access required." }, 403, request);
  const result = await env.VOTES_DB.prepare("UPDATE vote_contacts SET contacted_at = CASE WHEN ? THEN datetime('now') ELSE NULL END WHERE vote_id = ?")
    .bind(body.contacted ? 1 : 0, voteId).run();
  if (!result.meta?.changes) return apiResponse({ error: "Contact request not found." }, 404, request);
  return apiResponse({ saved: true, contacted: body.contacted }, 200, request);
}

async function getVoteStats(request, env) {
  const token = (request.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  if (!token) return apiResponse({ error: "Admin authorization required." }, 401, request);
  const repoResponse = await fetch(`https://api.github.com/repos/${REPO}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "PUPSY-votes" },
  });
  if (!repoResponse.ok) return apiResponse({ error: "GitHub admin authorization failed." }, 403, request);
  const repo = await repoResponse.json();
  if (!repo.permissions?.push && !repo.permissions?.admin) return apiResponse({ error: "Repository write access required." }, 403, request);
  const { results } = await env.VOTES_DB.prepare(`SELECT v.product_id AS productId, v.product_title AS title,
      COUNT(*) AS votes, COUNT(c.vote_id) AS contacts
    FROM votes v LEFT JOIN vote_contacts c ON c.vote_id = v.id
    GROUP BY v.product_id ORDER BY votes DESC, title`).all();
  const leads = await env.VOTES_DB.prepare(`SELECT v.product_id AS productId, v.product_title AS title,
      c.vote_id AS voteId, c.contact AS contact, c.created_at AS createdAt, c.contacted_at AS contactedAt
    FROM vote_contacts c JOIN votes v ON v.id = c.vote_id ORDER BY c.created_at DESC`).all();
  return apiResponse({ products: results || [], leads: leads.results || [] }, 200, request);
}

function startOAuth(url, env) {
  if (!env.GITHUB_CLIENT_ID) {
    return new Response("The GitHub OAuth client is not configured.", { status: 503 });
  }

  if (url.searchParams.get("provider") !== "github") {
    return new Response("Unsupported OAuth provider.", { status: 400 });
  }

  const state = randomToken();
  const redirectUri = new URL("/callback", url.origin).href;
  const githubUrl = new URL("https://github.com/login/oauth/authorize");
  githubUrl.searchParams.set("client_id", env.GITHUB_CLIENT_ID);
  githubUrl.searchParams.set("redirect_uri", redirectUri);
  githubUrl.searchParams.set("scope", "repo,user");
  githubUrl.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: {
      Location: githubUrl.href,
      "Set-Cookie": `${STATE_COOKIE}=${state}; Path=/callback; Max-Age=300; Secure; HttpOnly; SameSite=Lax`,
      "Cache-Control": "no-store",
      "Referrer-Policy": "no-referrer",
    },
  });
}

async function finishOAuth(request, url, env) {
  const params = url.searchParams;
  const stateFromCookie = readCookie(request.headers.get("Cookie"), STATE_COOKIE);
  const stateFromGitHub = params.get("state");

  if (!stateFromCookie || !stateFromGitHub || stateFromCookie !== stateFromGitHub) {
    return callbackError("ავტორიზაციის მოთხოვნა ვადაგასულია ან ვერ დადასტურდა. დახურე ფანჯარა და თავიდან სცადე.", 400);
  }

  if (params.has("error")) {
    return callbackError("GitHub-მა ავტორიზაცია გააუქმა ან უარყო.", 400);
  }

  const code = params.get("code");
  if (!code || !env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
    return callbackError("OAuth-ის საჭირო პარამეტრები ვერ მოიძებნა.", 400);
  }

  try {
    const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "User-Agent": "PUPSY-Decap-CMS",
      },
      body: JSON.stringify({
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: new URL("/callback", url.origin).href,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenResponse.ok || !tokenData.access_token) {
      return callbackError("GitHub-თან ავტორიზაცია ვერ დასრულდა. გადაამოწმე OAuth App-ის callback URL.", 502);
    }

    return callbackSuccess(tokenData.access_token);
  } catch (error) {
    return callbackError("GitHub-თან დაკავშირება ვერ მოხერხდა. სცადე მოგვიანებით.", 502);
  }
}

function callbackSuccess(token) {
  const authMessage = `authorization:github:success:${JSON.stringify({ provider: "github", token })}`;
  const safeMessage = JSON.stringify(authMessage).replaceAll("<", "\\u003c");
  const safeToken = JSON.stringify(token).replaceAll("<", "\\u003c");
  const html = `<!doctype html>
<html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PUPSY CMS ავტორიზაცია</title></head>
<body><p>ავტორიზაცია დასრულდა. ეს ფანჯარა დაიხურება…</p>
<script>
(() => {
  const authMessage = ${safeMessage};
  if (!window.opener) {
    window.location.replace(${JSON.stringify(ADMIN_URL)} + "#oauth_token=" + encodeURIComponent(${safeToken}));
    document.body.textContent = "CMS-ის ფანჯარა ვერ მოიძებნა. დახურე ეს ფანჯარა და თავიდან სცადე.";
    return;
  }
  let completed = false;
  const handshakeTimeout = setTimeout(() => {
    if (completed) return;
    document.body.textContent = "GitHub-თან ავტორიზაცია დასრულდა, მაგრამ CMS-თან კავშირი ვერ შედგა. განაახლე CMS გვერდი და თავიდან სცადე.";
  }, 10000);
  // This handshake carries no credentials. It lets the popup learn its
  // opener's real origin, including local development ports.
  window.opener.postMessage("authorizing:github", "*");
  window.addEventListener("message", (event) => {
    if (event.source !== window.opener || event.data !== "authorizing:github") return;
    if (!isAllowedCmsOrigin(event.origin)) return;
    completed = true;
    clearTimeout(handshakeTimeout);
    window.opener.postMessage(authMessage, event.origin);
    window.close();
  });

  function isAllowedCmsOrigin(value) {
    if (value === "https://pupsystores-glitch.github.io") return true;
    try {
      const origin = new URL(value);
      return origin.protocol === "http:" &&
        (origin.hostname === "localhost" || origin.hostname === "127.0.0.1");
    } catch {
      return false;
    }
  }
})();
</script></body></html>`;

  return new Response(html, {
    status: 200,
    headers: secureHeaders({
      "Content-Type": "text/html; charset=utf-8",
      "Set-Cookie": `${STATE_COOKIE}=; Path=/callback; Max-Age=0; Secure; HttpOnly; SameSite=Lax`,
    }),
  });
}

function callbackError(message, status) {
  return new Response(`<!doctype html><html lang="ka"><meta charset="utf-8"><title>PUPSY CMS</title><p>${message}</p><p>დახურე ეს ფანჯარა და CMS-იდან თავიდან სცადე შესვლა.</p></html>`, {
    status,
    headers: secureHeaders({ "Content-Type": "text/html; charset=utf-8" }),
  });
}

function secureHeaders(extra = {}) {
  return {
    "Cache-Control": "no-store",
    "Referrer-Policy": "no-referrer",
    "X-Content-Type-Options": "nosniff",
    ...extra,
  };
}

function readCookie(cookieHeader, name) {
  if (!cookieHeader) return "";
  const item = cookieHeader.split(";").map((part) => part.trim()).find((part) => part.startsWith(`${name}=`));
  return item ? item.slice(name.length + 1) : "";
}

function randomToken() {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}
