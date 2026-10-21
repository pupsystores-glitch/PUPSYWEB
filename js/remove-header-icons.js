(function () {
  "use strict";

  const headerSelector = "header, [role='banner'], .header__wrapper, .header__mobile";
  const knownSelectors = [
    ".wishlist-hero-header-icon",
    ".wishlisthero-header-icon",
    "#wishlist-hero-product-page-button",
    "#wishlisthero-product-page-button-container",
    ".wishlisthero-floating",
    "[class*='wishlist-hero']",
    "[id*='wishlist-hero']",
  ].join(",");

  function isWishlistControl(element) {
    const label = [
      element.getAttribute("aria-label"),
      element.getAttribute("title"),
      element.getAttribute("data-testid"),
      element.className && typeof element.className === "string" ? element.className : "",
      element.id,
    ].join(" ").toLowerCase();
    return /wishlist|wish-list|favorite|favourite|heart/.test(label);
  }

  function removeControls(root) {
    if (!root || !root.querySelectorAll) return;

    root.querySelectorAll(knownSelectors).forEach((element) => element.remove());

    root.querySelectorAll("a[href='/cart'], a[href='/cart/'], [data-cart-toggle], .navlink--cart").forEach((element) => {
      if (element.closest(headerSelector)) element.remove();
    });

    root.querySelectorAll("a, button, [role='button']").forEach((element) => {
      if (isWishlistControl(element) && (element.closest(headerSelector) || element.closest(".wishlisthero-floating"))) {
        element.remove();
      }
    });
  }

  removeControls(document);

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) removeControls(node);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
