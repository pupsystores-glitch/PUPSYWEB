const STATE_COOKIE = "pupsy_oauth_state";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

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
  const html = `<!doctype html>
<html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PUPSY CMS ავტორიზაცია</title></head>
<body><p>ავტორიზაცია დასრულდა. ეს ფანჯარა დაიხურება…</p>
<script>
(() => {
  const authMessage = ${safeMessage};
  if (!window.opener) {
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
