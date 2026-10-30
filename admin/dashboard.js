const GITHUB_REPO = 'pupsystores-glitch/PUPSYWEB';
const GITHUB_BRANCH = 'main';
const GITHUB_API = 'https://api.github.com';
const OAUTH_BASE = 'https://pupsy-decap-oauth.pupsystores.workers.dev';
const collections = [
  { id: 'collars', file: 'collars.json', name: 'საყელურები', icon: 'shield', desc: 'ძაღლისა და კატის საყელურები' },
  { id: 'harnesses', file: 'harnesses.json', name: 'წელსამაგრები', icon: 'paperclip', desc: 'კომფორტული და უსაფრთხო წელსამაგრები' },
  { id: 'leashes', file: 'leashes.json', name: 'საბელები', icon: 'link-2', desc: 'სხვადასხვა სიგრძისა და მასალის საბელები' },
  { id: 'accessories', file: 'accessories.json', name: 'აქსესუარები', icon: 'sparkles', desc: 'აქსესუარები და მისამართის ტეგები' },
  { id: 'hygiene-care', file: 'hygiene-care.json', name: 'ჰიგიენა და მოვლა', icon: 'heart-pulse', desc: 'ჰიგიენისა და მოვლის საშუალებები' },
  { id: 'toys', file: 'toys.json', name: 'სათამაშოები', icon: 'gamepad-2', desc: 'ინტერაქტიული და რბილი სათამაშოები' },
];

const categoryDetails = {
  harnesses: {
    sizeTitle: 'ზომები', benefitsTitle: 'მთავარი უპირატესობები', materialTitle: 'მასალა და მოვლა',
    sizePlaceholder: 'მაგ: კისერი 27–42 სმ; მკერდი 38–55 სმ',
    defaults: {
      size: 'ძალიან პატარა\nკისრის გარშემოწერილობა: 18–32 სმ | 7–12.5 დუიმი\nმუცლის გარშემოწერილობა: 32–40 სმ | 12.5–15.5 დუიმი\n\nპატარა\nკისრის გარშემოწერილობა: 27–42 სმ | 10.5–16.5 დუიმი\nმუცლის გარშემოწერილობა: 38–55 სმ | 15–21.5 დუიმი\n\nსაშუალო\nკისრის გარშემოწერილობა: 34–52 სმ | 13–20 დუიმი\nმუცლის გარშემოწერილობა: 47–70 სმ | 18.5–27.5 დუიმი\n\nდიდი\nკისრის გარშემოწერილობა: 45–62 სმ | 17.5–24 დუიმი\nმუცლის გარშემოწერილობა: 62–95 სმ | 24–37 დუიმი\n\nთუ ზომებს შორის ხართ, აირჩიეთ უფრო დიდი ზომა.\nდიდი ზომის ძაღლებისთვის, რომლებიც ქაჩავენ, წელსამაგრს არ გირჩევთ.\nზომების ყველა გზამკვლევი: guide.html',
      benefits: 'რატომ მოგეწონებათ:\nსუნთქვადი და რბილი საფენი მკერდის არეში\nრეგულირების ოთხი წერტილი ზუსტი და კომფორტული მორგებისთვის\nY-ს ფორმის წინა ნაწილი კისერზე ზეწოლის გარეშე\nღია ოქროსფერი D-რგოლი დახვეწილი იერისთვის\nფერადი შესაკრავები სუფთა და თანამედროვე იერს ქმნის',
      material: 'დამზადებულია პრემიუმ ნეილონის თასმებისა და რბილი, სუნთქვადი მიტონგის ქსოვილისგან.',
    },
  },
  collars: { sizeTitle: 'საყელურის ზომები', benefitsTitle: 'მთავარი უპირატესობები', materialTitle: 'მასალა და მოვლა', sizePlaceholder: 'მიუთითე კისრის გარშემოწერილობა და საყელურის სიგანე.' },
  leashes: { sizeTitle: 'საბელის ზომები და სიგრძე', benefitsTitle: 'მთავარი უპირატესობები', materialTitle: 'მასალა და მოვლა', sizePlaceholder: 'მიუთითე საბელის სიგრძე და სიგანე.' },
  accessories: { sizeTitle: 'ზომა და მახასიათებლები', benefitsTitle: 'მთავარი უპირატესობები', materialTitle: 'მასალა და მოვლა', sizePlaceholder: 'მიუთითე პროდუქტის ზომა ან სხვა მახასიათებელი.' },
  'hygiene-care': { sizeTitle: 'მოცულობა და გამოყენება', benefitsTitle: 'მახასიათებლები', materialTitle: 'შემადგენლობა და გამოყენება', sizePlaceholder: 'მიუთითე მოცულობა, ზომა ან გამოყენების დოზა.' },
  toys: { sizeTitle: 'ზომა და მახასიათებლები', benefitsTitle: 'თამაშის უპირატესობები', materialTitle: 'მასალა და მოვლა', sizePlaceholder: 'მიუთითე სათამაშოს ზომა და შინაური ცხოველის შესაბამისი ზომა.' },
};

let activeCollectionId = 'collars';
let detailFieldsCollectionId = null;
let currentLayout = 'list';
let products = [];
let mediaFiles = [];
let mediaFilesLoaded = false;
let mediaFilesLoading = null;
let collectionFiles = {};
let pageVideosData = { pages: {} };
let pageVideosLoaded = false;
let pageVideosLoading = null;
const stagedProductImageUploads = new Map();
let accessToken = sessionStorage.getItem('pupsy_github_token') || '';
let authPopup = null;

const productSlugLetters = {
  ა: 'a', ბ: 'b', გ: 'g', დ: 'd', ე: 'e', ვ: 'v', ზ: 'z', თ: 't', ი: 'i', კ: 'k',
  ლ: 'l', მ: 'm', ნ: 'n', ო: 'o', პ: 'p', ჟ: 'zh', რ: 'r', ს: 's', ტ: 't', უ: 'u',
  ფ: 'p', ქ: 'k', ღ: 'gh', ყ: 'q', შ: 'sh', ჩ: 'ch', ც: 'ts', ძ: 'dz', წ: 'ts',
  ჭ: 'ch', ხ: 'kh', ჯ: 'j', ჰ: 'h',
};

function productSlugFromTitle(title) {
  return [...String(title || '').trim().toLocaleLowerCase('ka-GE')]
    .map(character => productSlugLetters[character] || (/[a-z0-9]/.test(character) ? character : '-'))
    .join('')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'product';
}

function uniqueProductSlug(title, currentId) {
  const base = productSlugFromTitle(title);
  const used = new Set(products.filter(product => product.id !== currentId).map(product => product.raw?.slug).filter(Boolean));
  if (!used.has(base)) return base;
  let suffix = 2;
  while (used.has(`${base}-${suffix}`)) suffix += 1;
  return `${base}-${suffix}`;
}

function productRouteStub() {
  return '<!doctype html><html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>PUPSY პროდუქტი</title></head><body><script src="../js/cms-product-route.js" defer></script></body></html>\n';
}

async function saveProductRoute(slug) {
  const path = `product-pages/${slug}.html`;
  let sha;
  try {
    sha = (await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`)).sha;
  } catch (error) {
    if (error.status !== 404) throw error;
  }
  await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: `Update product page ${slug}`,
      content: encodeBase64Utf8(productRouteStub()),
      ...(sha ? { sha } : {}),
      branch: GITHUB_BRANCH,
    }),
  });
}

async function deleteProductRoute(slug) {
  if (!slug) return;
  const path = `product-pages/${slug}.html`;
  let route;
  try {
    route = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`);
  } catch (error) {
    if (error.status === 404) return;
    throw error;
  }
  await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Delete product page ${slug}`, sha: route.sha, branch: GITHUB_BRANCH }),
  });
}

window.addEventListener('load', () => {
  lucide.createIcons();
  document.getElementById('github-login-button').addEventListener('click', loginWithGithub);
  document.getElementById('logout-button').addEventListener('click', logout);
  window.addEventListener('message', handleAuthMessage);
  if (accessToken) initializeDashboard().catch(handleLoadError);
});

function loginWithGithub() {
  const button = document.getElementById('github-login-button');
  button.disabled = true;
  button.textContent = 'GitHub იხსნება…';
  authPopup = window.open(`${OAUTH_BASE}/auth?provider=github&scope=repo,user`, 'PUPSY_GitHub_Auth', 'width=960,height=700');
  if (!authPopup) {
    window.location.assign(`${OAUTH_BASE}/auth?provider=github&scope=repo,user&mode=redirect`);
    return;
    button.disabled = false;
    button.textContent = 'GitHub-ით შესვლა';
    setAuthMessage('ავტორიზაციის ფანჯარა დაიბლოკა. დაუშვი popup-ები და თავიდან სცადე.');
    return;
  }
  authPopup.focus();
}

function handleAuthMessage(event) {
  if (event.origin !== OAUTH_BASE) return;
  if (event.data === 'authorizing:github') {
    authPopup?.postMessage(event.data, event.origin);
    return;
  }
  if (typeof event.data !== 'string') return;
  if (event.data.startsWith('authorization:github:error:')) {
    setAuthMessage('GitHub-მა ავტორიზაცია ვერ დაასრულა. თავიდან სცადე.');
    return;
  }
  if (!event.data.startsWith('authorization:github:success:')) return;
  try {
    const payload = JSON.parse(event.data.slice('authorization:github:success:'.length));
    if (!payload.token) throw new Error('GitHub token ვერ მოიძებნა.');
    accessToken = payload.token;
    sessionStorage.setItem('pupsy_github_token', accessToken);
    authPopup?.close();
    setAuthMessage('GitHub-ის მონაცემები იტვირთება…');
    initializeDashboard().catch(handleLoadError);
  } catch (error) {
    setAuthMessage(error.message || 'ავტორიზაციის პასუხი ვერ წავიკითხე.');
  }
}

function setAuthMessage(message) {
  const element = document.getElementById('auth-message');
  if (element) element.textContent = message;
}

function logout() {
  accessToken = '';
  sessionStorage.removeItem('pupsy_github_token');
  document.getElementById('auth-screen').classList.remove('hidden');
  setAuthMessage('ადმინ პანელში შესასვლელად დაუკავშირე GitHub ანგარიში.');
}

async function initializeDashboard() {
  setAuthMessage('GitHub-ის მონაცემები იტვირთება…');
  const results = await Promise.all(collections.map(async collection => {
    const file = await githubFile(`products/categories/${collection.file}`);
    collectionFiles[collection.id] = file;
    return (file.data.products || []).map((raw, index) => productFromRaw(raw, collection, index));
  }));
  products = results.flat();

  const firstWithProducts = collections.find(collection => products.some(product => product.collectionId === collection.id));
  if (!products.some(product => product.collectionId === activeCollectionId) && firstWithProducts) {
    activeCollectionId = firstWithProducts.id;
  }
  populateModalCollectionSelect();
  selectCollection(activeCollectionId);
  initializeVoteStatsView();
  document.getElementById('auth-screen').classList.add('hidden');
  lucide.createIcons();
}

function handleLoadError(error) {
  setAuthMessage(error.message || 'GitHub-ის მონაცემები ვერ ჩაიტვირთა. თავიდან შედი.');
  document.getElementById('github-login-button').disabled = false;
  document.getElementById('github-login-button').textContent = 'GitHub-ით შესვლა';
  document.getElementById('auth-screen').classList.remove('hidden');
  showToast(error.message || 'GitHub-თან დაკავშირება ვერ მოხერხდა');
}

function productFromRaw(raw, collection, index) {
  const image = productPhotoUrls(raw)[0] || raw.image || raw.imageUrl || '';
  return {
    id: `${collection.id}:${index}`,
    collectionId: collection.id,
    title: raw.title || '',
    price: Number(raw.price || 0),
    comingSoon: raw.comingSoon === true,
    size: raw.size || (Array.isArray(raw.attributes) ? raw.attributes.join(', ') : 'არ აქვს'),
    colors: Array.isArray(raw.colors) ? raw.colors : [],
    sizeDetails: raw.sizeDetails || '',
    benefits: raw.benefits || '',
    materialCare: raw.materialCare || '',
    image,
    desc: raw.description || '',
    raw,
    index,
  };
}

function productPhotoUrls(raw) {
  const images = [];
  (Array.isArray(raw.photos) ? raw.photos : []).forEach(photo => {
    if (photo.source === 'gallery' && Array.isArray(photo.images)) images.push(...photo.images);
    if (photo.source === 'links') images.push(photo.link1, photo.link2, photo.link3, photo.link4, photo.link5);
  });
  if (!images.length) images.push(raw.image, ...(Array.isArray(raw.images) ? raw.images : []));
  return [...new Set(images.filter(value => typeof value === 'string' && value.trim()).map(value => value.trim()))];
}

async function githubRequest(path, options = {}) {
  const response = await fetch(`${GITHUB_API}${path}`, {
    ...options,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${accessToken}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.message || `GitHub API შეცდომა (${response.status})`);
    error.status = response.status;
    error.details = data.errors || [];
    throw error;
  }
  return data;
}

function decodeBase64Utf8(value) {
  const binary = atob(value.replace(/\s/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
}

function encodeBase64Utf8(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

async function githubFile(path) {
  const result = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}?ref=${GITHUB_BRANCH}`);
  return { sha: result.sha, data: JSON.parse(decodeBase64Utf8(result.content)) };
}

async function commitJson(path, data) {
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const latest = await githubFile(path);
    try {
      const result = await githubRequest(`/repos/${GITHUB_REPO}/contents/${path}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Update ${path.split('/').pop()} from PUPSY CMS`,
          content: encodeBase64Utf8(`${JSON.stringify(data, null, 2)}\n`),
          sha: latest.sha,
          branch: GITHUB_BRANCH,
        }),
      });
      return result.content.sha;
    } catch (error) {
      if (error.status !== 409 || attempt === 2) throw error;
      await new Promise(resolve => setTimeout(resolve, 400 * (attempt + 1)));
    }
  }
}

async function loadMediaFiles() {
  const entries = await githubRequest(`/repos/${GITHUB_REPO}/contents/images/uploads?ref=${GITHUB_BRANCH}`);
  return entries
    .filter(file => file.type === 'file' && /\.(png|jpe?g|webp|gif|avif)$/i.test(file.name))
    .map(file => ({ id: file.sha, name: file.name, url: `/PUPSYWEB/images/uploads/${encodeURIComponent(file.name)}` }));
}

