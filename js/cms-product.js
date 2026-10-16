(function () {
  "use strict";

  const baseUrl = new URL(".", document.baseURI);
  const status = document.querySelector("[data-product-status]");
  const frame = document.querySelector("[data-product-frame]");

  function assetUrl(path) {
    if (!path) return "";
    const value = String(path).trim();
    if (location.hostname !== "pupsystores-glitch.github.io" && value.startsWith("/PUPSYWEB/")) {
      return new URL(value.slice("/PUPSYWEB/".length), baseUrl).href;
    }
    return new URL(value, baseUrl).href;
  }

  function formatPrice(value) {
    const amount = Number(value);
    return Number.isFinite(amount)
      ? new Intl.NumberFormat("ka-GE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
      : "";
  }

  function setDescription(doc, product) {
    const accordions = [...doc.querySelectorAll(".product__content .product__block--accordion")];
    const descriptionBlock = accordions.find((block) => block.querySelector(".product-accordion details"));
    if (!descriptionBlock) return;

    const details = descriptionBlock.querySelector("details");
    const summary = details.querySelector("summary");
    if (summary) summary.firstChild.textContent = "აღწერა";
    const content = details.querySelector("[data-collapsible-content]");
    if (content) {
      content.replaceChildren();
      String(product.description || "აღწერა დამატებული არ არის.").split(/\n{2,}/).forEach((paragraph) => {
        const p = doc.createElement("p");
        p.textContent = paragraph.trim();
        content.append(p);
      });
    }

    accordions.forEach((block) => {
      if (block !== descriptionBlock) block.remove();
    });

    const attributes = Array.isArray(product.attributes) ? product.attributes.map(String).filter(Boolean) : [];
    if (!attributes.length) return;
    const attributeBlock = descriptionBlock.cloneNode(true);
    const attributeDetails = attributeBlock.querySelector("details");
    const attributeSummary = attributeDetails.querySelector("summary");
    if (attributeSummary) attributeSummary.firstChild.textContent = "მახასიათებლები";
    const attributeContent = attributeDetails.querySelector("[data-collapsible-content]");
    if (attributeContent) {
      attributeContent.replaceChildren();
      attributes.forEach((value) => {
        const p = doc.createElement("p");
        p.textContent = value;
        attributeContent.append(p);
      });
    }
    attributeDetails.removeAttribute("open");
    descriptionBlock.after(attributeBlock);
  }

  function setImages(doc, product) {
    const slidesContainer = doc.querySelector(".product__slides[data-product-media-list]");
    const originalSlide = slidesContainer && slidesContainer.querySelector(".product__slide");
    if (!slidesContainer || !originalSlide) return;

    const paths = [...new Set([product.image, ...(Array.isArray(product.images) ? product.images : [])].filter(Boolean))];
    if (!paths.length) return;
    slidesContainer.replaceChildren();
    paths.forEach((path, index) => {
      const slide = originalSlide.cloneNode(true);
      slide.className = "product__slide" + (index === 0 ? " media--active" : " media--hidden");
      slide.dataset.imageId = "cms-" + index;
      slide.dataset.mediaId = "cms-" + index;
      slide.removeAttribute("id");
      slide.querySelectorAll("[id]").forEach((element) => element.removeAttribute("id"));
      slide.querySelectorAll("#wishlist-hero-product-page-button, .wishlisthero-product-page-button-container").forEach((element) => element.remove());

      const photo = slide.querySelector(".product__photo");
      const image = slide.querySelector(".product__photo img");
      if (photo) {
        photo.dataset.zoomImage = assetUrl(path);
        photo.dataset.imageSrc = assetUrl(path);
      }
      if (image) {
        image.src = assetUrl(path);
        image.srcset = "";
        image.alt = product.title || "PUPSY პროდუქტი";
        image.loading = index === 0 ? "eager" : "lazy";
      }
      slidesContainer.append(slide);
    });
    slidesContainer.closest("product-images")?.setAttribute("data-active-media", "cms-0");
  }

  function updateTemplate(product) {
    const doc = frame.contentDocument;
    if (!doc) throw new Error("პროდუქტის შაბლონი ვერ ჩაიტვირთა");
    doc.title = product.title + " | PUPSY";

    const title = doc.querySelector(".product__title [data-zoom-caption]") || doc.querySelector(".product__title");
    if (title) title.textContent = product.title;

    const price = doc.querySelector("[data-product-price]");
    if (price) {
      const currencyIcon = price.querySelector("img");
      price.replaceChildren();
      if (currencyIcon) {
        currencyIcon.src = new URL("images/Lari_logo.png", baseUrl).href;
        price.append(currencyIcon);
      }
      price.append(doc.createTextNode(formatPrice(product.price)));
    }

    const oldPrice = Number(product.oldPrice);
    const sale = doc.querySelector(".product__sale");
    if (sale) sale.hidden = !(Number.isFinite(oldPrice) && oldPrice > Number(product.price));

    const form = doc.querySelector(".product__form__holder");
    if (form) form.remove();
    setImages(doc, product);
    setDescription(doc, product);

    const backLink = doc.querySelector("a[href*='shop.html']");
    if (backLink) backLink.href = new URL("shop.html", baseUrl).href;
    status.hidden = true;
    frame.hidden = false;
    resizeFrame();
  }

  function resizeFrame() {
    try {
      const doc = frame.contentDocument;
      if (!doc) return;
      frame.style.height = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight) + "px";
    } catch (_) {
      // The frame is resized after the same-origin template loads.
    }
  }

  async function init() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || params.get("slug");
    if (!id) {
      status.textContent = "პროდუქტის ბმულში იდენტიფიკატორი არ არის მითითებული.";
      return;
    }

    try {
      const response = await fetch(new URL("products/products.json", baseUrl), { cache: "no-cache" });
      if (!response.ok) throw new Error("კატალოგი ვერ ჩაიტვირთა");
      const data = await response.json();
      const product = (Array.isArray(data.products) ? data.products : []).find((item) => item.slug === id && item.published !== false);
      if (!product) {
        status.textContent = "ეს პროდუქტი ვერ მოიძებნა.";
        return;
      }

      document.title = product.title + " | PUPSY";
      frame.addEventListener("load", () => {
        try {
          updateTemplate(product);
          const innerWindow = frame.contentWindow;
          if (innerWindow) {
            innerWindow.addEventListener("resize", resizeFrame);
            const observer = new MutationObserver(resizeFrame);
            observer.observe(frame.contentDocument.body, { childList: true, subtree: true, attributes: true });
          }
          frame.contentDocument.querySelectorAll("img").forEach((image) => image.addEventListener("load", resizeFrame));
        } catch (error) {
          status.textContent = "პროდუქტის გვერდი ვერ ჩაიტვირთა.";
          console.error("PUPSY product template:", error);
        }
      }, { once: true });
      frame.src = new URL("harnes1.html", baseUrl).href;
    } catch (error) {
      status.textContent = "პროდუქტის მონაცემები დროებით ვერ ჩაიტვირთა.";
      console.error("PUPSY product:", error);
    }
  }

  init();
})();
