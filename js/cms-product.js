(function () {
  "use strict";

  const baseUrl = new URL(".", document.baseURI);
  const imageElement = document.querySelector("[data-product-main-image]");
  const galleryElement = document.querySelector("[data-product-gallery]");
  const titleElement = document.querySelector("[data-product-title]");
  const priceElement = document.querySelector("[data-product-price]");
  const oldPriceElement = document.querySelector("[data-product-old-price]");
  const descriptionElement = document.querySelector("[data-product-description]");
  const categoryElement = document.querySelector("[data-product-category]");
  const attributesElement = document.querySelector("[data-product-attributes]");
  const statusElement = document.querySelector("[data-product-status]");

  function assetUrl(path) {
    return path ? new URL(path, baseUrl).href : "";
  }

  function formatPrice(value) {
    const amount = Number(value);
    return Number.isFinite(amount)
      ? new Intl.NumberFormat("ka-GE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount) + " ₾"
      : "";
  }

  function renderDescription(markdown) {
    // Render CMS text as plain text so product content cannot inject HTML/scripts.
    descriptionElement.textContent = markdown || "აღწერა დამატებული არ არის.";
    descriptionElement.style.whiteSpace = "pre-line";
  }

  function showImage(path, alt) {
    imageElement.src = assetUrl(path);
    imageElement.alt = alt || "PUPSY პროდუქტი";
    galleryElement.querySelectorAll("button").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.imagePath === path));
    });
  }

  function renderProduct(product) {
    document.title = product.title + " | PUPSY";
    titleElement.textContent = product.title;
    priceElement.textContent = formatPrice(product.price);
    renderDescription(product.description);
    categoryElement.textContent = product.category || "";
    categoryElement.hidden = !product.category;

    if (product.oldPrice !== undefined && product.oldPrice !== "" && Number(product.oldPrice) > Number(product.price)) {
      oldPriceElement.textContent = formatPrice(product.oldPrice);
      oldPriceElement.hidden = false;
    }

    const attributes = Array.isArray(product.attributes) ? product.attributes.filter(Boolean) : [];
    attributesElement.replaceChildren(...attributes.map((value) => {
      const item = document.createElement("li");
      item.textContent = value;
      return item;
    }));

    const images = [...new Set([product.image, ...(product.images || [])].filter(Boolean))];
    showImage(images[0] || "", product.title);
    galleryElement.replaceChildren(...images.map((path, index) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "cms-product-thumb";
      button.dataset.imagePath = path;
      button.setAttribute("aria-label", "სურათი " + (index + 1));
      button.setAttribute("aria-pressed", String(index === 0));
      const thumb = document.createElement("img");
      thumb.src = assetUrl(path);
      thumb.alt = "";
      button.append(thumb);
      button.addEventListener("click", () => showImage(path, product.title));
      return button;
    }));
    statusElement.hidden = true;
    document.querySelector("[data-product-content]").hidden = false;
  }

  async function init() {
    const id = new URLSearchParams(window.location.search).get("id") || new URLSearchParams(window.location.search).get("slug");
    if (!id) {
      statusElement.textContent = "პროდუქტის ბმულში იდენტიფიკატორი არ არის მითითებული.";
      return;
    }

    try {
      const response = await fetch(new URL("products/products.json", baseUrl), { cache: "no-cache" });
      if (!response.ok) throw new Error("კატალოგი ვერ ჩაიტვირთა");
      const data = await response.json();
      const product = (Array.isArray(data.products) ? data.products : []).find((item) => item.slug === id && item.published !== false);
      if (!product) {
        statusElement.textContent = "ეს პროდუქტი ვერ მოიძებნა.";
        return;
      }
      renderProduct(product);
    } catch (error) {
      statusElement.textContent = "პროდუქტის მონაცემები დროებით ვერ ჩაიტვირთა.";
      console.error("PUPSY product:", error);
    }
  }

  init();
})();
