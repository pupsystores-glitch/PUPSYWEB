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

  const feed = document.querySelector('#insta-feed');
  const wrapper = feed?.querySelector('.instafeed-new-layout-wrapper');
  if (!feed || !wrapper) return;

  const style = document.createElement('style');
  style.textContent = `
    #insta-feed .instafeed-new-layout-container {
      width: 100% !important;
      height: auto !important;
      max-width: 1100px;
      margin: 0 auto;
      overflow: visible !important;
    }
    #insta-feed .instafeed-new-layout-wrapper {
      display: grid !important;
      grid-template-columns: repeat(4, minmax(0, 1fr));
      gap: 4px !important;
      width: 100%;
    }
    #insta-feed .ambassador-video-tile {
      position: relative;
      width: auto !important;
      height: auto !important;
      aspect-ratio: 1;
      overflow: hidden;
      background: #171513;
    }
    #insta-feed .ambassador-video-tile video,
    #insta-feed .ambassador-video-tile img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    @media (max-width: 600px) {
      #insta-feed .instafeed-new-layout-wrapper {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
    }
  `;
  document.head.append(style);

  wrapper.replaceChildren();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        if (!target.dataset.loaded) {
          target.dataset.loaded = 'true';
          target.src = target.dataset.src;
          target.preload = 'metadata';
          target.load();
        }
        target.play().catch(() => {});
      } else {
        target.pause();
      }
    });
  }, { threshold: 0.15 });

  mediaItems.forEach((item, index) => {
    const tile = document.createElement('div');
    tile.className = 'instafeed-new-layout-item ambassador-video-tile';

    if (item.type === 'image') {
      const image = document.createElement('img');
      image.src = item.url;
      image.alt = 'ძაღლის ფოტო';
      image.loading = 'lazy';
      image.decoding = 'async';
      tile.append(image);
    } else {
      const video = document.createElement('video');
      video.dataset.src = item.url;
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.controls = true;
      video.preload = 'none';
      video.setAttribute('aria-label', `მოკლე ვიდეო ${index + 1}`);
      tile.append(video);
      observer.observe(video);
    }

    wrapper.append(tile);
  });
})();