function switchMainTab(tab) {
  const selected = 'flex-1 min-w-0 justify-center px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 transition-all bg-indigo-600 text-white active-tab-glow';
  const idle = 'flex-1 min-w-0 justify-center px-2.5 py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 text-slate-400 hover:text-white transition-all';
  ['contents', 'media', 'videos', 'stats', 'editor'].forEach(view => {
    document.getElementById(`${view}-view`).classList.toggle('hidden', view !== tab);
    const button = document.getElementById(`tab-${view}-btn`);
    if (button) button.className = view === tab ? selected : idle;
  });
  document.getElementById('site-editor-open')?.classList.toggle('ring-2', tab === 'editor');
  const main = document.querySelector('main');
  if (main) main.style.maxWidth = tab === 'editor' ? 'none' : '';
  if (tab === 'media') loadMediaView();
  if (tab === 'videos') loadPageVideosView();
  if (tab === 'editor') loadEditorPage();
  if (tab === 'stats') loadVoteStats();
}

async function loadMediaView() {
  if (mediaFilesLoaded) return;
  if (!mediaFilesLoading) mediaFilesLoading = loadMediaFiles()
    .then(files => { mediaFiles = files; mediaFilesLoaded = true; renderMediaGallery(); })
    .catch(error => showToast(error.message || 'Media library could not be loaded.'))
    .finally(() => { mediaFilesLoading = null; });
  await mediaFilesLoading;
}

async function loadPageVideosView() {
  if (pageVideosLoaded) return;
  if (!pageVideosLoading) pageVideosLoading = githubFile('content/page-videos.json')
    .then(file => { pageVideosData = file.data || { pages: {} }; pageVideosLoaded = true; renderPageVideos(); })
    .catch(error => showToast(error.message || 'Page videos could not be loaded.'))
    .finally(() => { pageVideosLoading = null; });
  await pageVideosLoading;
}

let editorSelection = null;
let editorLoadedPage = '';
let editorLoadedUrl = '';
let editorFrameBindGeneration = 0;
let editorSelectedNode = null;
const boundEditorDocuments = new WeakSet();
const pendingEditorHtml = new Map();
const pendingEditorJson = new Map();
const pendingEditorAssets = new Map();
const pendingProductRoutes = new Set();

function updateEditorSaveButton() {
  const button = document.getElementById('site-editor-save-changes');
  if (!button) return;
  button.classList.toggle('hidden', !pendingEditorHtml.size && !pendingEditorJson.size && !pendingEditorAssets.size && !pendingProductRoutes.size);
}

function stageEditorHtml(path, sha, content, message) {
  const existing = pendingEditorHtml.get(path);
  pendingEditorHtml.set(path, { sha: existing?.sha || sha, content, message });
  updateEditorSaveButton();
}

function stageEditorJson(path, data) {
  pendingEditorJson.set(path, data);
  updateEditorSaveButton();
}

function replaceEditorAssetReferences(value, publishedAssets) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => { value[index] = replaceEditorAssetReferences(item, publishedAssets); });
    return value;
  }
  if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) value[key] = replaceEditorAssetReferences(item, publishedAssets);
    return value;
  }
  if (typeof value === 'string') {
    let result = value;
    for (const [token, url] of publishedAssets) result = result.replaceAll(token, url);
    return result;
  }
  return value;
}

