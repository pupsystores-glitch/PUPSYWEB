(() => {
  const videoUrls = [
    'https://media.w3.org/wai/perspective-videos/clear-layout-design.mp4',
    'https://media.w3.org/wai/perspective-videos/clear-layout-design-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/colors-with-good-contrast.mp4',
    'https://media.w3.org/wai/perspective-videos/colors-with-good-contrast-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/customizable-text.mp4',
    'https://media.w3.org/wai/perspective-videos/customizable-text-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/keyboard-compatibility.mp4',
    'https://media.w3.org/wai/perspective-videos/keyboard-compatibility-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/large-links-buttons-controls.mp4',
    'https://media.w3.org/wai/perspective-videos/large-links-buttons-controls-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/notifications-feedback.mp4',
    'https://media.w3.org/wai/perspective-videos/notifications-feedback-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/text-to-speech.mp4',
    'https://media.w3.org/wai/perspective-videos/text-to-speech-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/understandable-content.mp4',
    'https://media.w3.org/wai/perspective-videos/understandable-content-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/video-captions.mp4',
    'https://media.w3.org/wai/perspective-videos/video-captions-ad.mp4',
    'https://media.w3.org/wai/perspective-videos/voice-recognition.mp4',
    'https://media.w3.org/wai/perspective-videos/voice-recognition-ad.mp4',
    'https://media.w3.org/wai/evaluation-intros/conformance-evaluation.mp4',
    'https://media.w3.org/wai/evaluation-intros/easy-checks-accessibility.mp4',
    'https://media.w3.org/wai/evaluation-intros/evaluating-resources-overview.mp4',
    'https://media.w3.org/wai/evaluation-intros/involving-users.mp4',
    'https://media.w3.org/wai/evaluation-intros/tools-for-evaluating.mp4',
    'https://media.w3.org/wai/accessibility-intro/intro.mp4'
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
    #insta-feed .ambassador-video-tile video {
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
        target.preload = 'metadata';
        target.load();
        target.play().catch(() => {});
      } else {
        target.pause();
      }
    });
  }, { threshold: 0.15 });

  videoUrls.forEach((url, index) => {
    const tile = document.createElement('div');
    tile.className = 'instafeed-new-layout-item ambassador-video-tile';
    const video = document.createElement('video');
    video.src = url;
    video.muted = true;
    video.loop = true;
    video.autoplay = true;
    video.playsInline = true;
    video.controls = true;
    video.preload = 'none';
    video.setAttribute('aria-label', `Video ${index + 1}`);
    tile.append(video);
    wrapper.append(tile);
    observer.observe(video);
  });
})();
