(() => {
  const priceSelector = [
    "[data-product-price]",
    "[data-price-wrapper]",
    ".product__price",
    ".product-item__price",
    ".cart__total__price",
    ".cart__item__price",
    ".cart__price",
    ".price-item"
  ].join(",");

  function replaceDollarSigns(textNode) {
    if (!textNode.nodeValue.includes("$") || !textNode.parentElement?.closest(priceSelector)) return;

    const segments = textNode.nodeValue.split("$");
    const fragment = document.createDocumentFragment();
    segments.forEach((segment, index) => {
      if (index > 0) {
        const logo = document.createElement("img");
        logo.className = "lari-currency-logo";
        logo.src = "images/Lari_logo.png";
        logo.alt = "GEL";
        logo.setAttribute("aria-label", "Georgian lari");
        fragment.append(logo);
      }
      if (segment) fragment.append(document.createTextNode(segment));
    });
    textNode.replaceWith(fragment);
  }

  function processNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      replaceDollarSigns(node);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE || node.matches("img, script, style")) return;
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) textNodes.push(walker.currentNode);
    textNodes.forEach(replaceDollarSigns);
  }

  const styles = document.createElement("style");
  styles.textContent = `
    .lari-currency-logo {
      display: inline-block;
      width: .9em;
      height: .9em;
      margin-inline-end: .08em;
      object-fit: contain;
      vertical-align: 0em;
    }
  `;
  document.head.append(styles);

  processNode(document.body);
  new MutationObserver(records => {
    for (const record of records) {
      if (record.type === "characterData") processNode(record.target);
      for (const node of record.addedNodes || []) processNode(node);
    }
  }).observe(document.body, { childList: true, characterData: true, subtree: true });
})();
