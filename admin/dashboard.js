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

let activeCollectionId = 'collars';
let currentLayout = 'list';
let products = [];
let mediaFiles = [];
let collectionFiles = {};
let accessToken = sessionStorage.getItem('pupsy_github_token') || '';
let authPopup = null;

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

  const firstWithProducts = collections.find(collection => products.some(product => product.collectionId === collection.id));
  if (!products.some(product => product.collectionId === activeCollectionId) && firstWithProducts) {
    activeCollectionId = firstWithProducts.id;
  }
  populateModalCollectionSelect();
  selectCollection(activeCollectionId);
  renderMediaGallery();
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
  const gallery = (raw.photos || []).find(photo => photo.source === 'gallery');
  const image = gallery?.images?.[0] || raw.image || raw.imageUrl || '';
  return {
    id: `${collection.id}:${index}`,
    collectionId: collection.id,
    title: raw.title || '',
    price: Number(raw.price || 0),
    size: raw.size || (Array.isArray(raw.attributes) ? raw.attributes.join(', ') : ''),
    image,
    desc: raw.description || '',
    raw,
    index,
  };
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
  if (!response.ok) throw new Error(data.message || `GitHub API შეცდომა (${response.status})`);
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
  const latest = await githubFile(path);
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
}

async function loadMediaFiles() {
  const entries = await githubRequest(`/repos/${GITHUB_REPO}/contents/images/uploads?ref=${GITHUB_BRANCH}`);
  return entries
    .filter(file => file.type === 'file' && /\.(png|jpe?g|webp|gif|avif)$/i.test(file.name))
    .map(file => ({ id: file.sha, name: file.name, url: `/PUPSYWEB/images/uploads/${encodeURIComponent(file.name)}` }));
}

function switchMainTab(tab) {
  const contentsView = document.getElementById('contents-view');
  const mediaView = document.getElementById('media-view');
  const contentsButton = document.getElementById('tab-contents-btn');
  const mediaButton = document.getElementById('tab-media-btn');
  const selected = 'px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all bg-indigo-600 text-white active-tab-glow';
  const idle = 'px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 text-slate-400 hover:text-white transition-all';
  const showMedia = tab === 'media';
  contentsView.classList.toggle('hidden', showMedia);
  mediaView.classList.toggle('hidden', !showMedia);
  contentsButton.className = showMedia ? idle : selected;
  mediaButton.className = showMedia ? selected : idle;
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
  document.getElementById('product-form').reset();
  document.getElementById('form-product-id').value = '';
  document.getElementById('form-product-collection').value = activeCollectionId;
  document.getElementById('form-image-preview').src = 'https://placehold.co/100x100/1e293b/94a3b8?text=IMG';
  document.getElementById('product-modal').classList.remove('hidden');
}

function openEditProductModal(id) {
  const product = products.find(item => item.id === id);
  if (!product) return;
  document.getElementById('modal-title').textContent = 'პროდუქტის რედაქტირება';
  document.getElementById('form-product-id').value = product.id;
  document.getElementById('form-product-title').value = product.title;
  document.getElementById('form-product-collection').value = product.collectionId;
  document.getElementById('form-product-price').value = product.price;
  document.getElementById('form-product-size').value = product.size || '';
  document.getElementById('form-product-image').value = product.image || '';
  document.getElementById('form-product-desc').value = product.desc || '';
  updateModalImagePreview();
  document.getElementById('product-modal').classList.remove('hidden');
}

function closeProductModal() { document.getElementById('product-modal').classList.add('hidden'); }
function closeModal() { closeProductModal(); }

function updateModalImagePreview() {
  const value = document.getElementById('form-product-image').value.trim();
  document.getElementById('form-image-preview').src = value || 'https://placehold.co/100x100/1e293b/94a3b8?text=IMG';
}

function populateModalCollectionSelect() {
  document.getElementById('form-product-collection').innerHTML = collections.map(collection => `<option value="${collection.id}">${collection.name}</option>`).join('');
}

function productToRaw(product, collection, values, isNew) {
  const raw = { ...(product?.raw || {}) };
  raw.category = collection.name;
  raw.title = values.title;
  if (isNew || raw.slug) raw.slug = raw.slug || `product-${Date.now()}`;
  raw.price = values.price;
  raw.description = values.desc;
  raw.size = values.size;
  raw.published = raw.published ?? true;
  if (values.image) {
    const photos = Array.isArray(raw.photos) ? raw.photos.map(photo => ({ ...photo })) : [];
    const gallery = photos.find(photo => photo.source === 'gallery');
    if (gallery) {
      const images = [...(gallery.images || [])];
      images[0] = values.image;
      gallery.images = images;
    } else photos.unshift({ source: 'gallery', images: [values.image] });
    raw.photos = photos;
  }
  return raw;
}

function productsForCollection(collectionId) {
  return products.filter(product => product.collectionId === collectionId).map(product => product.raw);
}

async function saveProductForm(event) {
  event.preventDefault();
  const saveButton = event.submitter;
  if (saveButton) { saveButton.disabled = true; saveButton.textContent = 'ინახება…'; }
  try {
    const id = document.getElementById('form-product-id').value;
    const existing = products.find(product => product.id === id);
    const targetId = document.getElementById('form-product-collection').value;
    const targetCollection = collections.find(collection => collection.id === targetId);
    const values = {
      title: document.getElementById('form-product-title').value.trim(),
      price: Number(document.getElementById('form-product-price').value),
      size: document.getElementById('form-product-size').value.trim(),
      image: document.getElementById('form-product-image').value.trim(),
      desc: document.getElementById('form-product-desc').value.trim(),
    };
    const raw = productToRaw(existing, targetCollection, values, !existing);
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
    closeProductModal();
    await initializeDashboard();
    showToast(existing ? 'პროდუქტი განახლდა' : 'პროდუქტი დაემატა');
  } catch (error) {
    showToast(error.message || 'პროდუქტის შენახვა ვერ მოხერხდა');
  } finally {
    if (saveButton) { saveButton.disabled = false; saveButton.textContent = 'შენახვა'; }
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

function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'bg-slate-900 border border-slate-700 text-slate-100 px-3.5 py-2.5 rounded-xl shadow-2xl text-xs font-semibold flex items-center gap-2 transform transition-all duration-300 translate-y-2 opacity-0 pointer-events-auto';
  const icon = document.createElement('i');
  icon.dataset.lucide = 'check-circle-2';
  icon.className = 'w-4 h-4 text-emerald-400';
  const text = document.createElement('span');
  text.textContent = message;
  toast.append(icon, text);
  container.appendChild(toast);
  lucide.createIcons();
  requestAnimationFrame(() => toast.classList.remove('translate-y-2', 'opacity-0'));
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
