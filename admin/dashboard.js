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
let collectionFiles = {};
let pageVideosData = { pages: {} };
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
  try { mediaFiles = await loadMediaFiles(); } catch { mediaFiles = []; }
  const pageVideosFile = await githubFile('content/page-videos.json');
  pageVideosData = pageVideosFile.data || { pages: {} };

  const firstWithProducts = collections.find(collection => products.some(product => product.collectionId === collection.id));
  if (!products.some(product => product.collectionId === activeCollectionId) && firstWithProducts) {
    activeCollectionId = firstWithProducts.id;
  }
  populateModalCollectionSelect();
  selectCollection(activeCollectionId);
  renderMediaGallery();
  renderPageVideos();
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
  ['contents', 'media', 'videos'].forEach(view => {
    document.getElementById(`${view}-view`).classList.toggle('hidden', view !== tab);
    document.getElementById(`tab-${view}-btn`).className = view === tab ? selected : idle;
  });
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
    container.innerHTML = filtered.map(product => `<div class="p-3 bg-slate-900/60 hover:bg-slate-800/60 border border-slate-800/80 rounded-xl flex items-center justify-between gap-3 transition-all group"><div class="flex items-center gap-3 min-w-0"><img src="${escapeAttribute(product.image || fallback)}" onerror="this.src='${fallback}'" alt="" class="w-12 h-12 rounded-lg object-cover border border-slate-800 bg-slate-950 shrink-0"><div class="min-w-0"><h4 class="font-bold text-slate-100 text-xs sm:text-sm truncate">${escapeHtml(product.title)}</h4><div class="flex items-center gap-2 mt-0.5"><span class="text-xs font-bold text-indigo-400">₾${Number(product.price).toFixed(2)}</span>${product.size ? `<span class="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded">${escapeHtml(product.size)}</span>` : ''}</div></div></div><div class="flex items-center gap-1 shrink-0"><button onclick="openEditProductModal('${product.id}')" title="რედაქტირება" class="p-2 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"><i data-lucide="edit-2" class="w-4 h-4"></i></button><button onclick="deleteProduct('${product.id}')" title="წაშლა" class="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"><i data-lucide="trash-2" class="w-4 h-4"></i></button></div></div>`).join('');
  } else {
    container.className = 'grid grid-cols-2 gap-3 pt-2';
    container.innerHTML = filtered.map(product => `<div class="p-3 bg-slate-900/60 border border-slate-800/80 rounded-xl space-y-2 flex flex-col justify-between group"><div class="space-y-2"><div class="aspect-square w-full rounded-lg bg-slate-950 border border-slate-800 overflow-hidden relative"><img src="${escapeAttribute(product.image || fallback)}" onerror="this.src='${fallback}'" alt="" class="w-full h-full object-cover"></div><div><h4 class="font-bold text-slate-100 text-xs line-clamp-1">${escapeHtml(product.title)}</h4><p class="text-xs font-bold text-indigo-400 mt-0.5">₾${Number(product.price).toFixed(2)}</p></div></div><div class="flex items-center justify-end gap-1 pt-2 border-t border-slate-800/60"><button onclick="openEditProductModal('${product.id}')" class="p-1.5 text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all"><i data-lucide="edit-2" class="w-3.5 h-3.5"></i></button><button onclick="deleteProduct('${product.id}')" class="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-all"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button></div></div>`).join('');
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
  raw.title = values.title;
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
  grid.innerHTML = mediaFiles.map(file => `<div class="group relative bg-slate-900 border border-slate-800 rounded-xl overflow-hidden aspect-square flex items-center justify-center"><img src="${escapeAttribute(file.url)}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-transform"><div class="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2"><span class="text-[10px] text-slate-300 font-mono truncate">${escapeHtml(file.name)}</span><div class="flex items-center justify-end gap-1"><button onclick="copyMediaUrl('${escapeAttribute(file.url)}')" title="URL-ის კოპირება" class="p-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-all"><i data-lucide="copy" class="w-3.5 h-3.5"></i></button></div></div></div>`).join('');
  lucide.createIcons();
}

async function handleMediaUpload(event) {
  const files = [...(event.target.files || [])];
  if (!files.length) return;
  try {
    for (const file of files) {
      const safeName = file.name.normalize('NFKD').replace(/[^a-zA-Z0-9._-]+/g, '-');
      const filename = `${Date.now()}-${safeName}`;
      const content = encodeBase64Utf8FromBytes(await file.arrayBuffer());
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
