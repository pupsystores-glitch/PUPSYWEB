(() => {
  const previewObserver = new IntersectionObserver(entries => {
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

  const getPageName = () => {
    const lastPart = window.location.pathname.split('/').filter(Boolean).pop();
    return (lastPart || 'index.html').toLowerCase();
  };

  const createVideo = (item, preview = false) => {
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    if (preview) {
      video.dataset.src = item.url;
      video.autoplay = true;
      previewObserver.observe(video);
    } else {
      video.src = item.url;
    }
    return video;
  };

  const appendToColumnGallery = (items) => {
    const cards = [...document.querySelectorAll('.grid-item')];
    const template = cards.find(card => card.querySelector('.column__image video'));
    const gallery = template?.parentElement;
    if (!template || !gallery) return;

    items.forEach(item => {
      const card = template.cloneNode(true);
      const image = card.querySelector('.column__image');
      const wrapper = image?.querySelector('.image-wrapper');
      if (!image || !wrapper) return;
      const video = createVideo(item, true);
      video.style.cssText = template.querySelector('.column__image video')?.style.cssText || '';
      wrapper.replaceChildren(video);
      const caption = card.querySelector('.column__text p');
      if (caption) caption.textContent = item.caption;
      card.querySelector('.column__btn')?.remove();
      card.dataset.cmsVideoId = item.id;
      gallery.append(card);
    });
  };

  const appendToAmbassadorGallery = (items) => {
    const gallery = document.querySelector('.ambassador-video-section__grid');
    if (!gallery || !items.length) return;
    gallery.replaceChildren();
    const posters = [
      'https://images.unsplash.com/photo-1765278134601-3f2dc85d1edf?auto=format&fit=crop&w=480&q=40',
      'https://images.unsplash.com/photo-1767101608062-4eadebf5a889?auto=format&fit=crop&w=480&q=40',
      'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?auto=format&fit=crop&w=480&q=40',
      'https://images.unsplash.com/photo-1686908904084-34e0c26b5f71?auto=format&fit=crop&w=480&q=40',
      'https://images.unsplash.com/photo-1737482810276-80dfd5948034?auto=format&fit=crop&w=480&q=40',
      'https://images.unsplash.com/photo-1751315722210-3eb0c4a028c0?auto=format&fit=crop&w=480&q=40'
    ];
    items.forEach(item => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'ambassador-video-slot ambassador-managed-video';
      card.dataset.videoUrl = item.url;
      card.setAttribute('aria-label', `ვიდეოს ნახვა: ${item.caption}`);
      const poster = document.createElement('img');
      poster.className = 'ambassador-managed-video__poster';
      poster.src = posters[items.indexOf(item) % posters.length];
      poster.alt = item.caption;
      poster.loading = 'lazy';
      poster.decoding = 'async';
      card.append(poster);
      const playIcon = document.createElement('span');
      playIcon.className = 'ambassador-managed-video__play';
      playIcon.setAttribute('aria-hidden', 'true');
      playIcon.textContent = '▶';
      card.append(playIcon);
      const caption = document.createElement('span');
      caption.className = 'ambassador-video-slot__label';
      caption.textContent = item.caption;
      card.append(caption);
      gallery.append(card);
    });
  };

  const loadPageVideos = async () => {
    const page = getPageName();
    if (!['index.html', 'about.html', 'ambassador.html'].includes(page)) return;
    const response = await fetch('content/page-videos.json', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();
    const items = Array.isArray(data.pages?.[page]) ? data.pages[page] : [];
    if (page === 'ambassador.html') appendToAmbassadorGallery(items);
    else appendToColumnGallery(items);
  };

  loadPageVideos().catch(error => console.warn('Could not load page videos.', error));
})();
