(function () {
  "use strict";

  const catalogFiles = [
    { path: "products/categories/harnesses.json", category: "წელსამაგრები" },
    { path: "products/categories/collars.json", category: "საყელური" },
    { path: "products/categories/leashes.json", category: "საბელი" },
    { path: "products/categories/accessories.json", category: "აქსესუარები" },
    { path: "products/categories/hygiene-care.json", category: "ჰიგიენა & მოვლა" },
    { path: "products/categories/toys.json", category: "სათამაშოები" },
  ];
  const baseUrl = new URL(".", document.baseURI);
  function loadVoteModule() {
    if (window.PupsyComingSoonVotes) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = new URL("js/coming-soon-votes.js?v=5", baseUrl).href;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  }
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

  function formatPrice(value) {
    const amount = Number(value);
    if (!Number.isFinite(amount)) return "";
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
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
    card.href = new URL(`product-pages/${encodeURIComponent(productSlug(product))}.html`, baseUrl).href;

    const image = document.createElement("img");
    image.className = "cms-product-card__image";
    const imagePath = productImages(product)[0];
    if (imagePath) {
      image.src = safeImagePath(imagePath, 640);
    } else {
      image.hidden = true;
    }
    if (imagePath && /\/cdn\/shop\/files\/|cdn\.shopify\.com/i.test(imagePath)) {
      image.srcset = [320, 480, 640, 800]
        .map((width) => safeImagePath(imagePath, width) + " " + width + "w")
        .join(", ");
      image.sizes = "(max-width: 600px) 50vw, 25vw";
    }
    image.alt = product.title || "PUPSY პროდუქტი";
    image.loading = "lazy";
    card.append(image);

    if (product.comingSoon === true) {
      const badge = document.createElement("span");
      badge.className = "cms-product-card__badge";
      const badgeText = document.createElement("span");
      badgeText.className = "cms-product-card__badge-text";
      badgeText.lang = "ka";
      badgeText.textContent = "მალე დაგვემატება";
      badge.style.cssText = "position:absolute;top:10px;right:10px;z-index:2;display:flex;align-items:center;justify-content:center;box-sizing:border-box;width:140px;height:36px;max-width:calc(100% - 20px);padding:0 8px;border-radius:999px;background:#8a4d2e;color:#fff;font-family:system-ui,-apple-system,BlinkMacSystemFont,sans-serif;font-size:12px;font-weight:700;line-height:1;text-align:center;white-space:nowrap;text-size-adjust:100%;-webkit-text-size-adjust:100%;box-shadow:0 2px 8px rgba(40,28,20,.2);";
      badgeText.style.cssText = "position:absolute;inset:0;display:flex;align-items:center;justify-content:center;margin:0;padding:0;font-family:inherit;font-size:inherit;font-weight:inherit;text-align:center;line-height:1;letter-spacing:0;transform:none;";
      badge.append(badgeText);
      badge.setAttribute("role", "status");
      card.append(badge);
    }

    const details = document.createElement("span");
    details.className = "cms-product-card__details";
    const title = document.createElement("span");
    title.className = "cms-product-card__title";
    title.textContent = product.title || "პროდუქტი";
    const price = document.createElement("span");
    price.className = "cms-product-card__price";
    const currency = document.createElement("img");
    currency.className = "lari-currency-logo cms-product-card__currency";
      currency.src = new URL("images/Lari_logo_tight.png", baseUrl).href;
    currency.alt = "";
    currency.setAttribute("aria-hidden", "true");
    currency.style.cssText = "display:block;width:.68em;height:.68em;flex:0 0 .68em;margin:0;object-fit:contain;transform:translateY(-.04em);";
    const amount = document.createElement("span");
    amount.style.cssText = "display:block;line-height:inherit;";
    amount.textContent = formatPrice(product.price);
    price.style.cssText = "display:inline-flex;align-items:center;gap:.1em;font-weight:600;line-height:1.2;vertical-align:middle;";
    price.append(currency, amount);
    details.append(title, price);
    card.append(details);
    if (product.comingSoon === true) {
      window.PupsyComingSoonVotes?.mount(productSlug(product), product.title || "პროდუქტი", card, { inline: true });
    }
    return card;
  }

  async function loadCatalog() {
    const targets = document.querySelectorAll("[data-cms-products]");
    if (!targets.length) return;

    try {
      await loadVoteModule();
      const catalogs = await Promise.all(catalogFiles.map(async (catalog) => {
        const response = await fetch(new URL(catalog.path, baseUrl));
        if (!response.ok) throw new Error("კატალოგის ჩატვირთვა ვერ მოხერხდა: " + catalog.category);
        const data = await response.json();
        return (Array.isArray(data.products) ? data.products : []).map((product) => ({
          ...product,
          category: catalog.category,
        }));
      }));
      const products = catalogs.flat().filter(
        (product) => product.published !== false && product.title
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
