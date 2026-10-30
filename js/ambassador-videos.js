(() => {
  const mediaItems = [
    { type: 'image', url: 'https://images.unsplash.com/photo-1765278134601-3f2dc85d1edf?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1767101608062-4eadebf5a889?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-360p-h264-10s.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1686908904084-34e0c26b5f71?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-480p-30s.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1737482810276-80dfd5948034?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1751315722210-3eb0c4a028c0?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-720p-60fps.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1656529569201-2cdbe5f509cd?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1769117317230-aa2ae87de191?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-720p-h264-10s.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1765278134477-bbdf6599a1e8?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1644308168029-0da21dfba47f?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-720p-no-audio.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1722553777944-99f73ce48fc8?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1667152927602-208d4245fc90?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-vertical-1080x1920-9x16.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1599061171921-61b5cd73410b?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1500862341394-4477ad3e8af2?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-1080p-h264-10s.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1746561801596-b00c9cd2c981?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1720749407529-d812eb277413?auto=format&fit=crop&w=480&q=40' },
    { type: 'video', url: 'https://convertico.com/samples/download.php?file=sample-mp4-360p-h264-10s.mp4&format=mp4' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1759353180340-2a171f0e3e2d?auto=format&fit=crop&w=480&q=40' },
    { type: 'image', url: 'https://images.unsplash.com/photo-1703733570809-9a9765f3da73?auto=format&fit=crop&w=480&q=40' }
  ];
  const posters = mediaItems.filter(item => item.type === 'image').map(item => item.url);

  const feed = document.querySelector('#insta-feed');
  const wrapper = feed?.querySelector('.instafeed-new-layout-wrapper');
  if (!feed || !wrapper) return;

  const style = document.createElement('style');
  style.textContent = `
    #shopify-block-AaU5DSTR3RGxySlVWS__instafeed_app_block_k6PYBy #insta-feed .instafeed-new-layout-container {
      width: 100% !important;
      height: auto !important;
      max-width: 1100px;
      margin: 0 auto;
      overflow: visible !important;
    }
    #shopify-block-AaU5DSTR3RGxySlVWS__instafeed_app_block_k6PYBy #insta-feed .instafeed-new-layout-wrapper {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 4px !important;
      width: 100%;
    }
    #shopify-block-AaU5DSTR3RGxySlVWS__instafeed_app_block_k6PYBy #insta-feed .ambassador-video-tile {
      position: relative;
      display: block;
      width: auto !important;
      height: auto !important;
      min-width: 0;
      aspect-ratio: 1;
      overflow: hidden;
      padding: 0;
      border: 0;
      appearance: none;
      -webkit-appearance: none;
      color: inherit;
      font: inherit;
      background: #171513;
      cursor: pointer;
    }
    #insta-feed .ambassador-video-tile img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    #insta-feed .ambassador-video-play {
      position: absolute;
      inset: 0;
      display: grid;
      place-items: center;
      color: #fff;
      font: 700 34px/1 Arial, sans-serif;
      text-shadow: 0 1px 8px rgba(0,0,0,.7);
      pointer-events: none;
    }
    .ambassador-feed-viewer[hidden] { display: none !important; }
    .ambassador-feed-viewer {
      position: fixed;
      inset: 0;
      z-index: 100000;
      display: grid;
      place-items: center;
      padding: 18px;
      background: rgba(0,0,0,.9);
    }
    .ambassador-feed-viewer video {
      width: min(100%, 900px);
      max-height: 82vh;
      object-fit: contain;
      background: #000;
    }
    .ambassador-feed-viewer__close {
      position: absolute;
      top: max(14px, env(safe-area-inset-top));
      right: max(14px, env(safe-area-inset-right));
      z-index: 1;
      width: 44px;
      height: 44px;
      border: 0;
      border-radius: 50%;
      background: #fff;
      color: #222;
      font-size: 28px;
    }
    @media (max-width: 600px) {
      #shopify-block-AaU5DSTR3RGxySlVWS__instafeed_app_block_k6PYBy #insta-feed .instafeed-new-layout-wrapper {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `;
  document.head.append(style);

  const viewer = document.createElement('div');
  viewer.className = 'ambassador-feed-viewer';
  viewer.hidden = true;
  viewer.innerHTML = '<button type="button" class="ambassador-feed-viewer__close" aria-label="Close video">×</button><div class="ambassador-feed-viewer__content"></div>';
  document.body.append(viewer);
  const videoContainer = viewer.querySelector('.ambassador-feed-viewer__content');
  const closeViewer = () => {
    const video = videoContainer.querySelector('video');
    video?.pause();
    if (video) {
      video.removeAttribute('src');
      video.load();
    }
    videoContainer.replaceChildren();
    viewer.hidden = true;
    document.body.style.overflow = '';
  };
  viewer.querySelector('.ambassador-feed-viewer__close').addEventListener('click', closeViewer);
  viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });

  const openVideo = url => {
    const video = document.createElement('video');
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.preload = 'none';
    video.src = url;
    videoContainer.replaceChildren(video);
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    video.play().catch(() => {});
  };

  wrapper.replaceChildren();
  mediaItems.forEach((item, index) => {
    const image = document.createElement('img');
    image.src = item.type === 'image' ? item.url : posters[index % posters.length];
    image.alt = item.type === 'image' ? 'ძაღლის ფოტო' : 'ვიდეოს ყდა';
    image.loading = 'lazy';
    image.decoding = 'async';

    if (item.type === 'image') {
      const tile = document.createElement('div');
      tile.className = 'instafeed-new-layout-item ambassador-video-tile';
      tile.append(image);
      wrapper.append(tile);
      return;
    }

    const tile = document.createElement('button');
    tile.type = 'button';
    tile.className = 'instafeed-new-layout-item ambassador-video-tile';
    tile.setAttribute('aria-label', `ვიდეოს დაკვრა ${index + 1}`);
    tile.append(image);
    const playIcon = document.createElement('span');
    playIcon.className = 'ambassador-video-play';
    playIcon.setAttribute('aria-hidden', 'true');
    playIcon.textContent = '▶';
    tile.append(playIcon);
    tile.addEventListener('click', () => openVideo(item.url));
    wrapper.append(tile);
  });
})();
