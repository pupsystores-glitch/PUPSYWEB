(() => {
  const galleries = [...document.querySelectorAll('.ambassador-community-gallery__grid')];
  if (!galleries.length) return;

  const viewer = document.createElement('div');
  viewer.className = 'ambassador-feed-viewer';
  viewer.hidden = true;
  viewer.innerHTML = '<button type="button" class="ambassador-feed-viewer__close" aria-label="Close">&#215;</button><button type="button" class="ambassador-feed-viewer__nav ambassador-feed-viewer__nav--prev" data-viewer-step="-1" aria-label="Previous">&#8249;</button><div class="ambassador-feed-viewer__content"></div><button type="button" class="ambassador-feed-viewer__nav ambassador-feed-viewer__nav--next" data-viewer-step="1" aria-label="Next">&#8250;</button>';
  document.body.append(viewer);

  const content = viewer.querySelector('.ambassador-feed-viewer__content');
  let activeTiles = [];
  let activeIndex = 0;
  let lastFocused = null;
  let closeTimer = 0;
  let touchStartX = 0;

  const stopCurrentMedia = () => {
    const media = content.querySelector('video');
    if (!media) return;
    media.pause();
    media.removeAttribute('src');
    media.load();
  };

  const limitToShortClip = video => {
    let stoppedAtClipEnd = false;
    video.addEventListener('play', () => { stoppedAtClipEnd = false; });
    video.addEventListener('timeupdate', () => {
      if (!stoppedAtClipEnd && video.currentTime >= 3.5) {
        stoppedAtClipEnd = true;
        video.pause();
        video.currentTime = 0;
      }
    });
  };

  const render = () => {
    stopCurrentMedia();
    const tile = activeTiles[activeIndex];
    if (!tile) return;
    const videoUrl = tile.dataset.ambassadorVideoUrl || tile.dataset.videoUrl;
    content.replaceChildren();

    if (videoUrl) {
      const video = document.createElement('video');
      limitToShortClip(video);
      video.src = videoUrl;
      video.poster = tile.querySelector('img')?.src || '';
      video.controls = true;
      video.autoplay = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'none';
      content.append(video);
      video.play().catch(() => {});
      return;
    }

    const image = document.createElement('img');
    image.src = tile.dataset.ambassadorImageUrl || tile.querySelector('img')?.src || '';
    image.alt = tile.querySelector('img')?.alt || '';
    content.append(image);
  };

  const openViewer = () => {
    window.clearTimeout(closeTimer);
    render();
    viewer.hidden = false;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => window.requestAnimationFrame(() => viewer.classList.add('is-open')));
  };

  const closeViewer = () => {
    viewer.classList.remove('is-open');
    stopCurrentMedia();
    document.body.style.overflow = '';
    closeTimer = window.setTimeout(() => {
      viewer.hidden = true;
      content.replaceChildren();
      lastFocused?.focus();
    }, 260);
  };

  const step = direction => {
    content.classList.add('is-switching');
    window.setTimeout(() => {
      activeIndex = (activeIndex + direction + activeTiles.length) % activeTiles.length;
      render();
      window.requestAnimationFrame(() => content.classList.remove('is-switching'));
    }, 130);
  };

  galleries.forEach(gallery => {
    const tiles = [...gallery.querySelectorAll('[data-ambassador-image-url], [data-ambassador-video-url], [data-video-url]')];
    gallery.addEventListener('click', event => {
      const tile = event.target.closest('[data-ambassador-image-url], [data-ambassador-video-url], [data-video-url]');
      if (!tile || !tiles.includes(tile)) return;
      activeTiles = tiles;
      activeIndex = tiles.indexOf(tile);
      lastFocused = tile;
      openViewer();
    });
  });

  viewer.querySelector('.ambassador-feed-viewer__close').addEventListener('click', closeViewer);
  viewer.querySelectorAll('[data-viewer-step]').forEach(button => {
    button.addEventListener('click', () => step(Number(button.dataset.viewerStep)));
  });
  viewer.addEventListener('click', event => { if (event.target === viewer) closeViewer(); });
  content.addEventListener('touchstart', event => { touchStartX = event.changedTouches[0].clientX; }, { passive: true });
  content.addEventListener('touchend', event => {
    const distance = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(distance) > 55) step(distance < 0 ? 1 : -1);
  }, { passive: true });
  document.addEventListener('keydown', event => {
    if (viewer.hidden) return;
    if (event.key === 'Escape') closeViewer();
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  });
})();
