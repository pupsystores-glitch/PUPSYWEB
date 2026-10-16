(function () {
  "use strict";

  const catalogUrl = "products/products.json";
  const baseUrl = new URL(".", document.baseURI);
  const productUrl = new URL("product.html", baseUrl).href;

  function formatPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return "";
    return new Intl.NumberFormat("ka-GE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount) + " ₾";
  }

  function safeImagePath(path, width) {
    if (!path) return "";
    try {
      const url = new URL(path, baseUrl);
      if (location.hostname !== "pupsystores-glitch.github.io" && url.pathname.startsWith("/PUPSYWEB/")) {
        url.pathname = url.pathname.slice("/PUPSYWEB".length);
      }
      if (/\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(url.hostname + url.pathname)) {
        url.searchParams.set("width", String(width || 640));
      }
      return url.href;
    } catch (_) {
      return "";
    }
  }

  function renderCard(product) {
    const card = document.createElement("a");
    card.className = "cms-product-card";
    card.href = productUrl + "?id=" + encodeURIComponent(product.slug);

    const image = document.createElement("img");
    image.className = "cms-product-card__image";
    const imagePath = product.image || (product.images || [])[0];
    image.src = safeImagePath(imagePath, 640);
    if (imagePath && /\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(imagePath)) {
      image.srcset = [320, 480, 640, 800]
        .map((width) => safeImagePath(imagePath, width) + " " + width + "w")
        .join(", ");
      image.sizes = "(max-width: 600px) 50vw, 25vw";
    }
    image.alt = product.title || "PUPSY პროდუქტი";
    image.loading = "lazy";
    card.append(image);

    const details = document.createElement("span");
    details.className = "cms-product-card__details";
    const title = document.createElement("span");
    title.className = "cms-product-card__title";
    title.textContent = product.title || "პროდუქტი";
    const price = document.createElement("span");
    price.className = "cms-product-card__price";
    price.textContent = formatPrice(product.price);
    details.append(title, price);
    card.append(details);
    return card;
  }

  async function loadCatalog() {
    const targets = document.querySelectorAll("[data-cms-products]");
    if (!targets.length) return;

    try {
      const response = await fetch(new URL(catalogUrl, baseUrl), { cache: "no-cache" });
      if (!response.ok) throw new Error("კატალოგის ჩატვირთვა ვერ მოხერხდა");
      const data = await response.json();
      const products = (Array.isArray(data.products) ? data.products : []).filter(
        (product) => product.published !== false && product.slug && product.title
      );

      targets.forEach((target) => {
        const category = target.dataset.category;
        const normalize = (value) => String(value || "").trim().toLocaleLowerCase("ka-GE").normalize("NFC");
        const visibleProducts = category
          ? products.filter((product) => normalize(product.category) === normalize(category))
          : products;
        target.replaceChildren(...visibleProducts.map(renderCard));
        const section = target.closest(".cms-products");
        if (section) section.hidden = visibleProducts.length === 0;
        const empty = target.parentElement.querySelector("[data-cms-products-empty]");
        if (empty) empty.hidden = true;
      });
    } catch (error) {
      targets.forEach((target) => {
        const section = target.closest(".cms-products");
        if (section) section.hidden = true;
      });
      console.error("PUPSY product catalog:", error);
    }
  }

  loadCatalog();
})();