async function saveEditorChanges() {
  const status = document.getElementById('site-editor-status');
  if (!pendingEditorHtml.size && !pendingEditorJson.size && !pendingEditorAssets.size && !pendingProductRoutes.size) return;
  status.textContent = 'ცვლილებები ინახება…';
  try {
    const stagedPayloads = [...pendingEditorHtml.values()].map(draft => draft.content).join('\n') + JSON.stringify([...pendingEditorJson.values()]);
    for (const [token, asset] of pendingEditorAssets) {
      if (!stagedPayloads.includes(token)) {
        URL.revokeObjectURL(asset.previewUrl);
        pendingEditorAssets.delete(token);
      }
    }
    const publishedAssets = new Map();
    for (const [token, asset] of pendingEditorAssets) {
      if (!asset.publishedUrl) {
        const content = encodeBase64Utf8FromBytes(await asset.file.arrayBuffer());
        await githubRequest(`/repos/${GITHUB_REPO}/contents/images/uploads/${encodeURIComponent(asset.filename)}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: `Upload ${asset.filename} from visual editor`, content, branch: GITHUB_BRANCH }),
        });
        asset.publishedUrl = `/PUPSYWEB/images/uploads/${encodeURIComponent(asset.filename)}`;
      }
      publishedAssets.set(token, asset.publishedUrl);
    }
    if (publishedAssets.size) {
      for (const [path, draft] of pendingEditorHtml) {
        for (const [token, url] of publishedAssets) draft.content = draft.content.replaceAll(token, url);
        pendingEditorHtml.set(path, draft);
      }
      for (const data of pendingEditorJson.values()) replaceEditorAssetReferences(data, publishedAssets);
    }
    for (const [path, draft] of pendingEditorHtml) {
      await commitEditorHtml(path, draft.sha, draft.content, draft.message);
      pendingEditorHtml.delete(path);
      updateEditorSaveButton();
    }
    for (const [path, data] of pendingEditorJson) {
      await commitJson(path, data);
      pendingEditorJson.delete(path);
      updateEditorSaveButton();
    }
    for (const slug of pendingProductRoutes) {
      await deleteProductRoute(slug);
      pendingProductRoutes.delete(slug);
      updateEditorSaveButton();
    }
    for (const asset of pendingEditorAssets.values()) URL.revokeObjectURL(asset.previewUrl);
    pendingEditorAssets.clear();
    updateEditorSaveButton();
    status.textContent = 'ცვლილებები შენახულია. გვერდი განახლდება…';
    loadEditorPage(true);
  } catch (error) {
    status.textContent = error.message || 'ცვლილებების შენახვა ვერ მოხერხდა.';
  }
}

function loadEditorPage(force = false) {
  const page = document.getElementById('site-editor-page')?.value;
  const frame = document.getElementById('site-editor-frame');
  if (!page || !frame || (!force && editorLoadedPage === page)) return;
  editorLoadedPage = page;
  clearEditorSelection();
  editorLoadedUrl = `https://pupsystores-glitch.github.io/PUPSYWEB/${page}?admin-preview=${Date.now()}`;
  frame.src = editorLoadedUrl;
  editorFrameBindGeneration += 1;
  bindEditorFrameWhenReady(page, editorFrameBindGeneration, editorLoadedUrl);
}

function bindEditorFrameWhenReady(page, generation, expectedUrl = editorLoadedUrl) {
  const frame = document.getElementById('site-editor-frame');
  let attempts = 0;
  const attemptBind = () => {
    if (generation !== editorFrameBindGeneration || editorLoadedPage !== page || attempts++ >= 750) return;
    try {
      const doc = frame?.contentDocument;
      if (doc?.location.href === expectedUrl && doc.readyState !== 'loading') {
        bindEditorFrame();
        if (boundEditorDocuments.has(doc)) return;
      }
    } catch { /* wait until the same-origin preview document is available */ }
    window.setTimeout(attemptBind, 40);
  };
  attemptBind();
}

function clearEditorSelection() {
  editorSelection = null;
  editorSelectedNode = null;
  const preview = document.getElementById('site-editor-selected-image');
  preview?.classList.add('hidden');
  document.getElementById('site-editor-media-tools')?.classList.remove('hidden');
  document.getElementById('site-editor-text-tools')?.classList.add('hidden');
  document.getElementById('site-editor-product-tools')?.classList.add('hidden');
  document.getElementById('site-editor-selection-hint').textContent = 'აირჩიეთ ფოტო, ტექსტი ან სექცია გადახედვის ფანჯარაში.';
  document.getElementById('site-editor-status').textContent = '';
}

function bindEditorFrame() {
  const frame = document.getElementById('site-editor-frame');
  try {
    const doc = frame.contentDocument;
    if (!doc) return;
    if (boundEditorDocuments.has(doc)) return;
    boundEditorDocuments.add(doc);
    const editorStyle = doc.createElement('style');
    editorStyle.dataset.adminEditorStyles = 'true';
    editorStyle.textContent = '*{cursor:crosshair!important}';
    (doc.head || doc.documentElement).append(editorStyle);
    doc.defaultView.addEventListener('click', event => {
      document.getElementById('site-editor-status').textContent = '';
      event.preventDefault();
      event.stopImmediatePropagation();
      const target = event.target instanceof doc.defaultView.Element ? event.target : event.target?.parentElement;
      if (!target) return;
      const clicked = target.closest('img, video, h1, h2, h3, h4, h5, p, button, a, li, span, strong, label, summary, section, article, div');
      const anchor = target.closest('a[data-admin-original-href], a[data-admin-original-product-link], a[data-product-link], a[href]');
      const card = target.closest('.cms-product-card, [class*="product-card"], [class*="product-item"]')
        || anchor?.closest('.cms-product-card, [class*="product-card"], [class*="product-item"]');
      let element = clicked || target;
      if (!(element instanceof doc.defaultView.HTMLElement)) return;
      let backgroundElement = null;
      let backgroundUrl = '';
      for (let candidate = element; candidate && candidate.tagName !== 'HTML'; candidate = candidate.parentElement) {
        const backgroundImage = doc.defaultView.getComputedStyle(candidate).backgroundImage;
        const match = /url\((?:"|')?(.*?)(?:"|')?\)/i.exec(backgroundImage);
        if (match?.[1]) {
          backgroundElement = candidate;
          backgroundUrl = match[1];
          break;
        }
      }
      let mediaElement = ['img', 'video'].includes(element.tagName.toLowerCase())
        ? element
        : backgroundElement ? null : card?.querySelector('img, video');
      if (backgroundElement && !mediaElement) element = backgroundElement;
      if (editorSelectedNode?.ownerDocument === doc) {
        editorSelectedNode.removeAttribute('data-admin-editor-selected');
        editorSelectedNode.style.outline = '';
        editorSelectedNode.style.outlineOffset = '';
      }
      editorSelectedNode = element;
      element.setAttribute('data-admin-editor-selected', 'true');
      element.style.outline = '3px solid #f59e0b';
      element.style.outlineOffset = '2px';
      const tagName = element.tagName.toLowerCase();
      const mediaTagName = mediaElement?.tagName.toLowerCase() || (backgroundElement ? 'background' : '');
      const sourceAttribute = mediaElement
        ? ['src', 'data-src', 'data-original'].find(name => mediaElement.getAttribute(name))
        : backgroundElement ? 'background-image' : '';
      const attributeValue = mediaElement ? mediaElement.getAttribute(sourceAttribute) : backgroundUrl;
      const identityClass = [...element.classList].find(name => !name.startsWith('admin-editor-')) || '';
      const identityNodes = element.id
        ? [element]
        : identityClass
          ? doc.querySelectorAll(`${tagName}.${doc.defaultView.CSS.escape(identityClass)}`)
          : doc.getElementsByTagName(tagName);
      const productIdentityClass = card ? ([...card.classList].find(name => !['grid-item', 'is-visible'].includes(name)) || '') : '';
      const productNodes = card
        ? card.id ? [card]
          : productIdentityClass ? doc.querySelectorAll(`${card.tagName.toLowerCase()}.${doc.defaultView.CSS.escape(productIdentityClass)}`) : []
        : [];
      const productAccordion = element.closest('.product-accordion');
      const accordionIndex = productAccordion ? [...doc.querySelectorAll('.product-accordion details')].indexOf(element.closest('details')) : -1;
      const productField = element.closest('.cms-product-card__title') ? 'title'
        : element.closest('.cms-product-card__price') ? 'price'
          : productAccordion && element.closest('summary') ? (['', 'detailsLabel:size', 'detailsLabel:benefits', 'detailsLabel:material'][accordionIndex] || '')
            : productAccordion ? (['description', 'sizeDetails', 'benefits', 'materialCare'][accordionIndex] || '')
            : element.closest('.product__title') ? 'title'
              : element.closest('[data-product-price]') ? 'price' : '';
      const pageSlug = document.getElementById('site-editor-page').value.match(/product-pages\/([^/]+)\.html/i)?.[1]
        || card?.getAttribute('href')?.match(/product-pages\/([^/]+)\.html/i)?.[1] || '';
      const productTitle = card?.querySelector('.cms-product-card__title')?.textContent.trim()
        || card?.querySelector('.product-item__title')?.textContent.trim()
        || doc.querySelector('.product__title')?.textContent.trim() || '';
      const loadedProduct = products.find(item => item.raw?.slug === pageSlug || productSlugFromTitle(item.title) === pageSlug || (productTitle && item.title === productTitle));
      const fieldValue = productField && loadedProduct ? loadedProduct.raw[productField] : undefined;
      const productPriceText = card?.querySelector('.cms-product-card__price, .product-item__price')?.textContent.match(/[\d,]+(?:\.\d+)?/g)?.at(-1) || '';
      const productColors = loadedProduct?.raw?.colors || [...(card?.querySelectorAll('tooltip-component[data-tooltip]') || [])].map(item => item.getAttribute('data-tooltip')).filter(Boolean);
      const isProductCard = Boolean(card && (card.classList.contains('cms-product-card') || card.classList.contains('product-item') || card.className.toString().includes('product-item')));
      editorSelection = {
        page: document.getElementById('site-editor-page').value,
        tagName,
        id: element.id,
        className: element.className?.toString() || '',
        identityClass,
        text: element.textContent.trim(),
        occurrence: Math.max(0, Array.prototype.indexOf.call(identityNodes, element)),
        mediaOccurrence: mediaElement && sourceAttribute ? [...(card || doc).querySelectorAll(mediaTagName)].filter(item => item.getAttribute(sourceAttribute) === attributeValue).indexOf(mediaElement) : 0,
        href: anchor?.dataset.adminOriginalHref || anchor?.dataset.adminOriginalProductLink || anchor?.getAttribute('href') || anchor?.getAttribute('data-product-link') || '',
        productHref: card?.dataset.adminOriginalHref || card?.dataset.adminOriginalProductLink || card?.getAttribute('href') || card?.getAttribute('data-product-link') || card?.querySelector('a[data-admin-original-href], a[data-admin-original-product-link], a[data-product-link], a[href]')?.dataset.adminOriginalHref || card?.querySelector('a[data-admin-original-product-link]')?.dataset.adminOriginalProductLink || card?.querySelector('a[href]')?.getAttribute('href') || card?.querySelector('a[data-product-link]')?.getAttribute('data-product-link') || '',
        productSlug: pageSlug,
        productTitle,
        productId: card?.id || '',
        productTagName: card?.tagName.toLowerCase() || '',
        productIdentityClass,
        productOccurrence: Math.max(0, Array.prototype.indexOf.call(productNodes, card)),
        isProductCard,
        productPrice: loadedProduct?.raw?.price ?? productPriceText.replace(/,/g, ''),
        productColors,
        productField,
        sourceAttribute,
        mediaTagName,
        backgroundUrl,
        attributeValue,
        resolvedSrc: backgroundUrl || mediaElement?.currentSrc || mediaElement?.src || '',
        alt: element.alt || '',
        canEditText: (!element.children.length && !['img', 'video', 'input', 'br', 'hr'].includes(tagName)) || Boolean(productField),
        editTextValue: fieldValue !== undefined
          ? (productField === 'price' && Number.isFinite(Number(fieldValue)) ? Number(fieldValue).toFixed(2) : String(fieldValue))
          : element.textContent.trim(),
      };
      const preview = document.getElementById('site-editor-selected-image');
      const isMedia = Boolean(mediaElement || backgroundElement);
      document.getElementById('site-editor-media-tools').classList.toggle('hidden', !isMedia);
      document.getElementById('site-editor-text-tools').classList.toggle('hidden', isMedia);
      document.getElementById('site-editor-product-tools').classList.toggle('hidden', !isProductCard);
      if (mediaTagName === 'video') preview.classList.add('hidden');
      else if (backgroundElement) {
        preview.src = backgroundUrl;
        preview.classList.remove('hidden');
      }
      else {
        if (mediaTagName === 'img') {
          preview.src = mediaElement.currentSrc || mediaElement.src;
          preview.classList.remove('hidden');
        } else preview.classList.add('hidden');
      }
      document.getElementById('site-editor-selection-hint').textContent = element.alt || `${tagName.toUpperCase()} მონიშნულია.`;
      document.getElementById('site-editor-text-value').value = editorSelection.editTextValue;
      document.getElementById('site-editor-text-value').disabled = !editorSelection.canEditText;
      document.getElementById('site-editor-save-text').disabled = !editorSelection.canEditText;
      document.getElementById('site-editor-save-text').classList.toggle('opacity-40', !editorSelection.canEditText);
      if (isProductCard) {
        document.getElementById('site-editor-product-title').value = productTitle;
        document.getElementById('site-editor-product-price').value = productPriceText.replace(/,/g, '') || loadedProduct?.raw?.price || '';
        renderEditorProductColors(productColors);
      }
      document.querySelector('#site-editor-text-tools label').textContent = editorSelection.canEditText ? 'ტექსტის შეცვლა' : 'სექცია მონიშნულია';
    }, true);
  } catch {
    document.getElementById('site-editor-status').textContent = 'ამ გვერდის გადახედვა ვერ ჩაიტვირთა.';
  }
}

document.getElementById('site-editor-frame')?.addEventListener('load', bindEditorFrame);

function escapeHtmlAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function findEditorImageTag(html, selection) {
  let source = html;
  let offset = 0;
  if (selection.productId) {
    const cardRange = editorTagRange(html, {
      tagName: selection.productTagName,
      id: selection.productId,
      identityClass: selection.productIdentityClass,
      occurrence: selection.productOccurrence,
    });
    if (cardRange) {
      source = html.slice(cardRange.start, cardRange.end);
      offset = cardRange.start;
    }
  }
  const candidates = [];
  const tagName = selection.mediaTagName || selection.tagName || 'img';
  const tagPattern = new RegExp(`<${tagName}\\b[^>]*>`, 'gi');
  for (const match of source.matchAll(tagPattern)) {
    const tag = match[0];
    const attribute = new RegExp(`\\b${selection.sourceAttribute}\\s*=\\s*(["'])(.*?)\\1`, 'i').exec(tag);
    if (attribute) {
      const decoded = attribute[2].replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"');
      if (decoded === selection.attributeValue) candidates.push({ tag, index: offset + match.index });
    }
  }
  return candidates[selection.mediaOccurrence ?? selection.occurrence] || null;
}

function escapeEditorText(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function editorTagRange(html, selection) {
  const candidates = [];
  const openPattern = new RegExp(`<${selection.tagName}\\b[^>]*>`, 'gi');
  for (const match of html.matchAll(openPattern)) {
    const tag = match[0];
    const id = /\bid\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2] || '';
    const classes = /\bclass\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2]?.split(/\s+/) || [];
    const openEnd = match.index + tag.length;
    const tokens = new RegExp(`<\\/?${selection.tagName}\\b[^>]*>`, 'gi');
    tokens.lastIndex = openEnd;
    let depth = 1;
    let closeStart = -1;
    let end = -1;
    let token;
    while ((token = tokens.exec(html))) {
      if (token[0].startsWith('</')) depth -= 1;
      else if (!token[0].endsWith('/>')) depth += 1;
      if (depth === 0) { closeStart = token.index; end = tokens.lastIndex; break; }
    }
    if (end < 0) continue;
    candidates.push({ start: match.index, openEnd, closeStart, end, id, classes });
  }
  if (!candidates.length) return null;
  let matching = selection.id ? candidates.filter(candidate => candidate.id === selection.id) : [];
  if (!matching.length && selection.identityClass) matching = candidates.filter(candidate => candidate.classes.includes(selection.identityClass));
  if (!matching.length && selection.text) {
    matching = candidates.filter(candidate => {
      const textTemplate = document.createElement('template');
      textTemplate.innerHTML = html.slice(candidate.openEnd, candidate.closeStart);
      return textTemplate.content.textContent.trim() === selection.text;
    });
  }
  if (!matching.length) matching = candidates;
  const index = Math.min(Math.max(Number(selection.occurrence) || 0, 0), matching.length - 1);
  return matching[index] || null;
}

function editorLiveSelector(element) {
  if (!element || element.nodeType !== 1) return '';
  const parts = [];
  let current = element;
  while (current && current.tagName !== 'HTML') {
    if (current.id) {
      parts.unshift(`#${CSS.escape(current.id)}`);
      break;
    }
    let uniqueDataSelector = '';
    for (const attribute of ['data-section-id', 'data-product-id', 'data-block-id', 'data-product-handle']) {
      const value = current.getAttribute(attribute);
      if (!value) continue;
      const escapedValue = value.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      const candidate = `[${attribute}="${escapedValue}"]`;
      if (current.ownerDocument.querySelectorAll(candidate).length === 1) { uniqueDataSelector = candidate; break; }
    }
    if (uniqueDataSelector) {
      parts.unshift(uniqueDataSelector);
      break;
    }
    const tag = current.tagName.toLowerCase();
    const classes = [...current.classList].filter(name => !/^(?:admin-editor-|aos-animate$|is-visible$|is-hidden$|is-active$|is-selected$|active$|loaded$|is-loaded$|is-initialized$|animated$)/i.test(name));
    let part = tag + classes.map(name => `.${CSS.escape(name)}`).join('');
    const siblings = [...(current.parentElement?.children || [])].filter(item => item.tagName === current.tagName);
    if (siblings.length > 1) part += `:nth-of-type(${siblings.indexOf(current) + 1})`;
    parts.unshift(part);
    current = current.parentElement;
  }
  return parts.join(' > ');
}

function stageEditorLiveElementDeletion(page, element) {
  const selector = editorLiveSelector(element);
  if (!selector) return false;
  const css = `${selector.replace(/</g, '\\3c ')}{display:none!important}`;
  const style = `<style data-admin-editor-deletions>${css}</style>`;
  const existing = page.content.match(/<style\b[^>]*data-admin-editor-deletions[^>]*>[\s\S]*?<\/style>/i);
  const updated = existing
    ? page.content.replace(existing[0], existing[0].replace('</style>', `${css}</style>`))
    : page.content.includes('</body>') ? page.content.replace('</body>', `${style}</body>`) : `${page.content}${style}`;
  stageEditorHtml(editorSelection.page, page.sha, updated, `Delete rendered section on ${editorSelection.page}`);
  return true;
}

function stageEditorHiddenProduct(page, slug) {
  const value = String(slug || '').trim();
  if (!value) return false;
  const hidden = [...page.content.matchAll(/<meta\b[^>]*\bdata-admin-hidden-product\s*=\s*(["'])(.*?)\1[^>]*>/gi)]
    .map(match => match[2].replace(/&amp;/g, '&').replace(/&quot;/g, '"'));
  if (hidden.includes(value)) return true;
  const meta = `<meta data-admin-hidden-product="${escapeHtmlAttribute(value)}">`;
  const updated = /<\/head>/i.test(page.content)
    ? page.content.replace(/<\/head>/i, `${meta}</head>`)
    : `${meta}${page.content}`;
  stageEditorHtml(editorSelection.page, page.sha, updated, `Hide product card on ${editorSelection.page}`);
  return true;
}

function stageEditorLiveTextEdit(page, element, value) {
  const selector = editorLiveSelector(element);
  if (!selector) return false;
  const existing = page.content.match(/<script\b([^>]*data-admin-editor-text-edits="([^"]*)"[^>]*)>[\s\S]*?<\/script>/i);
  let edits = [];
  if (existing) {
    try { edits = JSON.parse(decodeURIComponent(existing[2])); } catch { edits = []; }
  }
  const previous = edits.find(edit => edit.selector === selector);
  if (previous) previous.value = value;
  else edits.push({ selector, value });
  const encoded = encodeURIComponent(JSON.stringify(edits));
  const script = `<script data-admin-editor-text-edits="${encoded}">(function(){const current=document.currentScript;const edits=JSON.parse(decodeURIComponent(current.dataset.adminEditorTextEdits));let observer;const apply=()=>{let complete=true;for(const edit of edits){const target=document.querySelector(edit.selector);if(target)target.textContent=edit.value;else complete=false}if(complete)observer.disconnect()};observer=new MutationObserver(apply);observer.observe(document.documentElement,{childList:true,subtree:true});apply();setTimeout(()=>observer.disconnect(),30000)})();</script>`;
  const updated = existing
    ? page.content.replace(existing[0], script)
    : page.content.includes('</body>') ? page.content.replace('</body>', `${script}</body>`) : `${page.content}${script}`;
  stageEditorHtml(editorSelection.page, page.sha, updated, `Edit rendered text on ${editorSelection.page}`);
  return true;
}

function stageEditorLiveBackgroundEdit(page, element, url) {
  const selector = editorLiveSelector(element);
  if (!selector) return false;
  const existing = page.content.match(/<script\b([^>]*data-admin-editor-background-edits="([^"]*)"[^>]*)>[\s\S]*?<\/script>/i);
  let edits = [];
  if (existing) {
    try { edits = JSON.parse(existing[2].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<')); } catch { edits = []; }
  }
  const cssValue = url ? `url(${JSON.stringify(url)})` : 'none';
  const previous = edits.find(edit => edit.selector === selector);
  if (previous) previous.value = cssValue;
  else edits.push({ selector, value: cssValue });
  const encoded = escapeHtmlAttribute(JSON.stringify(edits));
  const script = `<script data-admin-editor-background-edits="${encoded}">(function(){const edits=JSON.parse(document.currentScript.dataset.adminEditorBackgroundEdits);let observer;const apply=()=>{let complete=true;for(const edit of edits){const target=document.querySelector(edit.selector);if(target)target.style.setProperty('background-image',edit.value,'important');else complete=false}if(complete)observer.disconnect()};observer=new MutationObserver(apply);observer.observe(document.documentElement,{childList:true,subtree:true});apply();setTimeout(()=>observer.disconnect(),30000)})();</script>`;
  const updated = existing
    ? page.content.replace(existing[0], script)
    : page.content.includes('</body>') ? page.content.replace('</body>', `${script}</body>`) : `${page.content}${script}`;
  stageEditorHtml(editorSelection.page, page.sha, updated, `Edit background image on ${editorSelection.page}`);
  return true;
}

function stageEditorLiveImageEdit(page, element, url) {
  const selector = editorLiveSelector(element);
  if (!selector) return false;
  const existing = page.content.match(/<script\b([^>]*data-admin-editor-image-edits="([^"]*)"[^>]*)>[\s\S]*?<\/script>/i);
  let edits = [];
  if (existing) {
    try { edits = JSON.parse(existing[2].replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<')); } catch { edits = []; }
  }
  const previous = edits.find(edit => edit.selector === selector);
  if (previous) previous.url = url;
  else edits.push({ selector, url });
  const encoded = escapeHtmlAttribute(JSON.stringify(edits));
  const script = `<script data-admin-editor-image-edits="${encoded}">(function(){const edits=JSON.parse(document.currentScript.dataset.adminEditorImageEdits);let observer;const apply=()=>{let complete=true;for(const edit of edits){const target=document.querySelector(edit.selector);if(target){target.removeAttribute('srcset');target.removeAttribute('data-src');target.removeAttribute('data-original');target.setAttribute('src',edit.url);target.loading='eager'}else complete=false}if(complete)observer.disconnect()};observer=new MutationObserver(apply);observer.observe(document.documentElement,{childList:true,subtree:true});apply();setTimeout(()=>observer.disconnect(),30000)})();</script>`;
  const updated = existing
    ? page.content.replace(existing[0], script)
    : page.content.includes('</body>') ? page.content.replace('</body>', `${script}</body>`) : `${page.content}${script}`;
  stageEditorHtml(editorSelection.page, page.sha, updated, `Replace rendered image on ${editorSelection.page}`);
  return true;
}

async function editorHtmlFile(path) {
  const file = await githubRequest(`/repos/${GITHUB_REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${GITHUB_BRANCH}`);
  let content;
  if (typeof file.content === 'string' && file.content.trim()) content = decodeBase64Utf8(file.content);
  else if (file.download_url) {
    const response = await fetch(file.download_url);
    if (!response.ok) throw new Error('გვერდის წყაროს წაკითხვა ვერ მოხერხდა.');
    content = await response.text();
  } else throw new Error('გვერდийн HTML ფაიлыг რედაქტირება შეუძლებელია.');
  if (!content?.trim()) throw new Error('Page HTML is empty; changes were not saved to protect the site.');
  return { sha: file.sha, content };
}

async function commitEditorHtml(path, sha, content, message) {
  await githubRequest(`/repos/${GITHUB_REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${GITHUB_BRANCH}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: encodeBase64Utf8(content), sha, branch: GITHUB_BRANCH }),
  });
}

function selectedProductSlug(selection) {
  const href = selection.productHref || selection.href || '';
  const match = href.match(/product-pages\/([^/?#]+)\.html/i);
  const pageMatch = selection.page?.match(/product-pages\/([^/?#]+)\.html/i);
  return match ? decodeURIComponent(match[1]) : pageMatch ? decodeURIComponent(pageMatch[1]) : selection.productSlug || '';
}

async function findEditorProduct(selection) {
  const slug = selectedProductSlug(selection);
  const normalizeSlug = value => String(value || '').trim().replace(/\\/g, '/').split('/').pop().replace(/\.html$/i, '').toLocaleLowerCase();
  const normalizedTitle = value => String(value || '').trim().replace(/\s+/g, ' ').toLocaleLowerCase();
  const loaded = products.find(item =>
    (selection.productTitle && normalizedTitle(item.title) === normalizedTitle(selection.productTitle))
    || (selection.text && normalizedTitle(item.title) === normalizedTitle(selection.text))
    || (selection.resolvedSrc && item.image === selection.resolvedSrc)
  );
  const wantedSlug = normalizeSlug(slug);
  for (const collection of collections) {
    const path = `products/categories/${collection.file}`;
    const pendingData = pendingEditorJson.get(path);
    const file = pendingData ? { data: pendingData } : collectionFiles[collection.id] || await githubFile(path);
    const index = (file.data.products || []).findIndex(raw =>
      (wantedSlug && normalizeSlug(raw.slug) === wantedSlug)
      || (wantedSlug && normalizeSlug(productSlugFromTitle(raw.title || '')) === wantedSlug)
      || (loaded && normalizedTitle(raw.title) === normalizedTitle(loaded.title))
    );
    if (index >= 0) return { path, file, raw: file.data.products[index], index, slug: file.data.products[index].slug || slug };
  }
  return null;
}

function productCardRange(html, selection) {
  if (!selection.productTagName) return null;
  return editorTagRange(html, {
    tagName: selection.productTagName,
    id: selection.productId,
    identityClass: selection.productIdentityClass,
    occurrence: selection.productOccurrence || 0,
  });
}

function updateStaticProductTitle(cardHtml, title) {
  const className = cardHtml.includes('cms-product-card__title') ? 'cms-product-card__title' : 'product-item__title';
  const open = new RegExp(`<([a-z][\\w-]*)\\b[^>]*\\bclass\\s*=\\s*(["'])[^"']*\\b${className}\\b[^"']*\\2[^>]*>`, 'i').exec(cardHtml);
  if (!open) return cardHtml;
  const range = editorTagRange(cardHtml, { tagName: open[1], identityClass: className, occurrence: 0 });
  if (!range) return cardHtml;
  return cardHtml.slice(0, range.openEnd) + escapeEditorText(title) + cardHtml.slice(range.closeStart);
}

function updateStaticProductPrice(cardHtml, price) {
  const range = editorTagRange(cardHtml, { tagName: 'div', identityClass: 'product-item__price', occurrence: 0 });
  if (!range) return cardHtml;
  const block = cardHtml.slice(range.start, range.end);
  const updated = block.replace(/(<img\b[^>]*(?:lari-currency-logo|Lari_logo)[^>]*>)([\s\S]*?)(\d[\d,.]*)/i, `$1$2${price.toFixed(2)}`);
  return cardHtml.slice(0, range.start) + updated + cardHtml.slice(range.end);
}

function editorColorHex(name) {
  const value = name.toLowerCase();
  const palette = [
    [/black|შავ/, '#171717'], [/white|თეთრ/, '#f7f5f2'], [/blue|ლურჯ/, '#3284c7'],
    [/green|მწვან/, '#3e8b58'], [/red|წითელ/, '#c74c4c'], [/pink|ვარდისფ/, '#df8fa7'],
    [/beige|cream|კრემ|ბეჟ/, '#d9c3a3'], [/brown|ყავისფ/, '#80543e'],
    [/gray|grey|ნაცრისფ/, '#8a8a8a'], [/yellow|ყვითელ/, '#e5bc42'],
    [/purple|იისფ/, '#8b68ad'], [/terracotta|ტერაკოტ/, '#b96b4d'],
  ];
  return palette.find(([pattern]) => pattern.test(value))?.[1] || '#8a8a8a';
}

function renderEditorProductColors(selectedColors = editorSelection?.productColors || []) {
  const container = document.getElementById('site-editor-product-colors');
  if (!container) return;
  const availableColors = [...document.querySelectorAll('#form-product-colors input[type="checkbox"]')].map(input => input.value);
  const colors = [...new Set([...availableColors, ...selectedColors])];
  const selected = new Set(selectedColors);
  container.replaceChildren();
  colors.forEach(name => {
    const label = document.createElement('label');
    label.className = 'flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-950 px-3 py-2 text-xs text-slate-300 cursor-pointer hover:border-indigo-500/60 transition-all';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = name;
    checkbox.checked = selected.has(name);
    checkbox.className = 'accent-indigo-500';
    const swatch = document.createElement('span');
    swatch.className = 'h-3 w-3 shrink-0 rounded-full border border-white/30';
    swatch.style.backgroundColor = editorColorHex(name);
    label.append(checkbox, swatch, document.createTextNode(` ${name}`));
    container.append(label);
  });
}

function addEditorProductColor() {
  const input = document.getElementById('site-editor-new-color');
  const name = input?.value.trim();
  if (!name) return;
  const current = [...document.querySelectorAll('#site-editor-product-colors input:checked')].map(checkbox => checkbox.value);
  if (!current.includes(name)) current.push(name);
  renderEditorProductColors(current);
  input.value = '';
}
function editorProductSwatchMarkup(name, index) {
  const slug = productSlugFromTitle(name) || `color-${index + 1}`;
  return `<tooltip-component class="swatches swatch__button swatch__button--circle swatch-${slug}" style="--animation-delay: ${index * 50}ms; --swatch: ${editorColorHex(name)};" data-tooltip="${escapeHtmlAttribute(name)}" tabindex="0"><div class="sibling__link"></div></tooltip-component>`;
}

function buildEditorProductSiblingsMarkup(colors) {
  const swatches = colors.map(editorProductSwatchMarkup).join('');
  return `<product-siblings class="product-item__siblings product-item__swatches__holder product-item__swatches__holder--circle product-item__swatches__holder--slider"><native-scrollbar class="radio__fieldset radio__fieldset--swatches radio__fieldset--pgi is-visible" data-sibling-fieldset=""><div class="selector-wrapper__scrollbar" data-scrollbar="">${swatches}</div></native-scrollbar></product-siblings>`;
}

function updateStaticProductColors(cardHtml, colors, pageHtml = '') {
  let siblings = editorTagRange(cardHtml, { tagName: 'product-siblings', identityClass: 'product-item__siblings', occurrence: 0 });
  let createdSection = false;
  if (!siblings && colors.length) {
    createdSection = true;
    const templateRange = editorTagRange(pageHtml, { tagName: 'product-siblings', identityClass: 'product-item__siblings', occurrence: 0 });
    let markup = templateRange ? pageHtml.slice(templateRange.start, templateRange.end) : buildEditorProductSiblingsMarkup([]);
    const titleTag = /<[^>]*\bclass\s*=\s*(["'])[^"']*\bproduct-item__title\b[^"']*\1[^>]*>/i.exec(cardHtml);
    const insertionPoint = titleTag ? cardHtml.indexOf('</a>', titleTag.index) : -1;
    if (insertionPoint < 0) return cardHtml;
    cardHtml = cardHtml.slice(0, insertionPoint + 4) + markup + cardHtml.slice(insertionPoint + 4);
    siblings = editorTagRange(cardHtml, { tagName: 'product-siblings', identityClass: 'product-item__siblings', occurrence: 0 });
  }
  if (!siblings) return cardHtml;
  if (!colors.length) return cardHtml.slice(0, siblings.start) + cardHtml.slice(siblings.end);
  let block = cardHtml.slice(siblings.start, siblings.end);
  const existingCount = [...block.matchAll(/<tooltip-component\b[^>]*\bdata-tooltip=/gi)].length;
  for (let index = existingCount - 1; index >= 0; index -= 1) {
    const range = editorTagRange(block, { tagName: 'tooltip-component', identityClass: 'swatches', occurrence: index });
    if (!range) continue;
    if (index >= colors.length) {
      block = block.slice(0, range.start) + block.slice(range.end);
      continue;
    }
    const name = colors[index];
    let openTag = block.slice(range.start, range.openEnd);
    openTag = openTag.replace(/\bdata-tooltip\s*=\s*(["']).*?\1/i, `data-tooltip="${escapeHtmlAttribute(name)}"`);
    if (createdSection) openTag = openTag.replace(/\sdata-sibling-[\w-]+\s*=\s*(["']).*?\1/gi, '');
    const slug = productSlugFromTitle(name) || `color-${index + 1}`;
    if (/\bclass\s*=\s*(["']).*?\1/i.test(openTag)) {
      openTag = openTag.replace(/\bclass\s*=\s*(["'])(.*?)\1/i, (_all, quote, value) => `class=${quote}${value.replace(/\bswatch-[a-z0-9-]+\b/gi, '').trim()} swatch-${slug}${quote}`);
    }
    const hex = editorColorHex(name);
    if (/\bstyle\s*=\s*(["']).*?\1/i.test(openTag)) {
      openTag = openTag.replace(/\bstyle\s*=\s*(["'])([\s\S]*?)\1/i, (_all, quote, value) => `style=${quote}${value.replace(/--swatch\s*:\s*[^;]+;?/i, `--swatch: ${hex};`)}${quote}`);
    } else openTag = openTag.replace(/>$/, ` style="--swatch: ${hex};">`);
    block = block.slice(0, range.start) + openTag + block.slice(range.openEnd);
  }
  for (let index = existingCount; index < colors.length; index += 1) {
    const name = colors[index];
    const markup = editorProductSwatchMarkup(name, index);
    const scrollRange = editorTagRange(block, { tagName: 'div', identityClass: 'selector-wrapper__scrollbar', occurrence: 0 });
    if (scrollRange) block = block.slice(0, scrollRange.closeStart) + markup + block.slice(scrollRange.closeStart);
    else block = block.replace(/<\/native-scrollbar>/i, `${markup}</native-scrollbar>`);
  }
  return cardHtml.slice(0, siblings.start) + block + cardHtml.slice(siblings.end);
}

function updateEditorProductPreview(title, price, colors) {
  const card = editorSelectedNode?.closest('.cms-product-card, .product-item, [class*="product-card"], [class*="product-item"]')
    || editorSelectedNode?.closest('.product__container, .product__information, main');
  if (!card) return;
  const titleNode = card.querySelector('.cms-product-card__title, .product-item__title, .product__title');
  if (titleNode) titleNode.textContent = title;
  const priceNode = card.querySelector('.cms-product-card__price, .product-item__price, [data-product-price]');
  if (priceNode) {
    const walker = priceNode.ownerDocument.createTreeWalker(priceNode, NodeFilter.SHOW_TEXT);
    let candidate;
    let textNode;
    while ((textNode = walker.nextNode())) if (/\d/.test(textNode.textContent)) candidate = textNode;
    if (candidate) candidate.textContent = candidate.textContent.replace(/[\d,.]+/, price.toFixed(2));
    else priceNode.append(priceNode.ownerDocument.createTextNode(price.toFixed(2)));
  }
  let siblings = card.querySelector('product-siblings, .product__siblings, .product-item__siblings');
  if (!colors.length) { siblings?.remove(); return; }
  if (!siblings) {
    const template = card.ownerDocument.querySelector('product-siblings.product-item__siblings, product-siblings.product__siblings');
    if (template) siblings = template.cloneNode(true);
    else {
      siblings = card.ownerDocument.createElement('product-siblings');
      siblings.className = 'product-item__siblings product-item__swatches__holder product-item__swatches__holder--circle product-item__swatches__holder--slider';
      const scrollbar = card.ownerDocument.createElement('native-scrollbar');
      scrollbar.className = 'radio__fieldset radio__fieldset--swatches radio__fieldset--pgi is-visible';
      scrollbar.dataset.siblingFieldset = '';
      const scrollContent = card.ownerDocument.createElement('div');
      scrollContent.className = 'selector-wrapper__scrollbar';
      scrollContent.dataset.scrollbar = '';
      scrollbar.append(scrollContent);
      siblings.append(scrollbar);
    }
    siblings.querySelectorAll('tooltip-component[data-tooltip]').forEach(swatch => swatch.remove());
    const productLink = titleNode?.closest('a[href]');
    (productLink || priceNode || titleNode || card).after(siblings);
  }
  const scrollbar = siblings.querySelector('native-scrollbar') || siblings;
  const swatches = [...scrollbar.querySelectorAll('tooltip-component[data-tooltip]')];
  swatches.forEach((swatch, index) => {
    if (index >= colors.length) { swatch.remove(); return; }
    const name = colors[index];
    swatch.setAttribute('data-tooltip', name);
    swatch.className = `swatches swatch__button swatch__button--circle swatch-${productSlugFromTitle(name) || `color-${index + 1}`}`;
    swatch.style.setProperty('--swatch', editorColorHex(name));
    swatch.style.setProperty('--animation-delay', `${index * 50}ms`);
    ['data-sibling-link', 'data-sibling-price', 'data-sibling-compare-at-price', 'data-sibling-cutline', 'data-sibling-image'].forEach(attribute => swatch.removeAttribute(attribute));
  });
  const swatchContainer = scrollbar.querySelector('.selector-wrapper__scrollbar') || scrollbar;
  for (let index = swatches.length; index < colors.length; index += 1) {
    const name = colors[index];
    const swatch = card.ownerDocument.createElement('tooltip-component');
    swatch.className = `swatches swatch__button swatch__button--circle swatch-${productSlugFromTitle(name) || `color-${index + 1}`}`;
    swatch.style.setProperty('--swatch', editorColorHex(name));
    swatch.setAttribute('data-tooltip', name);
    swatch.tabIndex = 0;
    const link = card.ownerDocument.createElement('div');
    link.className = 'sibling__link';
    swatch.append(link);
    swatch.style.setProperty('--animation-delay', `${index * 50}ms`);
    swatchContainer.append(swatch);
  }
}

async function saveSelectedProduct() {
  const status = document.getElementById('site-editor-status');
  if (!editorSelection?.isProductCard) { status.textContent = 'აირჩიეთ პროდუქტი რედაქტირებისთვის.'; return; }
  const title = document.getElementById('site-editor-product-title').value.trim();
  const price = Number(document.getElementById('site-editor-product-price').value);
  const colors = [...document.querySelectorAll('#site-editor-product-colors input[type="checkbox"]:checked')].map(input => input.value);
  if (!title || !Number.isFinite(price) || price < 0) { status.textContent = 'შეამოწმეთ პროდუქტის სახელი და ფასი.'; return; }
  try {
    const product = await findEditorProduct(editorSelection);
    if (product) {
      product.raw.title = title;
      product.raw.price = price;
      product.raw.colors = colors;
      stageEditorJson(product.path, product.file.data);
      const cached = products.find(item => item.raw?.slug === product.slug || (item.title === editorSelection.productTitle && item.collectionId === collections.find(entry => entry.file === product.path.split('/').pop())?.id));
      if (cached) {
        cached.title = title;
        cached.price = price;
        cached.colors = colors;
        cached.raw = product.raw;
      }
    } else {
      const pending = pendingEditorHtml.get(editorSelection.page);
      const page = pending || await editorHtmlFile(editorSelection.page);
      const range = productCardRange(page.content, editorSelection);
      if (!range) throw new Error('მონიშნული პროდუქტი გვერდის HTML-ში ვერ მოიძებნა.');
      let cardHtml = page.content.slice(range.start, range.end);
      cardHtml = updateStaticProductTitle(cardHtml, title);
      cardHtml = updateStaticProductPrice(cardHtml, price);
      cardHtml = updateStaticProductColors(cardHtml, colors, page.content);
      const updated = page.content.slice(0, range.start) + cardHtml + page.content.slice(range.end);
      stageEditorHtml(editorSelection.page, page.sha, updated, `Edit product on ${editorSelection.page}`);
    }
    if (product) {
      const pending = pendingEditorHtml.get(editorSelection.page);
      const page = pending || await editorHtmlFile(editorSelection.page);
      const range = productCardRange(page.content, editorSelection);
      if (range) {
        let cardHtml = page.content.slice(range.start, range.end);
        cardHtml = updateStaticProductTitle(cardHtml, title);
        cardHtml = updateStaticProductPrice(cardHtml, price);
        cardHtml = updateStaticProductColors(cardHtml, colors, page.content);
        const updated = page.content.slice(0, range.start) + cardHtml + page.content.slice(range.end);
        stageEditorHtml(editorSelection.page, page.sha, updated, `Edit product on ${editorSelection.page}`);
      }
    }
    updateEditorProductPreview(title, price, colors);
    editorSelection.productTitle = title;
    editorSelection.text = title;
    status.textContent = 'პროდუქტი შეიცვალა წინასწარ ხედში. საიტზე ასატვირთად დააჭირეთ ქვემოთ „ცვლილებების შენახვა“ ღილაკს.';
  } catch (error) { status.textContent = error.message || 'პროდუქტის ცვლილება ვერ მოხერხდა.'; }
}
async function deleteSelectedProduct() {
  if (!editorSelection?.isProductCard) return;
  if (!window.confirm('პროდუქტი და მისი ფერის ვარიანტები წაიშალოს?')) return;
  const status = document.getElementById('site-editor-status');
  status.textContent = 'პროდუქტი იშლება…';
  try {
    const product = await findEditorProduct(editorSelection);
    if (product) {
      const data = pendingEditorJson.get(product.path) || product.file.data;
      const index = data.products.findIndex(item => item.slug === product.slug || productSlugFromTitle(item.title || '') === product.slug);
      if (index < 0) throw new Error('Product no longer exists.');
      data.products.splice(index, 1);
      stageEditorJson(product.path, data);
      pendingProductRoutes.add(product.slug);
      updateEditorSaveButton();
      (editorSelectedNode?.closest('.cms-product-card, .product-item, [class*="product-card"], [class*="product-item"]') || editorSelectedNode)?.remove();
    } else {
      const pending = pendingEditorHtml.get(editorSelection.page);
      const page = pending || await editorHtmlFile(editorSelection.page);
      const range = productCardRange(page.content, editorSelection);
      if (!range) throw new Error('არჩეული პროდუქტი HTML-ში ვერ მოიძებნა.');
      const updated = page.content.slice(0, range.start) + page.content.slice(range.end);
      stageEditorHtml(editorSelection.page, page.sha, updated, `Delete product on ${editorSelection.page}`);
      (editorSelectedNode?.closest('.cms-product-card, .product-item, [class*="product-card"], [class*="product-item"]') || editorSelectedNode)?.remove();
    }
    editorSelection = null;
    editorSelectedNode = null;
    document.getElementById('site-editor-product-tools').classList.add('hidden');
    status.textContent = 'Product removed from preview. Click Save changes below to publish.';
  } catch (error) { status.textContent = error.message || 'პროდუქტის წაშლა ვერ მოხერხდა.'; }
}

async function saveEditorText() {
  const status = document.getElementById('site-editor-status');
  if (!editorSelection || !editorSelection.canEditText) { status.textContent = 'აირჩიეთ ტექსტური სათაური ან ველი.'; return; }
  const value = document.getElementById('site-editor-text-value').value;
  try {
    const product = await findEditorProduct(editorSelection);
    if (product && (editorSelection.productField || product.raw.title === editorSelection.text)) {
      const field = editorSelection.productField || 'title';
      if (field === 'price') {
        const price = Number(value.replace(/,/g, '').replace(/[^\d.-]/g, ''));
        if (!Number.isFinite(price) || price < 0) throw new Error('შეიყვანეთ სწორი ფასი.');
        product.raw.price = price;
      } else if (field.startsWith('detailsLabel:')) {
        const key = field.slice('detailsLabel:'.length);
        product.raw.detailsLabels = { ...(product.raw.detailsLabels || {}), [key]: value.trim() };
      } else product.raw[field] = value.trim();
      stageEditorJson(product.path, product.file.data);
    } else {
      const path = editorSelection.page;
      const pending = pendingEditorHtml.get(path);
      const page = pending || await editorHtmlFile(path);
      const range = editorTagRange(page.content, editorSelection);
      if (range) {
        const updated = page.content.slice(0, range.openEnd) + escapeEditorText(value) + page.content.slice(range.closeStart);
        stageEditorHtml(path, page.sha, updated, `Edit text on ${path}`);
      } else if (!stageEditorLiveTextEdit(page, editorSelectedNode, value)) {
        throw new Error('Selected text could not be changed.');
      }
    }
    if (editorSelectedNode?.isConnected) editorSelectedNode.textContent = value;
    status.textContent = 'ტექსტი შეიცვალა წინასწარ ხედში. საიტზე ასატვირთად დააჭირეთ ქვემოთ „ცვლილებების შენახვა“ ღილაკს.';
  } catch (error) { status.textContent = error.message || 'ტექსტის შეცვლა ვერ მოხერხდა.'; }
}

function selectEditorParent() {
  const parent = editorSelectedNode?.parentElement;
  if (!parent || parent.tagName === 'BODY') return;
  const event = new editorSelectedNode.ownerDocument.defaultView.MouseEvent('click', { bubbles: true, cancelable: true });
  event.editorParentPick = true;
  parent.dispatchEvent(event);
}

async function deleteEditorSelection() {
  if (!editorSelection) return;
  if (['img', 'video'].includes(editorSelection.tagName) || editorSelection.mediaTagName === 'background') return deleteEditorImage();
  if (!window.confirm('მონიშნული ელემენტი ან სექცია მთლიანად წაიშალოს?')) return;
  const status = document.getElementById('site-editor-status');
  status.textContent = 'ელემენტი იშლება…';
  try {
    const productHref = editorSelection.productHref || editorSelection.href || '';
    const productRoute = /(?:^|\/)product-pages\/([^/?#]+)\.html|(?:^|\/)products\/([^/?#]+)/i.exec(productHref);
    const hiddenProductSlug = decodeURIComponent(productRoute?.[1] || productRoute?.[2] || '');
    if (editorSelection.isProductCard && editorSelection.productTagName === 'a' && editorSelection.productIdentityClass === 'cms-product-card') {
      const pending = pendingEditorHtml.get(editorSelection.page);
      const page = pending || await editorHtmlFile(editorSelection.page);
      const slugMatch = (editorSelection.productHref || editorSelection.href || '').match(/product-pages\/([^/?#]+)\.html/i);
      const slug = decodeURIComponent(slugMatch?.[1] || '');
      if (!stageEditorHiddenProduct(page, slug)) throw new Error('Selected product could not be identified for deletion.');
      (editorSelectedNode?.closest('.cms-product-card') || editorSelectedNode)?.remove();
    } else {
      const pending = pendingEditorHtml.get(editorSelection.page);
      const page = pending || await editorHtmlFile(editorSelection.page);
      const range = editorTagRange(page.content, editorSelection);
      if (range) {
        const updated = page.content.slice(0, range.start) + page.content.slice(range.end);
        stageEditorHtml(editorSelection.page, page.sha, updated, `Delete section on ${editorSelection.page}`);
      } else if (!stageEditorLiveElementDeletion(page, editorSelectedNode)) {
        throw new Error('Selected element could not be deleted.');
      }
      if (editorSelection.isProductCard && hiddenProductSlug) {
        const staged = pendingEditorHtml.get(editorSelection.page);
        stageEditorHiddenProduct(staged ? { sha: staged.sha, content: staged.content } : page, hiddenProductSlug);
      }
      editorSelectedNode?.remove();
    }
    editorSelection = null;
    editorSelectedNode = null;
    document.getElementById('site-editor-text-tools').classList.add('hidden');
    document.getElementById('site-editor-product-tools').classList.add('hidden');
    status.textContent = 'Deleted in preview. Click Save changes below to publish.';
  } catch (error) { status.textContent = error.message || 'ელემენტის წაშლა ვერ მოხერხდა.'; }
}

function updateEditorMediaPreview(replacement, remove = false) {
  const selected = editorSelectedNode;
  if (!selected) return;
  if (editorSelection?.mediaTagName === 'background') {
    selected.style.setProperty('background-image', remove ? 'none' : `url(${JSON.stringify(replacement.url)})`, 'important');
    const preview = document.getElementById('site-editor-selected-image');
    if (remove) preview?.classList.add('hidden');
    else if (preview) {
      preview.src = replacement.url;
      preview.classList.remove('hidden');
      editorSelection.attributeValue = replacement.stagedUrl || replacement.url;
      editorSelection.resolvedSrc = replacement.url;
      editorSelection.backgroundUrl = replacement.stagedUrl || replacement.url;
    }
    return;
  }
  if (remove) {
    (selected.closest('picture') || selected)?.remove();
    document.getElementById('site-editor-selected-image')?.classList.add('hidden');
    return;
  }
  const doc = selected.ownerDocument;
  const isVideo = /^video\//i.test(replacement.type || '');
  const currentIsVideo = selected.tagName.toLowerCase() === 'video';
  let media = selected;
  if (isVideo && !currentIsVideo) {
    media = doc.createElement('video');
    media.className = selected.className;
    media.style.cssText = selected.style.cssText;
    media.controls = true;
    media.playsInline = true;
    media.muted = true;
    media.loop = true;
    selected.replaceWith(media);
  } else if (!isVideo && currentIsVideo) {
    media = doc.createElement('img');
    media.className = selected.className;
    media.style.cssText = selected.style.cssText;
    media.alt = selected.getAttribute('alt') || '';
    selected.replaceWith(media);
  }
  if (media.tagName.toLowerCase() === 'video') {
    media.src = replacement.url;
    media.load();
  } else {
    media.removeAttribute('srcset');
    media.removeAttribute('data-src');
    media.removeAttribute('data-original');
    if (media.parentElement?.tagName.toLowerCase() === 'picture') {
      media.parentElement.querySelectorAll('source').forEach(source => source.remove());
    }
    media.src = replacement.url;
  }
  editorSelectedNode = media;
  if (editorSelection) {
    editorSelection.tagName = media.tagName.toLowerCase();
    editorSelection.mediaTagName = media.tagName.toLowerCase();
    editorSelection.sourceAttribute = 'src';
    editorSelection.attributeValue = replacement.stagedUrl || replacement.url;
    editorSelection.resolvedSrc = replacement.url;
  }
  const preview = document.getElementById('site-editor-selected-image');
  if (media.tagName.toLowerCase() === 'img' && preview) {
    preview.src = replacement.url;
    preview.classList.remove('hidden');
  } else preview?.classList.add('hidden');
}

function selectedProductPhoto(raw, selection) {
  const known = new Set([selection.attributeValue, selection.resolvedSrc]);
  const normalize = value => {
    try { return new URL(value, window.location.origin).pathname.replace(/^\/PUPSYWEB\//, ''); } catch { return value; }
  };
  const wanted = new Set([...known].map(normalize));
  const visit = value => {
    if (typeof value === 'string') return wanted.has(normalize(value));
    if (Array.isArray(value)) return value.some(visit);
    if (value && typeof value === 'object') return Object.values(value).some(visit);
    return false;
  };
  return visit(raw);
}

function updateProductPhotoReferences(raw, selection, replacement) {
  const normalize = value => {
    try { return new URL(value, window.location.origin).pathname.replace(/^\/PUPSYWEB\//, ''); } catch { return value; }
  };
  const wanted = new Set([selection.attributeValue, selection.resolvedSrc].map(normalize));
  const visit = (value, parent, key) => {
    if (Array.isArray(value)) {
      for (let index = value.length - 1; index >= 0; index--) {
        if (typeof value[index] === 'string' && wanted.has(normalize(value[index]))) {
          if (replacement == null) value.splice(index, 1); else value[index] = replacement;
        } else visit(value[index], value, index);
      }
    } else if (value && typeof value === 'object') {
      for (const [childKey, child] of Object.entries(value)) {
        if (typeof child === 'string' && wanted.has(normalize(child))) {
          if (replacement == null) delete value[childKey]; else value[childKey] = replacement;
        } else visit(child, value, childKey);
      }
    }
  };
  visit(raw, null, null);
}

function replaceEditorProductPhotos(raw, url) {
  raw.photos = [{ source: 'gallery', images: [url] }];
  raw.image = url;
  raw.images = [url];
  delete raw.imageUrl;
  delete raw.photo;
}

function collapseEditorProductGalleryPreview(preferredSlide = null) {
  const gallery = preferredSlide?.closest('.product__slides[data-product-media-list]')
    || editorSelectedNode?.closest('.product__slides[data-product-media-list]')
    || editorSelectedNode?.ownerDocument.querySelector('.product__slides[data-product-media-list]');
  const selectedSlide = preferredSlide || editorSelectedNode?.closest('.product__slide') || gallery?.querySelector('.product__slide');
  if (!gallery || !selectedSlide) return;
  gallery.querySelectorAll('.product__slide').forEach(slide => {
    if (slide === selectedSlide) {
      slide.hidden = false;
      slide.classList.add('media--active');
      slide.classList.remove('media--hidden');
      slide.dataset.imageId = 'cms-0';
      slide.dataset.mediaId = 'cms-0';
    } else slide.hidden = true;
  });
  gallery.setAttribute('data-active-media', 'cms-0');
}

function updateEditorProductGalleryPreview(url) {
  const doc = editorSelectedNode?.ownerDocument;
  const gallery = doc?.querySelector('.product__slides[data-product-media-list]');
  const slide = editorSelectedNode?.closest('.product__slide') || gallery?.querySelector('.product__slide');
  const image = slide?.querySelector('.product__photo img, img');
  if (image && image !== editorSelectedNode) {
    image.removeAttribute('srcset');
    image.removeAttribute('data-src');
    image.src = url;
  }
  collapseEditorProductGalleryPreview(slide);
}

async function saveEditorPageImage(replacement, remove = false) {
  if (!editorSelection) throw new Error('ჯერ აირჩიეთ ფოტო საიტის გადახედვაში.');
  const path = editorSelection.page;
  const storedUrl = replacement ? replacement.stagedUrl || replacement.url : '';
  if (editorSelection.mediaTagName === 'background') {
    if (!remove) {
      const product = await findEditorProduct(editorSelection);
      if (product) {
        replaceEditorProductPhotos(product.raw, storedUrl);
        stageEditorJson(product.path, product.file.data);
      }
    }
    const pending = pendingEditorHtml.get(path);
    const page = pending || await editorHtmlFile(path);
    if (!stageEditorLiveBackgroundEdit(page, editorSelectedNode, remove ? '' : storedUrl)) {
      throw new Error('Background image could not be located in the selected section.');
    }
    updateEditorMediaPreview(replacement, remove);
    return;
  }
  if (!remove && !/^video\//i.test(replacement.type || '')) {
    const product = await findEditorProduct(editorSelection);
    if (product) {
      replaceEditorProductPhotos(product.raw, storedUrl);
      stageEditorJson(product.path, product.file.data);
      updateEditorMediaPreview(replacement);
      updateEditorProductGalleryPreview(replacement.url);
      return;
    }
  }
  const pending = pendingEditorHtml.get(path);
  const result = pending ? { sha: pending.sha } : await githubRequest(`/repos/${GITHUB_REPO}/contents/${encodeURIComponent(path).replace(/%2F/g, '/')}?ref=${GITHUB_BRANCH}`);
  let html;
  if (pending) html = pending.content;
  else if (typeof result.content === 'string' && result.content.trim()) html = decodeBase64Utf8(result.content);
  else if (result.download_url) html = await fetch(result.download_url).then(response => {
      if (!response.ok) throw new Error('გვერდის წყაროს წაკითხვა ვერ მოხერხდა.');
      return response.text();
    });
  if (!html?.trim()) throw new Error('Page HTML could not be loaded; changes were not saved to protect the site.');
  if (html) {
    const match = findEditorImageTag(html, editorSelection);
    if (match) {
      const { tag, index: imageIndex } = match;
      let targetMarkup = tag;
      const mediaTagName = editorSelection.mediaTagName || editorSelection.tagName;
      const pictureStart = html.lastIndexOf('<picture', imageIndex);
      const pictureEnd = html.indexOf('</picture>', imageIndex);
      const inPicture = pictureStart >= 0 && pictureEnd >= imageIndex;
      const targetStart = inPicture ? pictureStart : imageIndex;
      if (inPicture) targetMarkup = html.slice(pictureStart, pictureEnd + '</picture>'.length);
      else if (mediaTagName === 'video') {
        const closing = html.indexOf('</video>', imageIndex);
        if (closing >= imageIndex) targetMarkup = html.slice(imageIndex, closing + '</video>'.length);
      }
      let updated;
      if (remove) updated = html.slice(0, targetStart) + html.slice(targetStart + targetMarkup.length);
      else if (/^video\//i.test(replacement.type || '')) {
        const src = escapeHtmlAttribute(storedUrl);
        const className = /\bclass\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2] || '';
        const style = /\bstyle\s*=\s*(["'])(.*?)\1/i.exec(tag)?.[2] || '';
        const dimensions = ['width', 'height'].map(name => {
          const match = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i').exec(tag);
          return match ? ` ${name}="${escapeHtmlAttribute(match[2])}"` : '';
        }).join('');
        const video = `<video src="${src}" class="${escapeHtmlAttribute(className)}" style="${escapeHtmlAttribute(style)}"${dimensions} controls playsinline muted loop></video>`;
        updated = html.slice(0, targetStart) + video + html.slice(targetStart + targetMarkup.length);
      } else if (mediaTagName === 'video') {
        const attrs = ['class', 'style', 'width', 'height', 'alt'].map(name => {
          const match = new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i').exec(tag);
          return match ? ` ${name}="${escapeHtmlAttribute(match[2])}"` : '';
        }).join('');
        const image = `<img src="${escapeHtmlAttribute(storedUrl)}"${attrs}>`;
        updated = html.slice(0, targetStart) + image + html.slice(targetStart + targetMarkup.length);
      } else {
        const srcName = editorSelection.sourceAttribute;
        const attrPattern = new RegExp(`\\s${srcName}\\s*=\\s*(["'])(.*?)\\1`, 'i');
        let updatedTag = tag.replace(attrPattern, '').replace(/\s+srcset\s*=\s*(["']).*?\1/i, '').replace(/\s+data-(?:src|original)\s*=\s*(["']).*?\1/gi, '').replace(/\s*\/?>(?=$)/, '') + ` src="${escapeHtmlAttribute(storedUrl)}">`;
        let updatedMarkup = targetMarkup.replace(tag, updatedTag);
        if (inPicture) updatedMarkup = updatedMarkup.replace(/<source\b[^>]*>/gi, '');
        updated = html.slice(0, targetStart) + updatedMarkup + html.slice(targetStart + targetMarkup.length);
      }
      stageEditorHtml(path, result.sha, updated, remove ? `Remove image on ${path}` : `Replace image on ${path}`);
      updateEditorMediaPreview(replacement, remove);
      return;
    }
  }

  for (const collection of collections) {
    const filePath = `products/categories/${collection.file}`;
    const pendingData = pendingEditorJson.get(filePath);
    const file = pendingData ? { data: pendingData } : collectionFiles[collection.id] || await githubFile(filePath);
    const product = file.data.products?.find(item => selectedProductPhoto(item, editorSelection));
    if (!product) continue;
    const isVideo = !remove && /^video\//i.test(replacement.type || '');
    if ((editorSelection.mediaTagName || editorSelection.tagName) === 'video') {
      updateProductPhotoReferences(product, editorSelection, null);
      if (!remove && isVideo) {
        product.visualEditorVideoUrl = storedUrl;
        product.videoUrl = storedUrl;
      } else if (!remove) product.image = storedUrl;
      if (product.videoUrl === editorSelection.attributeValue || product.videoUrl === editorSelection.resolvedSrc) delete product.videoUrl;
      if (remove || !isVideo) delete product.visualEditorVideoUrl;
    } else if (isVideo) {
      updateProductPhotoReferences(product, editorSelection, null);
      product.visualEditorVideoUrl = storedUrl;
      product.videoUrl = storedUrl;
    } else {
      updateProductPhotoReferences(product, editorSelection, remove ? null : storedUrl);
      if (product.visualEditorVideoUrl) {
        if (product.videoUrl === product.visualEditorVideoUrl) delete product.videoUrl;
        delete product.visualEditorVideoUrl;
      }
    }
    stageEditorJson(filePath, file.data);
    updateEditorMediaPreview(replacement, remove);
    return;
  }
  if (!remove && !/^video\//i.test(replacement.type || '') && editorSelection.mediaTagName === 'img') {
    const page = pending || { sha: result.sha, content: html || '' };
    if (stageEditorLiveImageEdit(page, editorSelectedNode, storedUrl)) {
      updateEditorMediaPreview(replacement);
      return;
    }
  }
  throw new Error('არჩეული ფოტო გვერდის HTML-ში ან პროდუქტის მონაცემებში ვერ მოიძებნა. შესაძლოა ის CSS ფონის სურათი იყოს.');
}

async function optimizeUploadImage(file) {
  if (!['image/jpeg', 'image/png'].includes(file.type) || file.size < 180 * 1024) return file;
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height));
    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/webp', 0.82));
    if (!blob || blob.size >= file.size) return file;
    const baseName = file.name.replace(/\.[^.]+$/, '') || 'photo';
    return new File([blob], `${baseName}.webp`, { type: 'image/webp', lastModified: Date.now() });
  } catch {
    return file;
  } finally {
    bitmap?.close();
  }
}

async function uploadEditorMedia(file) {
  file = await optimizeUploadImage(file);
  const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-');
  const assetId = crypto.randomUUID();
  const filename = `${Date.now()}-${assetId}-${safeName}`;
  const token = `/__ADMIN_EDITOR_ASSET_${assetId}__`;
  const previewUrl = URL.createObjectURL(file);
  pendingEditorAssets.set(token, { file, filename, previewUrl });
  updateEditorSaveButton();
  return { url: previewUrl, stagedUrl: token, type: file.type };
}
async function replaceEditorImage() {
  const status = document.getElementById('site-editor-status');
  const file = document.getElementById('site-editor-file').files[0];
  const url = document.getElementById('site-editor-url').value.trim();
  if (!editorSelection) { status.textContent = 'აირჩიეთ ფოტო ან ვიდეო გვერდის წინასწარ ხედში.'; return; }
  if (!file && !url) { status.textContent = 'აირჩიეთ ფაილი ან მიუთითეთ მედიის ბმული.'; return; }
  status.textContent = 'მედია იცვლება წინასწარ ხედში...';
  let media;
  try {
    const videoMatch = url.match(/\.(mp4|webm|ogg)(?:$|\?)/i);
    media = file ? await uploadEditorMedia(file) : { url, type: videoMatch ? `video/${videoMatch[1].toLowerCase()}` : 'image/*' };
    await saveEditorPageImage(media);
    status.textContent = 'მედია შეიცვალა წინასწარ ხედში. საიტზე ასატვირთად დააჭირეთ ქვემოთ „ცვლილებების შენახვა“ ღილაკს.';
    document.getElementById('site-editor-file').value = '';
    document.getElementById('site-editor-url').value = '';
  } catch (error) {
    if (media?.stagedUrl && pendingEditorAssets.has(media.stagedUrl)) {
      const asset = pendingEditorAssets.get(media.stagedUrl);
      URL.revokeObjectURL(asset.previewUrl);
      pendingEditorAssets.delete(media.stagedUrl);
      updateEditorSaveButton();
    }
    status.textContent = error.message || 'მედიის შეცვლა ვერ მოხერხდა.';
  }
}
async function deleteEditorImage() {
  const status = document.getElementById('site-editor-status');
  if (!editorSelection) { status.textContent = 'ჯერ აირჩიეთ ფოტო გადახედვაში.'; return; }
  if (!window.confirm('წაიშალოს მონიშნული ფოტო საიტიდან?')) return;
  status.textContent = 'ფოტო იშლება…';
  try {
    await saveEditorPageImage(null, true);
    if (editorSelection.mediaTagName !== 'background') (editorSelectedNode?.closest('picture') || editorSelectedNode)?.remove();
    editorSelection = null;
    editorSelectedNode = null;
    status.textContent = 'Image removed from preview. Click Save changes below to publish.';

  } catch (error) { status.textContent = error.message || 'ფოტოს წაშლა ვერ მოხერხდა.'; }
}

function initializeVoteStatsView() {
  const nav = document.getElementById('tab-videos-btn')?.parentElement;
  const main = document.querySelector('main');
  if (!nav || !main || document.getElementById('stats-view')) return;
  const button = document.createElement('button');
  button.id = 'tab-stats-btn';
  button.className = 'flex-1 min-w-0 justify-center px-2 py-2 rounded-xl text-[11px] sm:text-xs font-semibold flex items-center gap-1.5 text-slate-400 hover:text-white transition-all';
  button.innerHTML = '<i data-lucide="chart-no-axes-column-increasing" class="w-3.5 h-3.5"></i><span>სტატისტიკა</span>';
  button.onclick = () => switchMainTab('stats');
  nav.append(button);
  const view = document.createElement('div');
  view.id = 'stats-view';
  view.className = 'hidden space-y-5';
  view.innerHTML = '<section class="glass-card rounded-2xl border border-slate-800 p-5 space-y-4"><div class="flex items-start justify-between gap-3"><div><h2 class="text-base font-bold text-white">მალე დაგვემატება — ხმები</h2><p class="mt-1 text-xs text-slate-400">ხმები და მომხმარებლების საკონტაქტო ინფორმაცია.</p></div><button id="vote-stats-refresh" class="shrink-0 rounded-xl border border-slate-700 px-3 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-800">განახლება</button></div><p id="vote-stats-status" class="text-xs text-slate-400">აირჩიეთ „განახლება“ მონაცემების ჩასატვირთად.</p><div id="vote-stats-products" class="space-y-2"></div><h3 class="pt-3 border-t border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-300">შეტყობინების მოთხოვნები</h3><div id="vote-stats-leads" class="space-y-2"></div></section>';
  main.append(view);
  const contactedHeading = document.createElement('h3');
  contactedHeading.className = 'flex items-center justify-between gap-3 border-t border-slate-800 pt-5 text-sm font-semibold text-slate-100';
  contactedHeading.textContent = 'უკვე დაკავშირებული';
  const contactedCount = document.createElement('span');
  contactedCount.id = 'vote-stats-contacted-count';
  contactedCount.className = 'inline-flex min-w-8 justify-center rounded-full border border-emerald-800/70 bg-emerald-950/60 px-2.5 py-1 text-[11px] font-bold text-emerald-300';
  contactedHeading.append(contactedCount);
  const contactedNode = document.createElement('div');
  contactedNode.id = 'vote-stats-contacted';
  contactedNode.className = 'space-y-2.5';
  const leadsNode = document.getElementById('vote-stats-leads');
  const pendingHeading = leadsNode.previousElementSibling;
  pendingHeading.className = 'flex items-center justify-between gap-3 border-t border-slate-800 pt-5 text-sm font-semibold text-slate-100';
  const pendingCount = document.createElement('span');
  pendingCount.id = 'vote-stats-pending-count';
  pendingCount.className = 'inline-flex min-w-8 justify-center rounded-full border border-amber-800/70 bg-amber-950/50 px-2.5 py-1 text-[11px] font-bold text-amber-300';
  pendingHeading.append(pendingCount);
  leadsNode.className = 'space-y-2.5';
  leadsNode.parentElement.append(contactedHeading, contactedNode);
  document.getElementById('vote-stats-refresh').addEventListener('click', loadVoteStats);
  if (window.lucide) lucide.createIcons();
}

async function loadVoteStats() {
  const status = document.getElementById('vote-stats-status');
  const productsNode = document.getElementById('vote-stats-products');
  const leadsNode = document.getElementById('vote-stats-leads');
  const contactedNode = document.getElementById('vote-stats-contacted');
  if (!status || !productsNode || !leadsNode || !contactedNode) return;
  status.textContent = 'მონაცემები იტვირთება…';
  try {
    const response = await fetch(`${OAUTH_BASE}/api/stats`, { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'სტატისტიკის ჩატვირთვა ვერ მოხერხდა.');
    productsNode.replaceChildren();
    leadsNode.replaceChildren();
    contactedNode.replaceChildren();
    const leadItems = data.leads || [];
    document.getElementById('vote-stats-pending-count').textContent = leadItems.filter(item => !item.contactedAt).length;
    document.getElementById('vote-stats-contacted-count').textContent = leadItems.filter(item => item.contactedAt).length;
    (data.products || []).forEach(item => {
      const row = document.createElement('div');
      row.className = 'flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3 text-xs';
      const product = products.find(candidate =>
        candidate.raw?.slug === item.productId || productSlugFromTitle(candidate.title) === item.productId
      ) || products.find(candidate => candidate.title === item.title);
      const image = document.createElement('img');
      image.className = 'h-12 w-12 shrink-0 rounded-lg border border-slate-700 object-cover bg-slate-900';
      image.alt = product ? `${product.title} — ფოტო` : item.title;
      image.src = product?.image
        ? new URL(product.image, new URL('../', window.location.href)).href
        : 'https://placehold.co/96x96/1e293b/94a3b8?text=IMG';
      image.onerror = () => { image.src = 'https://placehold.co/96x96/1e293b/94a3b8?text=IMG'; };
      const title = document.createElement('span'); title.className = 'min-w-0 flex-1 font-semibold text-slate-100'; title.textContent = item.title;
      const count = document.createElement('span'); count.className = 'shrink-0 text-indigo-300'; count.textContent = `${item.votes} ხმა · ${item.contacts} კონტაქტი`;
      row.append(image, title, count); productsNode.append(row);
    });
    (data.leads || []).forEach(item => {
      const row = document.createElement('div');
      const contacted = Boolean(item.contactedAt);
      row.className = `group flex flex-wrap items-center gap-3 rounded-2xl border p-3 text-xs transition-colors sm:flex-nowrap sm:p-4 ${contacted ? 'border-emerald-900/60 bg-emerald-950/20' : 'border-slate-700/80 bg-slate-950/60 hover:border-slate-600'}`;
      const product = products.find(candidate =>
        candidate.raw?.slug === item.productId || productSlugFromTitle(candidate.title) === item.productId
      ) || products.find(candidate => candidate.title === item.title);
      const image = document.createElement('img');
      image.className = 'h-14 w-14 shrink-0 rounded-xl border border-slate-700/80 object-cover bg-slate-900';
      image.alt = product ? `${product.title} — მთავარი ფოტო` : item.title;
      image.src = product?.image
        ? new URL(product.image, new URL('../', window.location.href)).href
        : 'https://placehold.co/128x128/1e293b/94a3b8?text=IMG';
      image.onerror = () => { image.src = 'https://placehold.co/128x128/1e293b/94a3b8?text=IMG'; };
      const details = document.createElement('div');
      details.className = 'min-w-0 flex-1 basis-40';
      const title = document.createElement('p'); title.className = 'truncate font-semibold text-slate-100'; title.textContent = item.title;
      const contact = document.createElement('p'); contact.className = 'mt-1 break-all text-sm font-medium text-slate-200'; contact.textContent = item.contact;
      const date = document.createElement('p'); date.className = 'mt-1.5 text-[10px] text-slate-500'; date.textContent = item.createdAt;
      details.append(title, contact, date);
      const statusButton = document.createElement('button');
      statusButton.type = 'button';
      statusButton.className = contacted
        ? 'w-full shrink-0 rounded-xl border border-slate-700/80 bg-slate-900/60 px-3 py-2.5 text-[11px] font-semibold text-slate-300 transition hover:border-slate-500 hover:text-white sm:w-auto'
        : 'w-full shrink-0 rounded-xl border border-emerald-700/70 bg-emerald-500/10 px-3 py-2.5 text-[11px] font-semibold text-emerald-300 transition hover:border-emerald-500 hover:bg-emerald-500/20 sm:w-auto';
      statusButton.textContent = contacted ? 'დაბრუნება აქტიურ სიაში' : 'მონიშნე დაკავშირებულად';
      statusButton.addEventListener('click', () => updateLeadContactStatus(item.voteId, !contacted, statusButton));
      row.append(image, details, statusButton);
      (contacted ? contactedNode : leadsNode).append(row);
    });
    if (!(data.leads || []).some(item => item.contactedAt)) {
      const empty = document.createElement('p');
      empty.className = 'text-xs text-slate-500';
      empty.textContent = 'დაკავშირებული მომხმარებლები ჯერ არ არის.';
      contactedNode.append(empty);
    }
    if (!(data.products || []).length) {
      const empty = document.createElement('p'); empty.className = 'text-xs text-slate-500'; empty.textContent = 'ხმები ჯერ არ არის.'; productsNode.append(empty);
    }
    if ((data.leads || []).length && !(data.leads || []).some(item => !item.contactedAt)) {
      const empty = document.createElement('p');
      empty.className = 'text-xs text-slate-500';
      empty.textContent = 'ყველა საკონტაქტო მომხმარებელს უკვე დაუკავშირდით.';
      leadsNode.append(empty);
    }
    if (!(data.leads || []).length) {
      const empty = document.createElement('p'); empty.className = 'text-xs text-slate-500'; empty.textContent = 'საკონტაქტო მოთხოვნები ჯერ არ არის.'; leadsNode.append(empty);
    }
    status.textContent = `პროდუქტები: ${(data.products || []).length} · ჯამური ხმები: ${(data.products || []).reduce((sum, item) => sum + Number(item.votes || 0), 0)}`;
  } catch (error) {
    status.textContent = error.message || 'სტატისტიკის ჩატვირთვა ვერ მოხერხდა.';
  }
}

async function updateLeadContactStatus(voteId, contacted, button) {
  if (!voteId) return;
  const status = document.getElementById('vote-stats-status');
  button.disabled = true;
  try {
    const response = await fetch(`${OAUTH_BASE}/api/contacts/status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
      body: JSON.stringify({ voteId, contacted }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'კონტაქტის სტატუსის შენახვა ვერ მოხერხდა.');
    await loadVoteStats();
  } catch (error) {
    if (status) status.textContent = error.message || 'კონტაქტის სტატუსის შენახვა ვერ მოხერხდა.';
    button.disabled = false;
  }
}

function currentVideoPage() {
  return document.getElementById('page-videos-page').value;
}

function pageVideoList() {
  const page = currentVideoPage();
  pageVideosData.pages ||= {};
  pageVideosData.pages[page] ||= [];
  return pageVideosData.pages[page];
}

function renderPageVideos() {
  const container = document.getElementById('page-videos-list');
  if (!container) return;
  const videos = pageVideoList();
  container.replaceChildren();
  if (!videos.length) {
    const empty = document.createElement('p');
    empty.className = 'rounded-xl border border-dashed border-slate-800 px-4 py-5 text-center text-xs text-slate-500';
    empty.textContent = 'ამ გვერდზე დამატებული ვიდეო ჯერ არ არის.';
    container.append(empty);
    return;
  }
  videos.forEach(video => {
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-3';
    const details = document.createElement('div');
    details.className = 'min-w-0 flex-1';
    const caption = document.createElement('p');
    caption.className = 'truncate text-xs font-semibold text-slate-200';
    caption.textContent = video.caption;
    const url = document.createElement('p');
    url.className = 'truncate text-[10px] text-slate-500';
    url.textContent = video.url;
    details.append(caption, url);
    const edit = document.createElement('button');
    edit.type = 'button';
    edit.className = 'rounded-lg px-2.5 py-2 text-[10px] font-semibold text-indigo-300 hover:bg-slate-800';
    edit.textContent = 'კორექტირება';
    edit.addEventListener('click', () => editPageVideo(video.id));
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'rounded-lg px-2.5 py-2 text-[10px] font-semibold text-rose-300 hover:bg-slate-800';
    remove.textContent = 'წაშლა';
    remove.addEventListener('click', () => deletePageVideo(video.id));
    row.append(details, edit, remove);
    container.append(row);
  });
}

function editPageVideo(id) {
  const video = pageVideoList().find(item => item.id === id);
  if (!video) return;
  document.getElementById('page-video-id').value = video.id;
  document.getElementById('page-video-url').value = video.url;
  document.getElementById('page-video-caption').value = video.caption;
  document.getElementById('page-video-submit').textContent = 'ცვლილების შენახვა';
  document.getElementById('page-video-cancel').classList.remove('hidden');
  document.getElementById('page-video-url').focus();
}

function resetPageVideoForm() {
  document.getElementById('page-video-form').reset();
  document.getElementById('page-video-id').value = '';
  document.getElementById('page-video-submit').textContent = 'ვიდეოს დამატება';
  document.getElementById('page-video-cancel').classList.add('hidden');
}

async function savePageVideo(event) {
  event.preventDefault();
  const url = document.getElementById('page-video-url').value.trim();
  const caption = document.getElementById('page-video-caption').value.trim();
  let parsedUrl;
  try { parsedUrl = new URL(url); } catch { return showToast('შეიყვანე სწორი ვიდეოს ბმული.'); }
  if (parsedUrl.protocol !== 'https:') return showToast('ვიდეოს ბმული უნდა იწყებოდეს https://-ით.');
  const page = currentVideoPage();
  const previous = JSON.stringify(pageVideosData);
  const videos = pageVideoList();
  const id = document.getElementById('page-video-id').value;
  if (id) {
    const existing = videos.find(video => video.id === id);
    if (existing) Object.assign(existing, { url, caption });
  } else {
    videos.push({ id: crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(16).slice(2)}`, url, caption });
  }
  await persistPageVideos(previous);
}

async function deletePageVideo(id) {
  const previous = JSON.stringify(pageVideosData);
  pageVideosData.pages[currentVideoPage()] = pageVideoList().filter(video => video.id !== id);
  await persistPageVideos(previous);
}

async function persistPageVideos(previous) {
  const button = document.getElementById('page-video-submit');
  button.disabled = true;
  try {
    await commitJson('content/page-videos.json', pageVideosData);
    resetPageVideoForm();
    renderPageVideos();
    showToast('ვიდეოების სექცია განახლდა.');
  } catch (error) {
    pageVideosData = JSON.parse(previous);
    renderPageVideos();
    showToast(error.message || 'ვიდეო ვერ შეინახა.');
  } finally {
    button.disabled = false;
  }
}

function renderCollectionChips(filteredCollections = null) {
  const container = document.getElementById('collections-chips');
  const shown = filteredCollections || collections;
  document.getElementById('collection-count-badge').textContent = `${collections.length} კოლექცია`;
  container.innerHTML = shown.map(collection => {
    const active = collection.id === activeCollectionId;
    const count = products.filter(product => product.collectionId === collection.id).length;
    return `<button onclick="selectCollection('${collection.id}')" class="shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 border transition-all ${active ? 'bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-600/20' : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border-slate-800 hover:bg-slate-800'}"><i data-lucide="${collection.icon}" class="w-3.5 h-3.5"></i><span>${collection.name}</span><span class="px-1.5 py-0.5 rounded-md text-[10px] ${active ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-800 text-slate-500'} font-bold">${count}</span></button>`;
  }).join('');
  lucide.createIcons();
}

function filterCollections() {
  const query = document.getElementById('collection-search').value.toLocaleLowerCase();
  renderCollectionChips(collections.filter(collection => collection.name.toLocaleLowerCase().includes(query)));
}

function selectCollection(id) {
  activeCollectionId = id;
  const collection = collections.find(item => item.id === id);
  if (collection) {
    document.getElementById('active-collection-title').textContent = collection.name;
    document.getElementById('active-collection-desc').textContent = collection.desc;
  }
  renderCollectionChips();
  renderProducts();
}

function renderProducts() {
  const container = document.getElementById('products-container');
  const emptyState = document.getElementById('empty-products');
  const query = document.getElementById('product-search').value.toLocaleLowerCase();
  const sort = document.getElementById('product-sort').value;
  const filtered = products
    .filter(product => product.collectionId === activeCollectionId && product.title.toLocaleLowerCase().includes(query))
    .slice();
  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  else if (sort === 'name') filtered.sort((a, b) => a.title.localeCompare(b.title));
  else filtered.sort((a, b) => a.index - b.index);
  document.getElementById('active-collection-badge').textContent = `${filtered.length} პროდუქტი`;
  if (!filtered.length) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }
  emptyState.classList.add('hidden');
  const fallback = 'https://placehold.co/200x200/1e293b/94a3b8?text=IMG';
  if (currentLayout === 'list') {
    container.className = 'space-y-2 pt-2';
    container.innerHTML = filtered.map(product => `<div class="p-3 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3 transition-all group"><div class="flex items-center gap-3 min-w-0"><img loading="lazy" decoding="async" src="${escapeAttribute(product.image || fallback)}" onerror="this.src='${fallback}'" alt="" class="w-12 h-12 rounded-lg object-cover border border-slate-800 bg-slate-950 shrink-0"><div class="min-w-0"><h4 class="font-bold text-slate-100 text-xs sm:text-sm truncate">${escapeHtml(product.title)}</h4><div class="flex items-center gap-2 mt-0.5"><span class="text-xs font-bold text-indigo-400">₾${Number(product.price).toFixed(2)}</span>${product.size ? `<span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">${escapeHtml(product.size)}</span>` : ''}</div></div></div><div class="flex items-center gap-1 shrink-0"><button onclick="openEditProductModal('${product.id}')" title="რედაქტირება" class="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="deleteProduct('${product.id}')" title="წაშლა" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></div>`).join('');
  } else {
    container.className = 'grid grid-cols-2 gap-3 pt-2';
    container.innerHTML = filtered.map(product => `<div class="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2 flex flex-col justify-between group"><div class="space-y-2"><div class="aspect-square w-full rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative"><img loading="lazy" decoding="async" src="${escapeAttribute(product.image || fallback)}" onerror="this.src='${fallback}'" alt="" class="w-full h-full object-cover"></div><div><h4 class="font-bold text-slate-100 text-xs line-clamp-1">${escapeHtml(product.title)}</h4><p class="text-xs font-bold text-indigo-400 mt-0.5">₾${Number(product.price).toFixed(2)}</p></div></div><div class="flex items-center justify-end gap-1 pt-2 border-t border-slate-800/60"><button onclick="openEditProductModal('${product.id}')" class="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"><i data-lucide="edit-2" class="w-3.5 h-3.5"></i></button><button onclick="deleteProduct('${product.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></div></div>`).join('');
  }
  lucide.createIcons();
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function escapeAttribute(value) { return escapeHtml(value); }

function setProductLayout(layout) {
  currentLayout = layout;
  document.getElementById('view-list-btn').className = layout === 'list' ? 'p-1 rounded text-indigo-400 bg-slate-800 transition-all' : 'p-1 rounded text-slate-500 hover:text-slate-300 transition-all';
  document.getElementById('view-grid-btn').className = layout === 'grid' ? 'p-1 rounded text-indigo-400 bg-slate-800 transition-all' : 'p-1 rounded text-slate-500 hover:text-slate-300 transition-all';
  renderProducts();
}

function openAddProductModal() {
  document.getElementById('modal-title').textContent = 'ახალი პროდუქტის დამატება';
  document.getElementById('product-submit-button').textContent = 'ატვირთვა';
  document.getElementById('product-form').reset();
  resetProductSaveStatus();
  stagedProductImageUploads.clear();
  document.getElementById('form-product-id').value = '';
  document.getElementById('form-product-coming-soon').checked = false;
  document.getElementById('form-product-collection').value = activeCollectionId;
  detailFieldsCollectionId = null;
  updateCategoryDetailFields();
  document.getElementById('form-image-preview').src = 'https://placehold.co/100x100/1e293b/94a3b8?text=IMG';
  document.body.classList.add('modal-open');
  document.getElementById('product-modal').classList.remove('hidden');
}

function openEditProductModal(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  document.getElementById('product-form').reset();
  resetProductSaveStatus();
  stagedProductImageUploads.clear();
  document.getElementById('modal-title').textContent = 'პროდუქტის რედაქტირება';
  document.getElementById('product-submit-button').textContent = 'კორექტირება';
  document.getElementById('form-product-id').value = product.id;
  document.getElementById('form-product-title').value = product.title;
  document.getElementById('form-product-collection').value = product.collectionId;
  document.getElementById('form-product-price').value = product.price;
  document.getElementById('form-product-coming-soon').checked = product.comingSoon === true;
  document.getElementById('form-product-video').value = product.raw.videoUrl || '';
  const sizeSelect = document.getElementById('form-product-size');
  if (product.size && ![...sizeSelect.options].some(option => option.value === product.size)) {
    sizeSelect.add(new Option(product.size, product.size, true, true), 1);
  }
  sizeSelect.value = product.size || 'არ აქვს';
  const colorOptions = document.getElementById('form-product-colors');
  product.colors.forEach(color => {
    if ([...colorOptions.querySelectorAll('input[type="checkbox"]')].some(input => input.value === color)) return;
    const label = document.createElement('label');
    label.className = 'flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 cursor-pointer hover:border-indigo-500/60 transition-all';
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = color;
    checkbox.className = 'accent-indigo-500';
    label.append(checkbox, document.createTextNode(` ${color}`));
    colorOptions.append(label);
  });
  document.querySelectorAll('#form-product-colors input[type="checkbox"]').forEach(input => {
    input.checked = product.colors.includes(input.value);
  });
  productPhotoUrls(product.raw).slice(0, 5).forEach((url, index) => {
    document.getElementById(`form-product-link-${index + 1}`).value = url;
  });
  document.getElementById('form-product-desc').value = product.desc || '';
  const defaults = categoryDetails[product.collectionId]?.defaults || {};
  document.getElementById('form-product-size-details').value = product.sizeDetails || defaults.size || '';
  document.getElementById('form-product-benefits').value = product.benefits || defaults.benefits || '';
  document.getElementById('form-product-material-care').value = product.materialCare || defaults.material || '';
  detailFieldsCollectionId = product.collectionId;
  updateCategoryDetailFields();
  updateModalImagePreview();
  document.body.classList.add('modal-open');
  document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() {
  document.getElementById('product-modal').classList.add('hidden');
  document.body.classList.remove('modal-open');
}
function closeModal() { closeProductModal(); }

function resetProductSaveStatus() {
  const status = document.getElementById('product-save-status');
  if (!status) return;
  status.textContent = '';
  status.className = 'hidden rounded-xl border px-3.5 py-3 text-xs leading-relaxed';
}

function updateCategoryDetailFields() {
  const collectionId = document.getElementById('form-product-collection').value;
  const settings = categoryDetails[collectionId] || categoryDetails.accessories;
  document.getElementById('form-product-size-details-label').textContent = settings.sizeTitle;
  document.getElementById('form-product-benefits-label').textContent = settings.benefitsTitle;
  document.getElementById('form-product-material-label').textContent = settings.materialTitle;
  document.getElementById('form-product-size-details').placeholder = settings.sizePlaceholder;

  if (!document.getElementById('form-product-id').value && detailFieldsCollectionId && detailFieldsCollectionId !== collectionId) {
    const previousDefaults = categoryDetails[detailFieldsCollectionId]?.defaults || {};
    const nextDefaults = settings.defaults || {};
    const fields = [
      ['form-product-size-details', previousDefaults.size || '', nextDefaults.size || ''],
      ['form-product-benefits', previousDefaults.benefits || '', nextDefaults.benefits || ''],
      ['form-product-material-care', previousDefaults.material || '', nextDefaults.material || ''],
    ];
    fields.forEach(([id, previous, next]) => {
      const field = document.getElementById(id);
      if (!field.value.trim() || field.value === previous) field.value = next;
    });
  } else if (!document.getElementById('form-product-id').value && !detailFieldsCollectionId) {
    document.getElementById('form-product-size-details').value = settings.defaults?.size || '';
    document.getElementById('form-product-benefits').value = settings.defaults?.benefits || '';
    document.getElementById('form-product-material-care').value = settings.defaults?.material || '';
  }
  detailFieldsCollectionId = collectionId;
}

function updateModalImagePreview() {
  const selectedFile = document.getElementById('form-product-files').files[0];
  const firstLink = [...document.querySelectorAll('[data-photo-link]')].map(input => input.value.trim()).find(Boolean);
  const preview = document.getElementById('form-image-preview');
  if (selectedFile) {
    preview.src = URL.createObjectURL(selectedFile);
    return;
  }
  preview.src = firstLink || 'https://placehold.co/100x100/1e293b/94a3b8?text=IMG';
}

function populateModalCollectionSelect() {
  document.getElementById('form-product-collection').innerHTML = collections.map(collection => `<option value="${collection.id}">${collection.name}</option>`).join('');
}

function productToRaw(product, collection, values, isNew) {
  const raw = { ...(product?.raw || {}) };
  const titleChanged = raw.title !== values.title;
  raw.category = collection.name;
  raw.categoryId = collection.id;
  raw.title = values.title;
  raw.comingSoon = values.comingSoon === true;
  if (isNew || !raw.slug || titleChanged || /^product-\d+$/.test(raw.slug)) {
    raw.slug = uniqueProductSlug(values.title, product?.id);
  }
  raw.price = values.price;
  raw.description = values.desc;
  raw.videoUrl = values.videoUrl;
  raw.size = values.size;
  raw.colors = values.colors;
  raw.sizeDetails = values.sizeDetails;
  raw.benefits = values.benefits;
  raw.materialCare = values.materialCare;
  const detailSettings = categoryDetails[collection.id] || categoryDetails.accessories;
  raw.detailsLabels = {
    size: detailSettings.sizeTitle,
    benefits: detailSettings.benefitsTitle,
    material: detailSettings.materialTitle,
  };
  raw.published = raw.published ?? true;
  const photos = [];
  if (values.uploadedImages.length) photos.push({ source: 'gallery', images: values.uploadedImages });
  if (values.imageLinks.length) {
    photos.push(Object.fromEntries([['source', 'links'], ...values.imageLinks.map((url, index) => [`link${index + 1}`, url])]));
  }
  raw.photos = photos;
  if (values.uploadedImages[0] || values.imageLinks[0]) raw.image = values.uploadedImages[0] || values.imageLinks[0];
  else delete raw.image;
  return raw;
}

async function uploadProductImage(file) {
  file = await optimizeUploadImage(file);
  if (!file.type.startsWith('image/')) throw new Error('აირჩიე მხოლოდ ფოტოსურათის ფაილები.');
  const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-') || 'photo';
  const filename = `${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const content = encodeBase64Utf8FromBytes(await file.arrayBuffer());
  await githubRequest(`/repos/${GITHUB_REPO}/contents/images/uploads/${encodeURIComponent(filename)}`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: `Upload ${filename} from PUPSY CMS`, content, branch: GITHUB_BRANCH }),
  });
  return `/PUPSYWEB/images/uploads/${encodeURIComponent(filename)}`;
}

function productsForCollection(collectionId) {
  return products.filter(product => product.collectionId === collectionId).map(product => product.raw);
}

async function saveProductForm(event) {
  event.preventDefault();
  const saveButton = event.submitter;
  const status = document.getElementById('product-save-status');
  const isEditing = Boolean(document.getElementById('form-product-id').value);
  const actionLabel = isEditing ? 'კორექტირება' : 'ატვირთვა';
  const setSaveStatus = (message, isError = false) => {
    status.textContent = message;
    status.className = `rounded-xl border px-3.5 py-3 text-xs leading-relaxed ${isError ? 'border-rose-500/40 bg-rose-500/10 text-rose-200' : 'border-indigo-500/30 bg-indigo-500/10 text-indigo-200'}`;
  };
  if (saveButton) { saveButton.disabled = true; saveButton.textContent = isEditing ? 'კორექტირდება…' : 'იტვირთება…'; }
  setSaveStatus('მონაცემები მზადდება…');
  try {
    const id = document.getElementById('form-product-id').value;
    const existing = products.find(product => product.id === id);
    const previousSlug = existing?.raw?.slug || '';
    const targetId = document.getElementById('form-product-collection').value;
    const targetCollection = collections.find(collection => collection.id === targetId);
    if (!targetCollection) throw new Error('აირჩიე პროდუქტის კატეგორია.');
    const selectedFiles = [...document.getElementById('form-product-files').files];
    const uploadedImages = [];
    for (let index = 0; index < selectedFiles.length; index += 1) {
      setSaveStatus(`ფოტო იტვირთება (${index + 1}/${selectedFiles.length})…`);
      const file = selectedFiles[index];
      if (!stagedProductImageUploads.has(file)) {
        const upload = uploadProductImage(file).catch(error => {
          stagedProductImageUploads.delete(file);
          throw error;
        });
        stagedProductImageUploads.set(file, upload);
      }
      uploadedImages.push(await stagedProductImageUploads.get(file));
    }
    const imageLinks = [...document.querySelectorAll('[data-photo-link]')].map(input => input.value.trim()).filter(Boolean);
    const values = {
      title: document.getElementById('form-product-title').value.trim(),
      price: Number(document.getElementById('form-product-price').value),
      comingSoon: document.getElementById('form-product-coming-soon').checked,
      size: document.getElementById('form-product-size').value,
      colors: [...document.querySelectorAll('#form-product-colors input[type="checkbox"]:checked')].map(input => input.value),
      uploadedImages,
      imageLinks,
      videoUrl: document.getElementById('form-product-video').value.trim(),
      desc: document.getElementById('form-product-desc').value.trim(),
      sizeDetails: document.getElementById('form-product-size-details').value.trim(),
      benefits: document.getElementById('form-product-benefits').value.trim(),
      materialCare: document.getElementById('form-product-material-care').value.trim(),
    };
    const raw = productToRaw(existing, targetCollection, values, !existing);
    setSaveStatus('პროდუქტის მონაცემები GitHub-ზე ინახება…');
    if (existing && existing.collectionId !== targetId) {
      const oldData = collectionFiles[existing.collectionId].data;
      oldData.products = productsForCollection(existing.collectionId).filter((_, index) => index !== existing.index);
      await commitJson(`products/categories/${collections.find(c => c.id === existing.collectionId).file}`, oldData);
      products = products.filter(product => product.id !== existing.id);
    } else if (existing) {
      const list = productsForCollection(targetId);
      list[existing.index] = raw;
      collectionFiles[targetId].data.products = list;
    } else {
      collectionFiles[targetId].data.products = [...productsForCollection(targetId), raw];
    }
    if (!existing || existing.collectionId !== targetId) {
      collectionFiles[targetId].data.products = [...productsForCollection(targetId), raw];
    }
    await commitJson(`products/categories/${targetCollection.file}`, collectionFiles[targetId].data);
    await saveProductRoute(raw.slug);
    if (previousSlug && previousSlug !== raw.slug) await deleteProductRoute(previousSlug);
    stagedProductImageUploads.clear();
    closeProductModal();
    showToast(existing ? 'პროდუქტი განახლდა' : 'პროდუქტი დაემატა');
    try {
      await initializeDashboard();
    } catch (error) {
      showToast(`პროდუქტი GitHub-ზე აიტვირთა, მაგრამ სია ვერ განახლდა: ${error.message}`, 'error', 9000);
    }
  } catch (error) {
    const message = error.message || 'პროდუქტის ატვირთვა ვერ მოხერხდა.';
    setSaveStatus(`ვერ აიტვირთა: ${message} მონაცემები ფორმაში დარჩა — შეასწორე პრობლემა და თავიდან სცადე.`, true);
    showToast(message, 'error', 9000);
  } finally {
    if (saveButton) { saveButton.disabled = false; saveButton.textContent = actionLabel; }
  }
}

async function deleteProduct(id) {
  const product = products.find(item => item.id === id);
  if (!product || !window.confirm('ნამდვილად წავშალო ეს პროდუქტი?')) return;
  try {
    const collection = collections.find(item => item.id === product.collectionId);
    const file = collectionFiles[product.collectionId];
    file.data.products = productsForCollection(product.collectionId).filter((_, index) => index !== product.index);
    await commitJson(`products/categories/${collection.file}`, file.data);
    await deleteProductRoute(product.raw?.slug);
    await initializeDashboard();
    showToast('პროდუქტი წაიშალა');
  } catch (error) { showToast(error.message || 'პროდუქტის წაშლა ვერ მოხერხდა'); }
}

function renderMediaGallery() {
  const grid = document.getElementById('media-grid');
  document.getElementById('media-count').textContent = mediaFiles.length;
  grid.innerHTML = mediaFiles.map(file => `<div class="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center"><img loading="lazy" decoding="async" src="${escapeAttribute(file.url)}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform"><div class="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"><span class="text-[10px] text-slate-300 font-mono truncate">${escapeHtml(file.name)}</span><div class="flex items-center justify-end gap-1"><button onclick="copyMediaUrl('${escapeAttribute(file.url)}')" title="URL-ის კოპირება" class="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button></div></div></div>`).join('');
  lucide.createIcons();
}

async function handleMediaUpload(event) {
  const files = [...(event.target.files || [])];
  if (!files.length) return;
  try {
    for (const file of files) {
      const optimizedFile = await optimizeUploadImage(file);
      const safeName = optimizedFile.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const content = encodeBase64Utf8FromBytes(await optimizedFile.arrayBuffer());
      await githubRequest(`/repos/${GITHUB_REPO}/contents/images/uploads/${encodeURIComponent(filename)}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `Upload ${filename} from PUPSY CMS`, content, branch: GITHUB_BRANCH }),
      });
    }
    mediaFiles = await loadMediaFiles();
    renderMediaGallery();
    showToast('ფაილები აიტვირთა');
  } catch (error) { showToast(error.message || 'ფაილის ატვირთვა ვერ მოხერხდა'); }
  finally { event.target.value = ''; }
}

function encodeBase64Utf8FromBytes(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let index = 0; index < bytes.length; index += 0x8000) {
    binary += String.fromCharCode(...bytes.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function copyMediaUrl(url) {
  navigator.clipboard.writeText(new URL(url, window.location.origin).href)
    .then(() => showToast('URL დაკოპირდა'))
    .catch(() => showToast('URL-ის კოპირება ვერ მოხერხდა'));
}

function showToast(message, type = 'success', duration = 3200) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `bg-slate-900 border ${type === 'error' ? 'border-rose-500/50' : 'border-slate-700'} text-slate-100 px-3.5 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto`;
  const icon = document.createElement('i');
  icon.dataset.lucide = type === 'error' ? 'alert-circle' : 'check-circle-2';
  icon.className = `w-4 h-4 ${type === 'error' ? 'text-rose-400' : 'text-emerald-400'}`;
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(icon, text);
  container.appendChild(toast);
  lucide.createIcons();
  requestAnimationFrame(() => toast.classList.remove('translate-y-2', 'opacity-0'));
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
