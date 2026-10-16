(function () {
  "use strict";

  const baseUrl = new URL(".", document.baseURI);
  const status = document.querySelector("[data-product-status]");
  const frame = document.querySelector("[data-product-frame]");

  function localAssetUrl(path) {
    if (location.hostname !== "pupsystores-glitch.github.io" && path.startsWith("/PUPSYWEB/")) {
      return new URL(path.slice("/PUPSYWEB/".length), baseUrl).href;
    }
    return new URL(path, baseUrl).href;
  }

  function imageUrl(path, width) {
    const url = new URL(localAssetUrl(path));
    if (/\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(url.hostname + url.pathname)) {
      url.searchParams.set("width", String(width));
    }
    return url.href;
  }

  function setGallery(doc, product) {
    const gallery = doc.querySelector(".product__slides[data-product-media-list]");
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
      const src = imageUrl(path.trim(), 1200);
      const sourceUrl = new URL(localAssetUrl(path.trim()));
      const canResize = /\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(sourceUrl.hostname + sourceUrl.pathname);
      if (photo) {
        photo.dataset.zoomImage = src;
        photo.dataset.imageSrc = src;
      }
      if (image) {
        image.src = src;
        image.srcset = canResize
          ? [480, 800, 1200].map((width) => `${imageUrl(path.trim(), width)} ${width}w`).join(", ")
          : "";
        image.alt = product.title || "PUPSY პროდუქტი";
        image.loading = index === 0 ? "eager" : "lazy";
        image.fetchPriority = index === 0 ? "high" : "auto";
        ["data-src", "data-srcset", "data-original", "data-lazy-src"].forEach((attribute) => image.removeAttribute(attribute));
      }
      return slide;
    });

    gallery.replaceChildren(...slides);
    gallery.closest("product-images")?.setAttribute("data-active-media", "cms-0");
  }

  function setTextContent(doc, element, value) {
    if (!element) return;
    element.replaceChildren(doc.createTextNode(String(value || "")));
  }

  function updateTemplate(source, product) {
    const parsed = new DOMParser().parseFromString(source, "text/html");
    const doc = parsed;

    doc.querySelectorAll("script").forEach((script) => {
      if (script.textContent.includes("location.hostname === \"pupsystores-glitch.github.io\"")) script.remove();
    });
    const base = doc.createElement("base");
    base.href = baseUrl.href;
    doc.head.prepend(base);

    doc.title = product.title + " | PUPSY";
    const title = doc.querySelector(".product__title [data-zoom-caption]") || doc.querySelector(".product__title");
    setTextContent(doc, title, product.title);

    const price = doc.querySelector("[data-product-price]");
    if (price) {
      const icon = price.querySelector("img");
      price.replaceChildren();
      if (icon) {
        icon.src = localAssetUrl("images/Lari_logo.png");
        price.append(icon);
      }
      const amount = Number(product.price);
      price.append(doc.createTextNode(Number.isFinite(amount)
        ? new Intl.NumberFormat("ka-GE", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount)
        : ""));
    }

    const oldPrice = doc.querySelector(".product__sale");
    if (oldPrice) oldPrice.remove();
    setGallery(doc, product);

    const accordions = [...doc.querySelectorAll(".product__content .product__block--accordion")];
    const description = accordions.find((block) => /აღწერა/.test(block.querySelector("summary")?.textContent || ""));
    if (description) {
      const content = description.querySelector("[data-collapsible-content]");
      if (content) {
        content.replaceChildren();
        String(product.description || "აღწერა დამატებული არ არის.").split(/\n{2,}/).forEach((paragraph) => {
          const p = doc.createElement("p");
          p.textContent = paragraph.trim();
          content.append(p);
        });
      }
    }

    const sizes = accordions.find((block) => /ზომები/.test(block.querySelector("summary")?.textContent || ""));
    const attributes = Array.isArray(product.attributes) ? product.attributes.map(String).filter(Boolean) : [];
    if (sizes && attributes.length) {
      const content = sizes.querySelector("[data-collapsible-content]");
      if (content) {
        content.replaceChildren();
        attributes.forEach((attribute) => {
          const p = doc.createElement("p");
          p.textContent = attribute;
          content.append(p);
        });
      }
    }

    const resizeScript = doc.createElement("script");
    resizeScript.textContent = "(function(){var send=function(){var height=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);parent.postMessage({type:'pupsy-product-frame-height',height:height},'*')};document.addEventListener('DOMContentLoaded',send);window.addEventListener('load',send);window.addEventListener('resize',send);if('ResizeObserver'in window)new ResizeObserver(send).observe(document.documentElement)})();";
    doc.body.append(resizeScript);

    return "<!doctype html>\n" + doc.documentElement.outerHTML;
  }

  function resizeFrame() {
    try {
      const doc = frame.contentDocument;
      if (doc) frame.style.height = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight) + "px";
    } catch (_) { /* srcdoc is expected to share this page's origin */ }
  }

  window.addEventListener("message", function (event) {
    if (event.source !== frame.contentWindow || event.data?.type !== "pupsy-product-frame-height") return;
    const height = Number(event.data.height);
    if (Number.isFinite(height) && height > 0) frame.style.height = height + "px";
  });

  async function init() {
    const params = new URLSearchParams(location.search);
    const id = params.get("id") || params.get("slug");
    if (!id) {
      status.textContent = "პროდუქტის ბმულში იდენტიფიკატორი არ არის მითითებული.";
      return;
    }

    try {
      const [catalogResponse, templateResponse] = await Promise.all([
        fetch(new URL("products/products.json", baseUrl), { cache: "no-cache" }),
        fetch(new URL("harnes1.html", baseUrl)),
      ]);
      if (!catalogResponse.ok || !templateResponse.ok) throw new Error("პროდუქტის მონაცემები ან შაბლონი ვერ ჩაიტვირთა");
      const data = await catalogResponse.json();
      const product = (Array.isArray(data.products) ? data.products : [])
        .find((item) => item.slug === id && item.published !== false);
      if (!product) {
        status.textContent = "ეს პროდუქტი ვერ მოიძებნა.";
        return;
      }

      const source = await templateResponse.text();
      document.title = product.title + " | PUPSY";
      frame.addEventListener("load", function () {
        resizeFrame();
        const inner = frame.contentWindow;
        if (inner) inner.addEventListener("resize", resizeFrame);
        frame.contentDocument.querySelectorAll("img").forEach((image) => image.addEventListener("load", resizeFrame));
        const observer = new MutationObserver(resizeFrame);
        observer.observe(frame.contentDocument.body, { childList: true, subtree: true, attributes: true });
      }, { once: true });
      frame.srcdoc = updateTemplate(source, product);
      status.hidden = true;
      frame.hidden = false;
    } catch (error) {
      status.textContent = "პროდუქტის გვერდი დროებით ვერ ჩაიტვირთა.";
      console.error("PUPSY product:", error);
    }
  }

  init();
})();
