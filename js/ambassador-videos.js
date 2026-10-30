(() => {
  const gallery = document.querySelector('.ambassador-community-gallery__grid');
  if (!gallery) return;

  const viewer = document.createElement('div');
  viewer.className = 'ambassador-feed-viewer';
  viewer.hidden = true;
  viewer.innerHTML = '<button type="button" class="ambassador-feed-viewer__close" aria-label="Close video">×</button><div class="ambassador-feed-viewer__content"></div>';
  document.body.append(viewer);
  const content = viewer.querySelector('.ambassador-feed-viewer__content');

  const close = () => {
    const video = content.querySelector('video');
    video?.pause();
    if (video) {
      video.removeAttribute('src');
      video.load();
    }
    content.replaceChildren();
    viewer.hidden = true;
    document.body.style.overflow = '';
  };

  const open = url => {
    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.playsInline = true;
    video.preload = 'none';
    content.replaceChildren(video);
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    video.play().catch(() => {});
  };

  viewer.querySelector('.ambassador-feed-viewer__close').addEventListener('click', close);
  viewer.addEventListener('click', event => { if (event.target === viewer) close(); });
  gallery.addEventListener('click', event => {
    const button = event.target.closest('[data-ambassador-video-url]');
    if (button) open(button.dataset.ambassadorVideoUrl);
  });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && !viewer.hidden) close(); });
})();
