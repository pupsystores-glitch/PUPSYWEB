(() => {
  const container = document.querySelector("[data-cart-errors-container]");
  if (!container) return;

  const styles = document.createElement("style");
  styles.textContent = `
    .product__form__errors .errors.product-contact-prompt {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      max-width: 100%;
      margin: 0 auto 16px;
      padding: 18px 46px 18px 18px;
      border: 1px solid #c09488 !important;
      border-radius: 8px;
      background: #eadbd7 !important;
      color: #3f302c !important;
      text-align: center;
      transition: opacity .5s ease, transform .5s ease;
    }
    .product__form__errors .errors.product-contact-prompt.is-closing {
      opacity: 0;
      transform: translate3d(0, -20px, 0);
      pointer-events: none;
    }
    .product__form__errors .product-contact-prompt__message {
      margin: 0;
      color: inherit;
      text-align: center;
    }
    .product__form__errors .product-contact-prompt__channels {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
      flex-wrap: wrap;
    }
    .product__form__errors .product-contact-prompt__link {
      display: flex;
      min-width: 82px;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      color: #3f302c !important;
      font-size: 12px;
      line-height: 1.2;
      text-decoration: none;
    }
    .product__form__errors .product-contact-prompt__icon {
      display: block;
      width: 38px;
      height: 38px;
      flex: 0 0 38px;
    }
    .product__form__errors .product-contact-prompt .errors__close {
      position: absolute;
      top: 8px;
      right: 8px;
      display: flex;
      width: 32px;
      height: 32px;
      align-items: center;
      justify-content: center;
      padding: 0;
      border: 1px solid rgba(63, 48, 44, .2) !important;
      border-radius: 50%;
      color: #3f302c !important;
      background: rgba(255, 255, 255, .55) !important;
      transform: none;
      transition: background-color .2s ease, transform .25s ease;
    }
    .product__form__errors .product-contact-prompt .errors__close:hover {
      background: #fff !important;
      transform: rotate(90deg);
    }
    .product__form__errors .product-contact-prompt .errors__close:focus-visible {
      outline: 2px solid #3f302c;
      outline-offset: 2px;
    }
    .product__form__errors .product-contact-prompt .errors__close svg {
      display: block;
      width: 18px;
      height: 18px;
    }
  `;
  document.head.append(styles);

  const messageForLanguage = () => document.documentElement.lang === "en"
    ? "Please contact us to purchase this product."
    : "პროდუქტის შესაძენად დაგვიკავშირდით.";

  function createChannel(label, href, imageSource) {
    const link = document.createElement("a");
    link.className = "product-contact-prompt__link";
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label);
    const icon = document.createElement("img");
    icon.className = "product-contact-prompt__icon";
    icon.src = imageSource;
    icon.alt = "";
    link.append(icon, document.createElement("span"));
    link.lastElementChild.textContent = label;
    return link;
  }

  function renderContactPrompt() {
    const error = container.querySelector(".errors");
    if (!error) return;

    if (!error.dataset.contactPrompt) {
      const errorText = error.textContent || "";
      if (!errorText.includes("Failed to execute 'json' on 'Response'") && !errorText.includes("Unexpected end of JSON input")) return;
      error.dataset.contactPrompt = "true";
      error.classList.add("product-contact-prompt");

      const message = document.createElement("p");
      message.className = "product-contact-prompt__message";
      message.setAttribute("data-contact-prompt-message", "");

      const channels = document.createElement("div");
      channels.className = "product-contact-prompt__channels";
      channels.append(
        createChannel("WhatsApp", "https://wa.me/13142039237", "images/Whatsapp-Logo.png"),
        createChannel("Messenger", "https://m.me/furlou", "images/Messenger-Logo.png")
      );

      const close = document.createElement("button");
      close.type = "button";
      close.className = "errors__close";
      close.setAttribute("data-close-error", "");
      close.setAttribute("aria-label", document.documentElement.lang === "en" ? "Close" : "დახურვა");
      close.innerHTML = '<svg aria-hidden="true" focusable="false" role="presentation" width="24px" height="24px" stroke-width="1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="icon icon-cancel"><path d="M6.758 17.243L12.001 12m5.243-5.243L12 12m0 0L6.758 6.757M12.001 12l5.243 5.243" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path></svg>';
      error.replaceChildren(message, channels, close);
    }

    const message = error.querySelector("[data-contact-prompt-message]");
    if (message) {
      const translatedMessage = messageForLanguage();
      if (message.textContent !== translatedMessage) message.textContent = translatedMessage;
    }
    const close = error.querySelector("[data-close-error]");
    if (close) {
      const closeLabel = document.documentElement.lang === "en" ? "Close" : "დახურვა";
      if (close.getAttribute("aria-label") !== closeLabel) close.setAttribute("aria-label", closeLabel);
    }
  }

  new MutationObserver(renderContactPrompt).observe(container, {
    attributes: true,
    childList: true,
    characterData: true,
    subtree: true
  });
  new MutationObserver(renderContactPrompt).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["lang"]
  });

  container.addEventListener("click", event => {
    const close = event.target.closest("[data-close-error]");
    if (!close || !close.closest(".product-contact-prompt")) return;
    event.preventDefault();
    event.stopPropagation();
    const error = close.closest(".errors");
    if (!error || error.classList.contains("is-closing")) return;
    close.disabled = true;
    error.classList.add("is-closing");
    container.classList.remove("is-visible");
    window.setTimeout(() => {
      if (error.isConnected) error.remove();
    }, 500);
  }, true);

  renderContactPrompt();
})();
