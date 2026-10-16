(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const id = params.get("cmsProduct");
  if (!id) return;

  const baseUrl = new URL(".", document.baseURI);

  function assetUrl(path) {
    const value = String(path || "").trim();
    if (location.hostname !== "pupsystores-glitch.github.io" && value.startsWith("/PUPSYWEB/")) {
      return new URL(value.slice("/PUPSYWEB/".length), baseUrl).href;
    }
    return new URL(value, baseUrl).href;
  }

  function imageUrl(path, width) {
    const url = new URL(assetUrl(path));
    if (/\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(url.hostname + url.pathname)) {
      url.searchParams.set("width", String(width));
    }
    return url.href;
  }

  function originalImageUrl(path) {
    const url = new URL(assetUrl(path));
    if (/\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(url.hostname + url.pathname)) {
      ["width", "height", "crop"].forEach((parameter) => url.searchParams.delete(parameter));
    }
    return url.href;
  }

  function setGallery(product) {
    const gallery = document.querySelector(".product__slides[data-product-media-list]");
    const prototype = gallery && gallery.querySelector(".product__slide");
    const paths = [...new Set([product.image, ...(Array.isArray(product.images) ? product.images : [])]
      .filter((path) => typeof path === "string" && path.trim()))];
    if (!gallery || !prototype || !paths.length) return;

    const slides = paths.map((path, index) => {
      const slide = prototype.cloneNode(true);
      slide.className = "product__slide" + (index === 0 ? " media--active" : " media--hidden");
      slide.dataset.imageId = "cms-" + index;
      slide.dataset.mediaId = "cms-" + index;
      slide.removeAttribute("id");
      slide.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      slide.querySelectorAll("#wishlist-hero-product-page-button, .wishlisthero-product-page-button-container")
        .forEach((element) => element.remove());

      const photo = slide.querySelector(".product__photo");
      const image = slide.querySelector(".product__photo img");
      const src = imageUrl(path.trim(), 1600);
      const originalSrc = originalImageUrl(path.trim());
      const source = new URL(assetUrl(path.trim()));
      const canResize = /\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(source.hostname + source.pathname);
      if (photo) {
        photo.dataset.zoomImage = originalSrc;
        photo.dataset.imageSrc = originalSrc;
        photo.dataset.imageWidth = "1600";
        photo.dataset.imageHeight = "1600";
      }
      if (image) {
        image.src = src;
        image.srcset = canResize
          ? [480, 800, 1200, 1600].map((width) => `${imageUrl(path.trim(), width)} ${width}w`).join(", ")
          : "";
        image.alt = product.title || "PUPSY პროდუქტი";
        image.loading = index === 0 ? "eager" : "lazy";
        image.fetchPriority = index === 0 ? "high" : "auto";
        ["data-src", "data-srcset", "data-original", "data-lazy-src"].forEach((name) => image.removeAttribute(name));
        image.addEventListener("load", () => {
          if (!photo) return;
          photo.dataset.imageWidth = String(image.naturalWidth || 1600);
          photo.dataset.imageHeight = String(image.naturalHeight || 1600);
        }, { once: true });
      }
      return slide;
    });

    gallery.replaceChildren(...slides);
    gallery.closest("product-images")?.setAttribute("data-active-media", "cms-0");

    const thumbTemplate = document.querySelector("template[data-pswp-thumbs-template]");
    const thumbPrototype = thumbTemplate?.content.querySelector(".pswp__thumb");
    if (thumbTemplate && thumbPrototype) {
      const thumbs = paths.map((path, index) => {
        const figure = thumbPrototype.cloneNode(true);
        figure.classList.remove("is-current");
        figure.setAttribute("aria-current", "false");
        const image = figure.querySelector("img");
        if (image) {
          image.src = imageUrl(path.trim(), 160);
          image.srcset = /\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(path)
            ? [80, 120, 160].map((width) => `${imageUrl(path.trim(), width)} ${width}w`).join(", ")
            : "";
          image.sizes = "80px";
          image.alt = product.title || "PUPSY პროდუქტი";
          image.width = 160;
          image.height = 160;
          image.loading = "lazy";
        }
        figure.dataset.cmsImageIndex = String(index);
        return figure;
      });
      thumbTemplate.content.replaceChildren(...thumbs);
    }

    // zoom.js caches the original image list at startup; refresh it for CMS gallery slides.
    const zoom = gallery;
    if (typeof zoom.createZoom === "function") {
      zoom.images = zoom.querySelectorAll("[data-zoom-image]");
      zoom.zoomCaptions = zoom.closest("[data-section-type]")?.querySelector("[data-zoom-caption]");
      const openOriginal = (photo, index) => {
        if (photo.dataset.cmsZoomLoading === "true") return;
        photo.dataset.cmsZoomLoading = "true";
        const fullImage = new Image();
        fullImage.onload = () => {
          photo.dataset.imageWidth = String(fullImage.naturalWidth || 1600);
          photo.dataset.imageHeight = String(fullImage.naturalHeight || 1600);
          photo.dataset.cmsZoomLoading = "false";
          zoom.createZoom(index);
          if (window.a11y) window.a11y.lastElement = photo;
        };
        fullImage.onerror = () => {
          photo.dataset.cmsZoomLoading = "false";
          zoom.createZoom(index);
          if (window.a11y) window.a11y.lastElement = photo;
        };
        fullImage.src = photo.dataset.zoomImage;
      };
      zoom.images.forEach((photo, index) => {
        photo.addEventListener("click", (event) => {
          event.preventDefault();
          if (!photo.closest("product-images")?.classList.contains("is-dragging")) {
            openOriginal(photo, index);
          }
        });
        photo.addEventListener("keyup", (event) => {
          if (event.code === "Enter") {
            event.preventDefault();
            openOriginal(photo, index);
          }
        });
      });
    }
  }

  function setAccordion(selector, values) {
    const block = [...document.querySelectorAll(".product__content .product__block--accordion")]
      .find((item) => selector.test(item.querySelector("summary")?.textContent || ""));
    const content = block?.querySelector("[data-collapsible-content]");
    if (!content || !values.length) return;
    content.replaceChildren(...values.map((value) => {
      const p = document.createElement("p");
      p.textContent = value;
      return p;
    }));
  }

  function render(product) {
    document.title = product.title + " | PUPSY";
    const title = document.querySelector(".product__title [data-zoom-caption]") || document.querySelector(".product__title");
    if (title) title.textContent = product.title || "PUPSY პროდუქტი";

    const price = document.querySelector("[data-product-price]");
    if (price) {
      const icon = price.querySelector("img");
      price.replaceChildren();
      if (icon) {
        icon.src = assetUrl("images/Lari_logo.png");
        price.append(icon);
      }
      const amount = Number(product.price);
      if (Number.isFinite(amount)) {
        price.append(document.createTextNode(new Intl.NumberFormat("ka-GE", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(amount)));
      }
    }

    setGallery(product);
    setAccordion(/აღწერა/, String(product.description || "აღწერა დამატებული არ არის.").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean));
    setAccordion(/ზომები/, Array.isArray(product.attributes) ? product.attributes.map(String).filter(Boolean) : []);

    const backLink = document.querySelector("a[href*='shop.html']");
    if (backLink) backLink.href = new URL("shop.html", baseUrl).href;
  }

  async function init() {
    try {
      const response = await fetch(new URL("products/products.json", baseUrl));
      if (!response.ok) throw new Error("პროდუქტების სია ვერ ჩაიტვირთა");
      const data = await response.json();
      const product = (Array.isArray(data.products) ? data.products : [])
        .find((item) => item.slug === id && item.published !== false);
      if (!product) throw new Error("პროდუქტი ვერ მოიძებნა");
      render(product);
    } catch (error) {
      console.error("PUPSY CMS product:", error);
      const message = document.createElement("p");
      message.className = "product__block";
      message.textContent = "პროდუქტის მონაცემები დროებით ვერ ჩაიტვირთა.";
      document.querySelector(".product__content")?.prepend(message);
    }
  }

  init();
})();
