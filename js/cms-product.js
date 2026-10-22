(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const id = params.get("cmsProduct");
  if (!id) return;

  const baseUrl = new URL(".", document.baseURI);
  const catalogFiles = [
    { path: "products/categories/harnesses.json", category: "წელსამაგრები" },
    { path: "products/categories/collars.json", category: "საყელური" },
    { path: "products/categories/leashes.json", category: "საბელი" },
    { path: "products/categories/accessories.json", category: "აქსესუარები" },
    { path: "products/categories/hygiene-care.json", category: "ჰიგიენა & მოვლა" },
    { path: "products/categories/toys.json", category: "სათამაშოები" },
  ];
  const georgianToLatin = {
    ა: "a", ბ: "b", გ: "g", დ: "d", ე: "e", ვ: "v", ზ: "z", თ: "t",
    ი: "i", კ: "k", ლ: "l", მ: "m", ნ: "n", ო: "o", პ: "p", ჟ: "zh",
    რ: "r", ს: "s", ტ: "t", უ: "u", ფ: "p", ქ: "k", ღ: "gh", ყ: "q",
    შ: "sh", ჩ: "ch", ც: "ts", ძ: "dz", წ: "ts", ჭ: "ch", ხ: "kh", ჯ: "j", ჰ: "h",
  };

  function productSlug(product) {
    const savedSlug = String(product.slug || "").trim();
    if (savedSlug) return savedSlug;
    return [...String(product.title || "").toLocaleLowerCase("ka-GE")]
      .map((character) => georgianToLatin[character] || (/[a-z0-9]/.test(character) ? character : "-"))
      .join("")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "product";
  }

  function productImages(product) {
    const images = [];
    (Array.isArray(product.photos) ? product.photos : []).forEach((source) => {
      if (source.source === "gallery" && Array.isArray(source.images)) {
        images.push(...source.images);
      } else if (source.source === "links") {
        images.push(source.link1, source.link2, source.link3, source.link4, source.link5);
      }
    });
    if (!images.length) images.push(product.image, ...(Array.isArray(product.images) ? product.images : []));
    return [...new Set(images.filter((path) => typeof path === "string" && path.trim()).map((path) => path.trim()))];
  }

  function productColors(product) {
    return [...new Set((Array.isArray(product.colors) ? product.colors : [product.color])
      .map((color) => String(color || "").trim()).filter(Boolean))];
  }

  function hideProductHeaderIcons() {
    if (document.querySelector("#cms-product-header-icons-style")) return;
    const style = document.createElement("style");
    style.id = "cms-product-header-icons-style";
    style.textContent = `
      .header__wrapper [data-cart-toggle],
      .header__wrapper .wishlist-hero-header-icon,
      .header__mobile [data-cart-toggle],
      .header__mobile .wishlist-hero-header-icon,
      #wishlist-hero-product-page-button,
      #wishlisthero-product-page-button-container,
      .wishlisthero-floating {
        display: none !important;
      }
    `;
    document.head.append(style);
  }

  function setSelectedColors(product) {
    const colorsBlock = document.querySelector(".product__siblings");
    if (!colorsBlock) return;

    const selectedColors = new Set(productColors(product));
    if (!selectedColors.size) return;
    const swatches = [...colorsBlock.querySelectorAll(".swatches")];
    swatches.forEach((swatch) => {
      const link = swatch.querySelector(".sibling__link");
      const label = swatch.querySelector(".visually-hidden")?.textContent.trim();
      if (!link) return;
      link.classList.remove("sibling__link--current");
      swatch.classList.toggle("cms-selected-color", selectedColors.has(label));
    });

    if (!document.querySelector("#cms-selected-color-style")) {
      const style = document.createElement("style");
      style.id = "cms-selected-color-style";
      style.textContent = ".product__siblings .swatches.cms-selected-color .sibling__link{overflow:initial;box-shadow:0 0 0 2px var(--bg)}.product__siblings .swatches.cms-selected-color .sibling__link:after{opacity:1;transform:translateZ(0);overflow:hidden}";
      document.head.append(style);
    }
  }

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
    const paths = productImages(product);
    if (!gallery || !prototype) return;
    if (!paths.length) {
      gallery.hidden = true;
      return;
    }

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

  const sizeGuideHtml = `
    <div class="metafield-rich_text_field">
      <p>ძალიან პატარა<br>კისრის გარშემოწერილობა: 18–32 სმ | 7–12.5 დუიმი<br>მუცლის გარშემოწერილობა: 32–40 სმ | 12.5–15.5 დუიმი</p>
      <p>პატარა<br>კისრის გარშემოწერილობა: 27–42 სმ | 10.5–16.5 დუიმი<br>მუცლის გარშემოწერილობა: 38–55 სმ | 15–21.5 დუიმი</p>
      <p>საშუალო<br>კისრის გარშემოწერილობა: 34–52 სმ | 13–20 დუიმი<br>მუცლის გარშემოწერილობა: 47–70 სმ | 18.5–27.5 დუიმი</p>
      <p>დიდი<br>კისრის გარშემოწერილობა: 45–62 სმ | 17.5–24 დუიმი<br>მუცლის გარშემოწერილობა: 62–95 სმ | 24–37 დუიმი</p>
      <p>თუ ზომებს შორის ხართ, აირჩიეთ უფრო დიდი ზომა</p>
      <p>• დიდი ზომის ძაღლებისთვის, რომლებიც ქაჩავენ, წელსამაგრს არ გირჩევთ</p>
      <p><a href="guide.html">ზომების ყველა გზამკვლევის ნახვა</a></p>
    </div>`;

  function setSelectedSize(product) {
    const buttons = document.querySelector(".radio__buttons[data-variant-buttons]");
    const sizeBlock = [...document.querySelectorAll(".product__content .product__block--accordion")]
      .find((item) => /ზომები/.test(item.querySelector("summary")?.textContent || ""));
    if (String(product.size || "").trim() === "არ აქვს") {
      const selector = buttons?.closest(".radio__fieldset");
      if (selector) {
        selector.hidden = true;
        selector.querySelectorAll('input[type="radio"]').forEach((input) => { input.disabled = true; });
      }
      if (sizeBlock) sizeBlock.hidden = true;
      return;
    }
    if (!buttons) return;

    const sizes = ["ძალიან პატარა", "პატარა", "საშუალო", "დიდი"];
    const storedSize = String(product.size || "").trim();
    const selectedSize = sizes.includes(storedSize)
      ? storedSize
      : (Array.isArray(product.attributes)
        ? sizes.find((size) => product.attributes.map(String).includes(size))
        : null);
    if (!selectedSize) return;

    const options = [...buttons.querySelectorAll(":scope > .radio__button")];
    const optionFor = (size) => options.find((option) =>
      option.querySelector(".option-title")?.textContent.trim() === size);
    const selected = optionFor(selectedSize);
    if (!selected) return;

    let sizeStyle = document.querySelector("#cms-selected-size-style");
    if (!sizeStyle) {
      sizeStyle = document.createElement("style");
      sizeStyle.id = "cms-selected-size-style";
      sizeStyle.textContent = ".product__block .radio__button.cms-selected-size > label,.product__block .radio__button.cms-selected-size > label .option-title{background-color:#302d29!important;border:2px solid #302d29!important;color:#fff!important;-webkit-text-fill-color:#fff!important;font-weight:700!important;opacity:1!important;box-sizing:border-box}";
      document.head.append(sizeStyle);
    }
    options.forEach((option) => option.classList.remove("cms-selected-size"));
    selected.classList.add("cms-selected-size");
    buttons.prepend(selected);
    options.forEach((option) => {
      const input = option.querySelector('input[type="radio"]');
      if (input) input.checked = option === selected;
    });
  }

  function render(product) {
    hideProductHeaderIcons();
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

    setSelectedColors(product);
    setGallery(product);
    setAccordion(/აღწერა/, String(product.description || "აღწერა დამატებული არ არის.").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean));
    const sizeBlock = [...document.querySelectorAll(".product__content .product__block--accordion")]
      .find((item) => /ზომები/.test(item.querySelector("summary")?.textContent || ""));
    const sizeContent = sizeBlock?.querySelector("[data-collapsible-content]");
    if (sizeContent) sizeContent.innerHTML = sizeGuideHtml;
    setSelectedSize(product);

    const backLink = document.querySelector("a[href*='shop.html']");
    if (backLink) backLink.href = new URL("shop.html", baseUrl).href;
  }

  async function init() {
    try {
      const catalogs = await Promise.all(catalogFiles.map(async (catalog) => {
        const response = await fetch(new URL(catalog.path, baseUrl));
        if (!response.ok) throw new Error("პროდუქტების სია ვერ ჩაიტვირთა: " + catalog.category);
        const data = await response.json();
        return (Array.isArray(data.products) ? data.products : []).map((product) => ({
          ...product,
          category: catalog.category,
        }));
      }));
      const product = catalogs.flat()
        .find((item) => productSlug(item) === id && item.published !== false);
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
