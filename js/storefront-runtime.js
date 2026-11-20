(function () {
  "use strict";

  // Configuration used by the local theme for layout and price formatting.
  window.PupsyStorefront = {
    currency: { active: "GEL", rate: "1.0" },
    designMode: false,
    loadFeatures(features) {
      for (const feature of features) {
        feature.onLoad?.(new Error(`Unsupported storefront feature: ${feature.name}`));
      }
    },
  };

  // Custom properties can be consumed by stylesheets in a different directory.
  for (const style of document.querySelectorAll("style")) {
    const source = style.textContent;
    const updated = source.replace(/(--[\w-]+\s*:\s*url\(\s*)(["']?)(images\/[^)"'\s]+)\2\s*\)/g,
      (_, prefix, quote, path) => `${prefix}"${new URL(path, document.baseURI).href}")`);
    if (source !== updated) style.textContent = updated;
  }
})();
