(function () {
  "use strict";

  const params = new URLSearchParams(location.search);
  const routeName = decodeURIComponent(location.pathname.split("/").pop() || "").replace(/\.html$/i, "");
  const id = params.get("cmsProduct") || (!/^(harnes1|index)$/i.test(routeName) ? routeName : "");
  if (!id) return;

  const baseUrl = new URL(".", document.baseURI);
  const catalogFiles = [
    { id: "harnesses", path: "products/categories/harnesses.json", category: "წელსამაგრები" },
    { id: "collars", path: "products/categories/collars.json", category: "საყელური" },
    { id: "leashes", path: "products/categories/leashes.json", category: "საბელი" },
    { id: "accessories", path: "products/categories/accessories.json", category: "აქსესუარები" },
    { id: "hygiene-care", path: "products/categories/hygiene-care.json", category: "ჰიგიენა & მოვლა" },
    { id: "toys", path: "products/categories/toys.json", category: "სათამაშოები" },
  ];
  const categoryDetailTitles = {
    harnesses: { size: "ზომები", benefits: "მთავარი უპირატესობები", material: "მასალა და მოვლა" },
    collars: { size: "საყელურის ზომები", benefits: "მთავარი უპირატესობები", material: "მასალა და მოვლა" },
    leashes: { size: "საბელის ზომები და სიგრძე", benefits: "მთავარი უპირატესობები", material: "მასალა და მოვლა" },
    accessories: { size: "ზომა და მახასიათებლები", benefits: "მთავარი უპირატესობები", material: "მასალა და მოვლა" },
    "hygiene-care": { size: "მოცულობა და გამოყენება", benefits: "მახასიათებლები", material: "შემადგენლობა და გამოყენება" },
    toys: { size: "ზომა და მახასიათებლები", benefits: "თამაშის უპირატესობები", material: "მასალა და მოვლა" },
  };
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
        photo.style.setProperty("--aspect-ratio", "1");
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

  function setProductVideo(product) {
    document.querySelector(".cms-product-video")?.remove();
    const value = String(product.videoUrl || "").trim();
    const gallery = document.querySelector(".product__slides[data-product-media-list]");
    const productImagesElement = gallery?.closest("product-images");
    if (!value || !productImagesElement) return;

    let url;
    try {
      url = new URL(value, baseUrl);
      if (url.protocol !== "https:" && url.protocol !== "http:") return;
      url.protocol = "https:";
    } catch (_) {
      return;
    }

    const host = url.hostname.replace(/^www\./, "").toLowerCase();
    let embedUrl = "";
    if (["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host) || host === "youtu.be") {
      const videoId = host === "youtu.be"
        ? url.pathname.split("/").filter(Boolean)[0]
        : (url.searchParams.get("v") || url.pathname.match(/\/(?:embed|shorts|live)\/([^/?]+)/)?.[1]);
      if (videoId) embedUrl = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;
    } else if (host === "vimeo.com" || host === "player.vimeo.com") {
      const videoId = url.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
      if (videoId) embedUrl = `https://player.vimeo.com/video/${videoId}`;
    }

    const wrapper = document.createElement("div");
    wrapper.className = "cms-product-video";
    wrapper.style.cssText = "position:relative;width:100%;margin-top:16px;overflow:hidden;border-radius:var(--radius, 12px);background:#111;aspect-ratio:16/9";
    if (/\.(mp4|webm|ogg)(?:$|[?#])/i.test(url.href)) {
      const video = document.createElement("video");
      video.src = url.href;
      video.controls = true;
      video.playsInline = true;
      video.preload = "metadata";
      video.style.cssText = "display:block;width:100%;height:100%;object-fit:contain";
      wrapper.append(video);
    } else {
      const frame = document.createElement("iframe");
      frame.src = embedUrl || url.href;
      frame.title = `${product.title || "Product"} video`;
      frame.loading = "lazy";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      frame.setAttribute("sandbox", "allow-scripts allow-same-origin allow-presentation");
      frame.style.cssText = "position:absolute;inset:0;width:100%;height:100%;border:0";
      wrapper.append(frame);
    }
    gallery.insertAdjacentElement("afterend", wrapper);
  }

  function findAccordion(selector) {
    return [...document.querySelectorAll(".product__content .product__block--accordion")]
      .find((item) => selector.test(item.querySelector("summary")?.textContent || ""));
  }

  function productAccordions() {
    return [...document.querySelectorAll(".product__content .product__block--accordion")]
      .filter((item) => item.querySelector("[data-collapsible-content]"));
  }

  function hideSizeIndicators(sizeBlock) {
    hideVariantSizeSelector();
    const sizeBlocks = new Set([
      sizeBlock,
      ...productAccordions().filter((block) => /ზომ|size|მოცულობა/i.test(block.querySelector("summary")?.textContent || "")),
    ]);
    sizeBlocks.forEach((block) => {
      if (!block) return;
      block.hidden = true;
      block.style.setProperty("display", "none", "important");
    });
  }

  function hideVariantSizeSelector() {
    const buttons = document.querySelector(".radio__buttons[data-variant-buttons]");
    const fieldset = buttons?.closest(".radio__fieldset");
    const selector = fieldset?.closest(".product__block--lines") || fieldset;
    if (selector) {
      selector.hidden = true;
      selector.style.setProperty("display", "none", "important");
    }
    buttons?.querySelectorAll('input[type="radio"]').forEach((input) => { input.disabled = true; });
  }

  function accordionContent(block) {
    const content = block?.querySelector("[data-collapsible-content]");
    return content?.querySelector("toggle-ellipsis [data-content]") || content;
  }

  function setAccordion(selector, values) {
    const block = findAccordion(selector);
    const content = accordionContent(block);
    if (!content || !values.length) return;
    content.replaceChildren(...values.map((value) => {
      const p = document.createElement("p");
      p.textContent = value;
      return p;
    }));
  }

  function setAccordionText(block, text, asBullets = false) {
    if (!block) return;
    const content = accordionContent(block);
    const lines = String(text || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    if (!content || !lines.length) {
      block.hidden = true;
      return;
    }
    block.hidden = false;
    block.style.removeProperty("display");
    content.replaceChildren();
    if (asBullets) {
      const intro = lines[0].endsWith(":") ? lines.shift() : "";
      if (intro) {
        const paragraph = document.createElement("p");
        paragraph.textContent = intro;
        content.append(paragraph);
      }
      const list = document.createElement("ul");
      lines.forEach((line) => {
        const item = document.createElement("li");
        item.textContent = line.replace(/^[•*-]\s*/, "");
        list.append(item);
      });
      if (list.childElementCount) content.append(list);
      return;
    }
    String(text).split(/\r?\n\s*\r?\n/).map((paragraph) => paragraph.trim()).filter(Boolean).forEach((value) => {
      const paragraph = document.createElement("p");
      const guideLinkText = "ზომების ყველა გზამკვლევი: guide.html";
      if (value.includes(guideLinkText)) {
        const [before, after] = value.split(guideLinkText);
        paragraph.append(document.createTextNode(before));
        const link = document.createElement("a");
        link.href = new URL("guide.html", baseUrl).href;
        link.textContent = "ზომების ყველა გზამკვლევის ნახვა";
        paragraph.append(link, document.createTextNode(after));
      } else {
        paragraph.textContent = value;
      }
      paragraph.style.whiteSpace = "pre-line";
      content.append(paragraph);
    });
  }

  function setAccordionTitle(block, title) {
    const summary = block?.querySelector("summary");
    const textNode = summary && [...summary.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode && title) textNode.textContent = title;
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

  function setSelectedSize(product, categoryId, sizeBlock) {
    const buttons = document.querySelector(".radio__buttons[data-variant-buttons]");
    const currentSize = String(product.size || "").trim();
    const hasNoSize = /არ\s*აქვს/i.test(currentSize);
    const hasSizeDetails = Boolean(String(product.sizeDetails || "").trim());
    if (categoryId !== "harnesses") {
      hideVariantSizeSelector();
      if (sizeBlock && !hasSizeDetails && (hasNoSize || !currentSize)) sizeBlock.hidden = true;
      return;
    }
    if (hasNoSize) {
      hideSizeIndicators(sizeBlock);
      return;
    }
    if (currentSize === "არ აქვს" || !currentSize) {
      hideVariantSizeSelector();
      if (sizeBlock) sizeBlock.hidden = !hasSizeDetails;
      return;
    }
    if (sizeBlock) sizeBlock.hidden = false;
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

    const titleWrapper = document.querySelector(".product__title__wrapper");
    titleWrapper?.querySelector("[data-cms-coming-soon]")?.remove();
    if (product.comingSoon === true && titleWrapper) {
      const badge = document.createElement("span");
      badge.dataset.cmsComingSoon = "";
      badge.className = "cms-product-coming-soon";
      badge.textContent = "მალე დაგვემატება";
      badge.setAttribute("role", "status");
      badge.style.cssText = "display:inline-flex;align-items:center;width:max-content;margin:8px 0 12px;padding:8px 14px;border-radius:999px;background:#8a4d2e;color:#fff;font-size:13px;font-weight:700;line-height:1.2;";
      titleWrapper.append(badge);
      window.PupsyComingSoonVotes?.mount(productSlug(product), product.title || "პროდუქტი", titleWrapper);
    }

    const price = document.querySelector("[data-product-price]");
    if (price) {
      const icon = price.querySelector("img") || document.createElement("img");
      price.replaceChildren();
      icon.className = "cms-product-page__currency";
      icon.src = assetUrl("images/Lari_logo.png");
      icon.alt = "";
      icon.setAttribute("aria-hidden", "true");
      icon.style.cssText = "display:block;width:1em;height:1em;flex:0 0 auto;object-fit:contain;";
      price.classList.add("cms-product-page__price");
      price.style.display = "inline-flex";
      price.style.alignItems = "center";
      price.style.gap = ".35em";
      price.append(icon);
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
    setProductVideo(product);
    const accordions = productAccordions();
    setAccordion(/აღწერა/, String(product.description || "აღწერა დამატებული არ არის.").split(/\n{2,}/).map((s) => s.trim()).filter(Boolean));
    const collection = catalogFiles.find((catalog) =>
      catalog.id === product.categoryId || catalog.category === product.category
    );
    const categoryId = collection?.id || collection?.path.match(/categories\/([^/.]+)/)?.[1] || "harnesses";
    const titles = { ...categoryDetailTitles[categoryId], ...(product.detailsLabels || {}) };
    const sizeBlock = accordions[1] || findAccordion(/size/);
    const benefitsBlock = accordions[2] || findAccordion(/benefit/);
    const materialBlock = accordions[3] || findAccordion(/material/);
    const noSize = /არ\s*აქვს/i.test(String(product.size || "").trim());
    if (categoryId === "harnesses") {
      if (noSize) hideSizeIndicators(sizeBlock);
      else if (product.sizeDetails) setAccordionText(sizeBlock, product.sizeDetails);
      else {
        const sizeContent = accordionContent(sizeBlock);
        if (sizeContent) sizeContent.innerHTML = sizeGuideHtml;
      }
    } else {
      const sizeText = [!noSize && product.size ? `ზომა: ${product.size}` : "", product.sizeDetails]
        .filter(Boolean)
        .join("\n\n");
      if (sizeText) setAccordionText(sizeBlock, sizeText);
      else if (sizeBlock) sizeBlock.hidden = true;
    }
    if (product.benefits) setAccordionText(benefitsBlock, product.benefits, true);
    else if (categoryId !== "harnesses" && benefitsBlock) benefitsBlock.hidden = true;
    if (product.materialCare) setAccordionText(materialBlock, product.materialCare);
    else if (categoryId !== "harnesses" && materialBlock) materialBlock.hidden = true;
    setSelectedSize(product, categoryId, sizeBlock);
    setAccordionTitle(sizeBlock, titles.size);
    setAccordionTitle(benefitsBlock, titles.benefits);
    setAccordionTitle(materialBlock, titles.material);

    // Refresh accordion heights after injecting CMS content.
    accordions.forEach((block) => {
      const details = block.querySelector("[data-collapsible]");
      const body = details?.querySelector("[data-collapsible-body]");
      if (!details || !body || block.hidden) return;
      details.removeAttribute("open");
      body.style.height = "";
      body.style.removeProperty("max-height");
      body.style.removeProperty("overflow");
    });

    window.initializePupsyReadMore?.(document);

    const backLink = document.querySelector("a[href*='shop.html']");
    if (backLink) backLink.href = new URL("shop.html", baseUrl).href;
    document.documentElement.classList.remove("cms-product-loading");
  }

  async function init() {
    try {
      if (!window.PupsyComingSoonVotes) {
        await new Promise((resolve, reject) => {
          const script = document.createElement("script");
          script.src = new URL("js/coming-soon-votes.js?v=5", baseUrl).href;
          script.onload = resolve;
          script.onerror = reject;
          document.head.append(script);
        });
      }
      const catalogs = await Promise.all(catalogFiles.map(async (catalog) => {
        const response = await fetch(new URL(catalog.path, baseUrl));
        if (!response.ok) throw new Error("პროდუქტების სია ვერ ჩაიტვირთა: " + catalog.category);
        const data = await response.json();
        return (Array.isArray(data.products) ? data.products : []).map((product) => ({
          ...product,
          category: catalog.category,
          categoryId: catalog.id,
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
      const productRoot = document.querySelector("product-component[data-product]");
      if (productRoot) productRoot.replaceChildren(message);
      else document.querySelector(".product__content")?.prepend(message);
      document.documentElement.classList.remove("cms-product-loading");
    }
  }

  init();
})();
