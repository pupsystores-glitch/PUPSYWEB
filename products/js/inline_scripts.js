
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "FURLOU ",
    "url": "https://furlou.com",
    "potentialAction": {
      "@type": "SearchAction",
      "query-input": "required name=query",
      "target": "https://furlou.com/search?q={query}"
    }
  }



  {
    "@context": "https://schema.org",
    "@type": "Product",
     "@id" : "/products/blue-hands-free-braided-leash#product",
    "name": "'Blue' - Hands Free Braided Leash",
    "brand": {"@type": "Brand","name": "FURLOU"},
    "sku": "HFBL-BLU-U",
    "mpn": "644321884491",
    "description": "Because you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\n",
    "url": "https://furlou.com/products/blue-hands-free-braided-leash","image": "https://furlou.com/cdn/shop/files/07_20523851-9f04-4d41-aead-57f109083668_4000x.png?v=1750448509","itemCondition": "https://schema.org/NewCondition",
    "offers": [{
          "@type": "Offer","price": "42.00","priceCurrency": "USD",
          "itemCondition": "https://schema.org/NewCondition",
          "url": "https://furlou.com/products/blue-hands-free-braided-leash?variant=42845496049852",
          "sku": "HFBL-BLU-U",
          "mpn": "644321884491",
          "availability" : "https://schema.org/InStock",
          "priceValidUntil": "2026-10-29","gtin12": "644321884491","seller": {
            "@type": "Organization",
            "name": "FURLOU "
          }
}]}



  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {"@type": "ListItem","position": 1,"name": "Home","item": "https://furlou.com"},
      {"@type": "ListItem","position": 2,"name": "All Products","item": "https://furlou.com/collections/all"},
      {"@type": "ListItem","position": 3,"name": "'Blue' - Hands Free Braided Leash","item": "https://furlou.com/products/blue-hands-free-braided-leash"}]
  }



    if (window.navigator.userAgent.indexOf('MSIE ') > 0 || window.navigator.userAgent.indexOf('Trident/') > 0) {
      document.documentElement.className = document.documentElement.className + ' ie';

      var scripts = document.getElementsByTagName('script')[0];
      var polyfill = document.createElement("script");
      polyfill.defer = true;
      polyfill.src = "//furlou.com/cdn/shop/t/13/assets/ie11.js?v=144489047535103983231773392863";

      scripts.parentNode.insertBefore(polyfill, scripts);
    } else {
      document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
    }

    document.documentElement.style.setProperty('--scrollbar-width', `${getScrollbarWidth()}px`);

    function getScrollbarWidth() {
      // Creating invisible container
      const outer = document.createElement('div');
      outer.style.visibility = 'hidden';
      outer.style.overflow = 'scroll'; // forcing scrollbar to appear
      outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
      document.documentElement.appendChild(outer);

      // Creating inner element and placing it in the container
      const inner = document.createElement('div');
      outer.appendChild(inner);

      // Calculating difference between container's full width and the child width
      const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

      // Removing temporary elements from the DOM
      outer.parentNode.removeChild(outer);

      return scrollbarWidth;
    }

    let root = '/';
    if (root[root.length - 1] !== '/') {
      root = root + '/';
    }

    window.theme = {
      routes: {
        root: root,
        cart_url: '/cart',
        cart_add_url: '/cart/add',
        cart_change_url: '/cart/change',
        product_recommendations_url: '/recommendations/products',
        predictive_search_url: '/search/suggest',
        addresses_url: '/account/addresses'
      },
      assets: {
        photoswipe: '//furlou.com/cdn/shop/t/13/assets/photoswipe.js?v=162613001030112971491773392868',
        rellax: '//furlou.com/cdn/shop/t/13/assets/rellax.js?v=4664090443844197101773392873',
        smoothscroll: '//furlou.com/cdn/shop/t/13/assets/smoothscroll.js?v=37906625415260927261773392876',
      },
      strings: {
        addToCart: "Add to cart",
        cartAcceptanceError: "You must accept our terms and conditions.",
        soldOut: "Coming soon",
        preOrder: "Pre-order",
        sale: "Sale",
        subscription: "Subscription",
        unavailable: "Unavailable",
        shippingCalcSubmitButton: "Calculate shipping",
        shippingCalcSubmitButtonDisabled: "Calculating...",
        oneColor: "color",
        otherColor: "colors",
        free: "Free",
        sku: "SKU",
      },
      settings: {
        cartType: "drawer",
        customerLoggedIn: null ? true : false,
        enableQuickAdd: true,
        enableAnimations: true,
        variantOnSale: true,
        collectionSwatchStyle: "slider",
        swatchesType: "theme",
        mobileMenuType: "new",
        atcButtonShowPrice: false,
      },
      variables: {
        productPageSticky: false,
      },
      sliderArrows: {
        prev: '<button type="button" class="slider__button slider__button--prev" data-button-arrow data-button-prev>' + "Previous" + '</button>',
        next: '<button type="button" class="slider__button slider__button--next" data-button-arrow data-button-next>' + "Next" + '</button>',
      },
      moneyFormat: false ? "${{amount}} USD" : "${{amount}}",
      moneyWithoutCurrencyFormat: "${{amount}}",
      moneyWithCurrencyFormat: "${{amount}} USD",
      subtotal: 0,
      info: {
        name: 'broadcast'
      },
      version: '6.2.0'
    };

    let windowInnerHeight = window.innerHeight;
    document.documentElement.style.setProperty('--full-height', `${windowInnerHeight}px`);
    document.documentElement.style.setProperty('--three-quarters', `${windowInnerHeight * 0.75}px`);
    document.documentElement.style.setProperty('--two-thirds', `${windowInnerHeight * 0.66}px`);
    document.documentElement.style.setProperty('--one-half', `${windowInnerHeight * 0.5}px`);
    document.documentElement.style.setProperty('--one-third', `${windowInnerHeight * 0.33}px`);
    document.documentElement.style.setProperty('--one-fifth', `${windowInnerHeight * 0.2}px`);


window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.start');

{"shopId":23801659472,"countryCode":"US","currencyCode":"USD","merchantCapabilities":["supports3DS"],"merchantId":"gid:\/\/shopify\/Shop\/23801659472","merchantName":"FURLOU ","requiredBillingContactFields":["postalAddress","email","phone"],"requiredShippingContactFields":["postalAddress","email","phone"],"shippingType":"shipping","supportedNetworks":["visa","masterCard","amex","discover","elo","jcb"],"total":{"type":"pending","label":"FURLOU ","amount":"1.00"},"shopifyPaymentsEnabled":true,"supportsSubscriptions":true}

{"accessToken":"6e268bd0dead4edf74e4f258bd6842df","betas":["rich-media-storefront-analytics"],"domain":"furlou.com","predictiveSearch":true,"shopId":23801659472,"locale":"en"}

var Shopify = Shopify || {};
Shopify.shop = "furlou.myshopify.com";
Shopify.locale = "en";
Shopify.currency = {"active":"USD","rate":"1.0"};
Shopify.country = "GE";
Shopify.theme = {"name":"VERÃO 26 \u0026 BUNDLES | AUGE","id":152991400124,"schema_name":"Broadcast","schema_version":"6.2.0","theme_store_id":868,"role":"main"};
Shopify.theme.handle = "null";
Shopify.theme.style = {"id":null,"handle":null};
Shopify.cdnHost = "furlou.com/cdn";
Shopify.routes = Shopify.routes || {};
Shopify.routes.root = "/";
Shopify.shopJsCdnBaseUrl = "https://cdn.shopify.com/shopifycloud/shop-js";
Shopify.SignInWithShop = Shopify.SignInWithShop || {};
Shopify.SignInWithShop.User = Shopify.SignInWithShop.User || {};
Shopify.SignInWithShop.User.recognized = false;

!function(o){(o.Shopify=o.Shopify||{}).modules=!0}(window);

!function(o){function n(){var o=[];function n(){o.push(Array.prototype.slice.apply(arguments))}return n.q=o,n}var t=o.Shopify=o.Shopify||{};t.loadFeatures=n(),t.autoloadFeatures=n()}(window);


  window.ShopifyPay = window.ShopifyPay || {};
  window.ShopifyPay.apiHost = "shop.app\/pay";
  window.ShopifyPay.redirectState = "pending";



  window.Shopify = window.Shopify || {};
  window.Shopify.SignInWithShop = window.Shopify.SignInWithShop || {};
  window.Shopify.SignInWithShop.assetMetrics = { sampleRate: 0.25 };
  window.Shopify.SignInWithShop.eligible = true;


{"pageType":"product"}


  await import("https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.init-shop-cart-sync.en.esm.js");

  window.Shopify.SignInWithShop?.initShopCartSync?.({"fedCMEnabled":true,"windoidEnabled":true});




  await import("https://cdn.shopify.com/shopifycloud/shop-js/modules/v2/loader.payment-terms.en.esm.js");

  



  window.Shopify = window.Shopify || {};
  if (!window.Shopify.featureAssets) window.Shopify.featureAssets = {};
  window.Shopify.featureAssets['shop-js'] = {"avatar":["modules/v2/loader.avatar.en.esm.js"],"checkout-modal":["modules/v2/loader.checkout-modal.en.esm.js"],"init-customer-accounts-sign-up":["modules/v2/loader.init-customer-accounts-sign-up.en.esm.js"],"init-customer-accounts":["modules/v2/loader.init-customer-accounts.en.esm.js"],"init-fed-cm":["modules/v2/loader.init-fed-cm.en.esm.js"],"init-shop-cart-sync":["modules/v2/loader.init-shop-cart-sync.en.esm.js"],"init-shop-email-lookup-coordinator":["modules/v2/loader.init-shop-email-lookup-coordinator.en.esm.js"],"init-shop-for-new-customer-accounts":["modules/v2/loader.init-shop-for-new-customer-accounts.en.esm.js"],"init-shop-user-recognition":["modules/v2/loader.init-shop-user-recognition.en.esm.js"],"init-windoid":["modules/v2/loader.init-windoid.en.esm.js"],"lead-capture":["modules/v2/loader.lead-capture.en.esm.js"],"listener":["modules/v2/loader.listener.en.esm.js"],"pay-button":["modules/v2/loader.pay-button.en.esm.js"],"payment-terms":["modules/v2/loader.payment-terms.en.esm.js"],"shop-button":["modules/v2/loader.shop-button.en.esm.js"],"shop-cart-sync":["modules/v2/loader.shop-cart-sync.en.esm.js"],"shop-cash-offers":["modules/v2/loader.shop-cash-offers.en.esm.js"],"shop-follow-button":["modules/v2/loader.shop-follow-button.en.esm.js"],"shop-login-button":["modules/v2/loader.shop-login-button.en.esm.js"],"shop-login":["modules/v2/loader.shop-login.en.esm.js"],"shop-toast-manager":["modules/v2/loader.shop-toast-manager.en.esm.js"],"shop-user-recognition":["modules/v2/loader.shop-user-recognition.en.esm.js"]};


(function() {
  var isLoaded = false;
  function asyncLoad() {
    if (isLoaded) return;
    isLoaded = true;
    var urls = ["\/\/code.tidio.co\/lxt1ecn2vv3qdfekjlsfsytzhwkjhkjo.js?shop=furlou.myshopify.com","https:\/\/cdn.nfcube.com\/instafeed-6d16584a942a1279719657deeb6a9209.js?shop=furlou.myshopify.com","https:\/\/sdk.postscript.io\/sdk-script-loader.bundle.js?shopId=239413\u0026shop=furlou.myshopify.com"];
    for (var i = 0; i < urls.length; i++) {
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = urls[i];
      var x = document.getElementsByTagName('script')[0];
      x.parentNode.insertBefore(s, x);
    }
  };
  if(window.attachEvent) {
    window.attachEvent('onload', asyncLoad);
  } else {
    window.addEventListener('load', asyncLoad, false);
  }
})();

var __st={"a":23801659472,"offset":-25200,"reqid":"1e27b5df-c5d7-429f-a7cd-863ecf8ca9a3-1790694775","pageurl":"furlou.com\/products\/blue-hands-free-braided-leash","u":"f1c86162b63a","p":"product","rtyp":"product","rid":7986635505852};

window.ShopifyPaypalV4VisibilityTracking = true;

!function(){'use strict';const t='contact',e='account',n='new_comment',o=[[t,t],['blogs',n],['comments',n],[t,'customer']],c=[[e,'customer_login'],[e,'guest_login'],[e,'recover_customer_password'],[e,'create_customer']],r=t=>t.map((([t,e])=>`form[action*='/${t}']:not([data-nocaptcha='true']) input[name='form_type'][value='${e}']`)).join(','),a=t=>()=>t?[...document.querySelectorAll(t)].map((t=>t.form)):[];function s(){const t=[...o],e=r(t);return a(e)}const i='password',u='form_key',d=['recaptcha-v3-token','g-recaptcha-response','h-captcha-response',i],f=()=>{try{return window.sessionStorage}catch{return}},m='__shopify_v',_=t=>t.elements[u];function p(t,e,n=!1){try{const o=window.sessionStorage,c=JSON.parse(o.getItem(e)),{data:r}=function(t){const{data:e,action:n}=t;return t[m]||n?{data:e,action:n}:{data:t,action:n}}(c);for(const[e,n]of Object.entries(r))t.elements[e]&&(t.elements[e].value=n);n&&o.removeItem(e)}catch(o){console.error('form repopulation failed',{error:o})}}const l='form_type',E='cptcha';function T(t){t.dataset[E]=!0}const w=window,h=w.document,L='Shopify',v='ce_forms',y='captcha';let A=!1;((t,e)=>{const n=(g='f06e6c50-85a8-45c8-87d0-21a2b65856fe',I='https://cdn.shopify.com/shopifycloud/storefront-forms-hcaptcha/ce_storefront_forms_captcha_hcaptcha.v1.5.3.iife.js',D={infoText:'Protected by hCaptcha',privacyText:'Privacy',termsText:'Terms'},(t,e,n)=>{const o=w[L][v],c=o.bindForm;if(c)return c(t,g,e,D).then(n);var r;o.q.push([[t,g,e,D],n]),r=I,A||(h.body.append(Object.assign(h.createElement('script'),{id:'captcha-provider',async:!0,src:r})),A=!0)});var g,I,D;w[L]=w[L]||{},w[L][v]=w[L][v]||{},w[L][v].q=[],w[L][y]=w[L][y]||{},w[L][y].protect=function(t,e){n(t,void 0,e),T(t)},Object.freeze(w[L][y]),function(t,e,n,w,h,L){const[v,y,A,g]=function(t,e,n){const i=e?o:[],u=t?c:[],d=[...i,...u],f=r(d),m=r(i),_=r(d.filter((([t,e])=>n.includes(e))));return[a(f),a(m),a(_),s()]}(w,h,L),I=t=>{const e=t.target;return e instanceof HTMLFormElement?e:e&&e.form},D=t=>v().includes(t);t.addEventListener('submit',(t=>{const e=I(t);if(!e)return;const n=D(e)&&!e.dataset.hcaptchaBound&&!e.dataset.recaptchaBound,o=_(e),c=g().includes(e)&&(!o||!o.value);(n||c)&&t.preventDefault(),c&&!n&&(function(t){try{if(!f())return;!function(t){const e=f();if(!e)return;const n=_(t);if(!n)return;const o=n.value;o&&e.removeItem(o)}(t);const e=Array.from(Array(32),(()=>Math.random().toString(36)[2])).join('');!function(t,e){_(t)||t.append(Object.assign(document.createElement('input'),{type:'hidden',name:u})),t.elements[u].value=e}(t,e),function(t,e){const n=f();if(!n)return;const o=[...t.querySelectorAll(`input[type='${i}']`)].map((({name:t})=>t)),c=[...d,...o],r={};for(const[a,s]of new FormData(t).entries())c.includes(a)||(r[a]=s);n.setItem(e,JSON.stringify({[m]:1,action:t.action,data:r}))}(t,e)}catch(e){console.error('failed to persist form',e)}}(e),e.submit())}));const S=(t,e)=>{t&&!t.dataset[E]&&(n(t,e.some((e=>e===t))),T(t))};for(const o of['focusin','change'])t.addEventListener(o,(t=>{const e=I(t);D(e)&&S(e,y())}));const B=e.get('form_key'),M=e.get(l),P=B&&M;t.addEventListener('DOMContentLoaded',(()=>{const t=y();if(P)for(const e of t)e.elements[l].value===M&&p(e,B);[...new Set([...A(),...v().filter((t=>'true'===t.dataset.shopifyCaptcha))])].forEach((e=>S(e,t)))}))}(h,new URLSearchParams(w.location.search),n,t,e,['guest_login'])})(!0,!0)}();

(function () {var userAgent = navigator.userAgent;var platform = navigator.platform;var maxTouchPoints = navigator.maxTouchPoints || 0;var isIOS = /iPad|iPhone|iPod/.test(platform) || (platform === 'MacIntel' && maxTouchPoints > 1);var isMacSafari = platform.indexOf('Mac') === 0 && /Safari/.test(userAgent) && !/Chrome|Chromium|CriOS|FxiOS|Edg|OPR|Android/.test(userAgent);var isAppleSafari = isIOS || isMacSafari;if (isAppleSafari) {fetch('/sf_private_access_tokens' + location.search).catch(function () {});}function browserMajorVersion(pattern) {var match = userAgent.match(pattern);return match ? parseInt(match[1], 10) : null;}function shouldLoadAutosizesPolyfill() {if (!window.PerformanceObserver?.supportedEntryTypes?.includes('paint')) {return false;}var chromeVersion = browserMajorVersion(/Chrome\/(\d+)/);if (chromeVersion !== null) {return chromeVersion < 126;}var firefoxVersion = browserMajorVersion(/Firefox\/(\d+)/);if (firefoxVersion !== null) {return firefoxVersion < 150;}var safariVersion = isAppleSafari ? browserMajorVersion(/Version\/(\d+).*Safari\//) : null;if (safariVersion !== null) {return safariVersion < 27;}return true;}if (shouldLoadAutosizesPolyfill()) {var autosizesScript = document.createElement('script');autosizesScript.async = true;autosizesScript.crossOrigin = 'anonymous';autosizesScript.src = "//furlou.com/cdn/shopifycloud/storefront/assets/storefront/autosizes-84416378.js";(document.head || document.documentElement).appendChild(autosizesScript);}window.ShopifyAnalytics = window.ShopifyAnalytics || {};window.ShopifyAnalytics.performance = window.ShopifyAnalytics.performance || {};(function () {var LONG_FRAME_THRESHOLD = 50;var longAnimationFrames = [];var activeRafId = null;function collectLongFrames() {var previousTime = null;function rafMonitor(now) {if (activeRafId === null) {return;}var delta = now - previousTime;if (delta > LONG_FRAME_THRESHOLD) {longAnimationFrames.push({startTime: previousTime,endTime: now,});}previousTime = now;activeRafId = requestAnimationFrame(rafMonitor);}previousTime = performance.now();activeRafId = requestAnimationFrame(rafMonitor);}if (!window.PerformanceObserver?.supportedEntryTypes?.includes('long-animation-frame')) {collectLongFrames();var timeoutId = setTimeout(function () {cancelAnimationFrame(activeRafId);}, 10000);window.ShopifyAnalytics.performance.getLongAnimationFrames = function (stopCollection) {if (stopCollection === undefined) {stopCollection = false;}if (stopCollection) {clearTimeout(timeoutId);cancelAnimationFrame(activeRafId);}return longAnimationFrames;};}})();})();


  window.Shopify = window.Shopify || {};
  window.Shopify.MCP = window.Shopify.MCP || {};
  window.Shopify.MCP.enabled = true;
  window.Shopify.MCP.shop = "furlou.myshopify.com";
  window.Shopify.MCP.mcpEndpoint = "https:\/\/furlou.com\/api\/mcp";
  window.Shopify.MCP.tools = [{"name":"search_shop_policies_and_faqs","description":"Used to get facts about the stores policies, products, or services.\nSome examples of questions you can ask are:\n  - What is your return policy?\n  - What is your shipping policy?\n  - What is your phone number?\n  - What are your hours of operation?\"\n","inputSchema":{"$schema":"https:\/\/json-schema.org\/draft\/2020-12\/schema","type":"object","properties":{"query":{"type":"string","description":"A natural language query."},"context":{"type":"string","description":"Additional information about the request such as user demographics, mood, location, or other relevant details that could help in tailoring the response appropriately."}},"required":["query"]}}];


(()=>{var d="shopify:webmcp_adapter_loaded",n=Symbol.for("shopify.webmcp_adapter_loading");function s(c,a,{win:r=window,doc:o=document}={}){function p(){try{return r.localStorage.getItem(d)==="true"}catch{return!1}}function l(){try{r.localStorage.setItem(d,"true")}catch{}}function u(){return typeof(o.modelContext||r.navigator?.modelContext)?.registerTool=="function"}function f(){if(r[n]||!u())return;let t=o.head||o.getElementsByTagName("head")[0];if(!t)return;let e=o.createElement("script");e.type="module",e.crossOrigin="anonymous",a&&(e.integrity=a),e.src=c,e.addEventListener("load",l,{once:!0}),e.addEventListener("error",()=>{r[n]=!1},{once:!0}),t.appendChild(e),r[n]=!0}function _(t){let e=o.getElementById("shopify-origin-trials");if(!e||r.__shopifyOriginTrialsDone){t();return}e.addEventListener("load",t,{once:!0}),e.addEventListener("error",t,{once:!0})}function i(){_(()=>r.setTimeout(f,0))}function m(){o.addEventListener("DOMContentLoaded",i,{once:!0})}p()?i():m()}s("\/\/furlou.com\/cdn\/shopifycloud\/storefront\/assets\/storefront\/webmcp-c6b62ece.js","sha256-ke4DDuBjdvea3vxLWxHc9E9nq8zihuG4IfYEGbb77ys=");})();


var Shopify=Shopify||{};Shopify.PaymentButton=Shopify.PaymentButton||{isStorefrontPortableWallets:!0,init:function(){window.Shopify.PaymentButton.init=function(){};var t=document.createElement("script");t.src="https://furlou.com/cdn/shopifycloud/portable-wallets/latest/portable-wallets.en.js",t.type="module",document.head.appendChild(t)}};



  function portableWalletsHideBuyerConsent(e){var t=document.getElementById("shopify-buyer-consent"),n=document.getElementById("shopify-subscription-policy-button");t&&n&&(t.classList.add("hidden"),t.setAttribute("aria-hidden","true"),n.removeEventListener("click",e))}function portableWalletsShowBuyerConsent(e){var t=document.getElementById("shopify-buyer-consent"),n=document.getElementById("shopify-subscription-policy-button");t&&n&&(t.classList.remove("hidden"),t.removeAttribute("aria-hidden"),n.addEventListener("click",e))}window.Shopify?.PaymentButton&&(window.Shopify.PaymentButton.hideBuyerConsent=portableWalletsHideBuyerConsent,window.Shopify.PaymentButton.showBuyerConsent=portableWalletsShowBuyerConsent);


document.addEventListener("DOMContentLoaded",(function(){function t(){return document.querySelector("shopify-accelerated-checkout-cart, shopify-accelerated-checkout")}if(t())Shopify.PaymentButton.init();else{new MutationObserver((function(e,n){t()&&(Shopify.PaymentButton.init(),n.disconnect())})).observe(document.body,{childList:!0,subtree:!0})}}));


window.performance && window.performance.mark && window.performance.mark('shopify.content_for_header.end');


    {"id":7986635505852,"title":"'Blue' - Hands Free Braided Leash","handle":"blue-hands-free-braided-leash","description":"\u003cp\u003eBecause you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e","published_at":"2023-11-04T07:04:06-07:00","created_at":"2023-07-21T17:30:08-07:00","vendor":"FURLOU","type":"Hands Free Braided Leash","tags":["Braided Leash","Hands Free Braided Leash"],"price":4200,"price_min":4200,"price_max":4200,"available":true,"price_varies":false,"compare_at_price":null,"compare_at_price_min":0,"compare_at_price_max":0,"compare_at_price_varies":false,"variants":[{"id":42845496049852,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"HFBL-BLU-U","requires_shipping":true,"taxable":true,"featured_image":null,"available":true,"name":"'Blue' - Hands Free Braided Leash","public_title":null,"options":["Default Title"],"price":4200,"weight":170,"compare_at_price":null,"inventory_management":"shopify","barcode":"644321884491","requires_selling_plan":false,"selling_plan_allocations":[],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920","\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877"],"featured_image":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","options":["Title"],"media":[{"alt":"'Blue' - Hands Free Braided Leash - FURLOU ","id":34611135021244,"position":1,"preview_image":{"aspect_ratio":1.0,"height":4000,"width":4000,"src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509"},"aspect_ratio":1.0,"height":4000,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","width":4000},{"alt":"'Blue' - Hands Free Braided Leash - FURLOU ","id":34611134791868,"position":2,"preview_image":{"aspect_ratio":1.0,"height":3287,"width":3287,"src":"\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920"},"aspect_ratio":1.0,"height":3287,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920","width":3287},{"alt":"'Moss Green' - Hands Free Braided Leash - FURLOU ","id":39510436249788,"position":3,"preview_image":{"aspect_ratio":1.0,"height":3024,"width":3024,"src":"\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877"},"aspect_ratio":1.0,"height":3024,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877","width":3024}],"requires_selling_plan":false,"selling_plan_groups":[],"content":"\u003cp\u003eBecause you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e"}
  


  
    window.wishlisthero_buttonProdPageClasses = [];
  
  
    window.wishlisthero_cartDotClasses = [];
  



  try{
    window.WishListHero_block_settings = window.WishListHero_block_settings || {};
    
      window.WishListHero_block_settings.disableAutomaticButtonAddition = true;
    
    
    
      window.WishListHero_block_settings.customLoginUrl = "\/account\/login";
    
  }catch(e){ console.error('WLH block settings error', e); }



  try{
  
    var scr_bdl_path = "https://cdn.shopify.com/extensions/01a0c9b1-b536-7817-99bb-85cdbd32be4f/wishlist-hero-95/assets/bundle2.js";
    window._wh_asset_path = scr_bdl_path.substring(0,scr_bdl_path.lastIndexOf("/")) + "/";
  

  }catch(e){ console.log(e)}
  try{

  
    window.WishListHero_setting = {"ButtonColor":"#474646","IconColor":"rgba(255, 255, 255, 1)","IconType":"Heart","IconTypeNum":"1","ThrdParty_Trans_active":false,"ButtonTextBeforeAdding":"Add to wishlist","ButtonTextAfterAdding":"ADDED TO WISHLIST","AnimationAfterAddition":"None","ButtonTextAddToCart":"ADD TO CART","ButtonTextOutOfStock":"OUT OF STOCK","ButtonTextAddAllToCart":"ADD ALL TO CART","ButtonTextRemoveAllToCart":"REMOVE ALL FROM WISHLIST","AddedProductNotificationText":"Product added to wishlist successfully","AddedProductToCartNotificationText":"Product added to cart successfully","ViewCartLinkText":"View Cart","SharePopup_TitleText":"Share My wishlist","SharePopup_shareBtnText":"Share wishlist","SharePopup_shareHederText":"Share on Social Networks","SharePopup_shareCopyText":"Or copy Wishlist link to share","SharePopup_shareCancelBtnText":"cancel","SharePopup_shareCopyBtnText":"copy","SharePopup_shareCopiedText":"Copied","SendEMailPopup_BtnText":"send email","SendEMailPopup_FromText":"Your Name","SendEMailPopup_ToText":"To email","SendEMailPopup_BodyText":"Note","SendEMailPopup_SendBtnText":"send","SendEMailPopup_SendNotificationText":"email sent successfully","SendEMailPopup_TitleText":"Send My Wislist via Email","AddProductMessageText":"Are you sure you want to add all items to cart ?","RemoveProductMessageText":"Are you sure you want to remove this item from your wishlist ?","RemoveAllProductMessageText":"Are you sure you want to remove all items from your wishlist ?","RemovedProductNotificationText":"Product removed from wishlist successfully","AddAllOutOfStockProductNotificationText":"There seems to have been an issue adding items to cart, please try again later","RemovePopupOkText":"ok","RemovePopup_HeaderText":"ARE YOU SURE?","ViewWishlistText":"View wishlist","EmptyWishlistText":"there are no items in this wishlist","BuyNowButtonText":"Buy Now","BuyNowButtonColor":"rgb(144, 86, 162)","BuyNowTextButtonColor":"rgb(255, 255, 255)","Wishlist_Title":"My Wishlist","WishlistHeaderTitleAlignment":"Left","WishlistProductImageSize":"Normal","PriceColor":"#C1957E","HeaderFontSize":"30","PriceFontSize":"18","ProductNameFontSize":"16","LaunchPointType":"header_menu","DisplayWishlistAs":"popup_window","DisplayButtonAs":"icon_only","PopupSize":"md","ButtonUserConfirmationState":"skipped","ButtonColorAndStyleConfirmationState":"","HideAddToCartButton":false,"NoRedirectAfterAddToCart":false,"DisableGuestCustomer":false,"LoginPopupContent":"Please login to save your wishlist across devices.","LoginPopupLoginBtnText":"Login","LoginPopupContentFontSize":"20","NotificationPopupPosition":"right","WishlistButtonTextColor":"rgba(255, 255, 255, 1)","EnableRemoveFromWishlistAfterAddButtonText":"Remove from wishlist","_id":"681b234b0c2dcd413edc9b65","EnableCollection":false,"EnableShare":true,"RemovePowerBy":false,"EnableFBPixel":false,"EnableGTagIntegration":false,"EnableKlaviyoOnsiteTracking":false,"DisapleApp":false,"FloatPointPossition":"bottom_right","HeartStateToggle":true,"HeaderMenuItemsIndicator":true,"EnableRemoveFromWishlistAfterAdd":true,"Shop":"furlou.myshopify.com","shop":"furlou.myshopify.com","Status":"Active","Plan":"FREE"};
    if(typeof(window.WishListHero_setting_theme_override) != "undefined"){
                                                                                window.WishListHero_setting = {
                                                                                    ...window.WishListHero_setting,
                                                                                    ...window.WishListHero_setting_theme_override
                                                                                };
                                                                            }
                                                                            // Done

  
    if(window.WishListHero_setting){
    window.WishListHero_setting.disableAutomaticButtonAddition = true;
    }
  

  
  
    if(window.WishListHero_setting){
    window.WishListHero_setting.customLoginUrl = "\/account\/login";
    }
  

  }catch(e){ console.error('Error loading config',e); }



    if (!window.__wishlistHeroArriveScriptLoaded) {
      window.__wishlistHeroArriveScriptLoaded = true;
      function wh_loadScript(scriptUrl) {
        const script = document.createElement('script'); script.src = scriptUrl;
        document.body.appendChild(script);
        return new Promise((res, rej) => { script.onload = function () { res(); }; script.onerror = function () { rej(); } });
      }
    }
    document.addEventListener("DOMContentLoaded", () => {
        wh_loadScript('https://cdn.shopify.com/extensions/01a0c9b1-b536-7817-99bb-85cdbd32be4f/wishlist-hero-95/assets/arrive.min.js').then(function () {
            document.arrive('.wishlist-hero-custom-button', function (wishlistButton) {
                var ev = new
                    CustomEvent('wishlist-hero-add-to-custom-element', { detail: wishlistButton }); document.dispatchEvent(ev);
            });
        });
    });
  


  window.WLH_reload_translations = function() {
    let _wlh_res = {};
    if (window.WishListHero_setting && window.WishListHero_setting['ThrdParty_Trans_active']) {

      
        

        window.WishListHero_setting["ButtonTextBeforeAdding"] = "";
        _wlh_res["ButtonTextBeforeAdding"] = "";
        

        window.WishListHero_setting["ButtonTextAfterAdding"] = "";
        _wlh_res["ButtonTextAfterAdding"] = "";
        

        window.WishListHero_setting["ButtonTextAddToCart"] = "";
        _wlh_res["ButtonTextAddToCart"] = "";
        

        window.WishListHero_setting["ButtonTextOutOfStock"] = "";
        _wlh_res["ButtonTextOutOfStock"] = "";
        

        window.WishListHero_setting["ButtonTextAddAllToCart"] = "";
        _wlh_res["ButtonTextAddAllToCart"] = "";
        

        window.WishListHero_setting["ButtonTextRemoveAllToCart"] = "";
        _wlh_res["ButtonTextRemoveAllToCart"] = "";
        

        window.WishListHero_setting["AddedProductNotificationText"] = "";
        _wlh_res["AddedProductNotificationText"] = "";
        

        window.WishListHero_setting["AddedProductToCartNotificationText"] = "";
        _wlh_res["AddedProductToCartNotificationText"] = "";
        

        window.WishListHero_setting["ViewCartLinkText"] = "";
        _wlh_res["ViewCartLinkText"] = "";
        

        window.WishListHero_setting["SharePopup_TitleText"] = "";
        _wlh_res["SharePopup_TitleText"] = "";
        

        window.WishListHero_setting["SharePopup_shareBtnText"] = "";
        _wlh_res["SharePopup_shareBtnText"] = "";
        

        window.WishListHero_setting["SharePopup_shareHederText"] = "";
        _wlh_res["SharePopup_shareHederText"] = "";
        

        window.WishListHero_setting["SharePopup_shareCopyText"] = "";
        _wlh_res["SharePopup_shareCopyText"] = "";
        

        window.WishListHero_setting["SharePopup_shareCancelBtnText"] = "";
        _wlh_res["SharePopup_shareCancelBtnText"] = "";
        

        window.WishListHero_setting["SharePopup_shareCopyBtnText"] = "";
        _wlh_res["SharePopup_shareCopyBtnText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_BtnText"] = "";
        _wlh_res["SendEMailPopup_BtnText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_FromText"] = "";
        _wlh_res["SendEMailPopup_FromText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_ToText"] = "";
        _wlh_res["SendEMailPopup_ToText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_BodyText"] = "";
        _wlh_res["SendEMailPopup_BodyText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_SendBtnText"] = "";
        _wlh_res["SendEMailPopup_SendBtnText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_SendNotificationText"] = "";
        _wlh_res["SendEMailPopup_SendNotificationText"] = "";
        

        window.WishListHero_setting["SendEMailPopup_TitleText"] = "";
        _wlh_res["SendEMailPopup_TitleText"] = "";
        

        window.WishListHero_setting["AddProductMessageText"] = "";
        _wlh_res["AddProductMessageText"] = "";
        

        window.WishListHero_setting["RemoveProductMessageText"] = "";
        _wlh_res["RemoveProductMessageText"] = "";
        

        window.WishListHero_setting["RemoveAllProductMessageText"] = "";
        _wlh_res["RemoveAllProductMessageText"] = "";
        

        window.WishListHero_setting["RemovedProductNotificationText"] = "";
        _wlh_res["RemovedProductNotificationText"] = "";
        

        window.WishListHero_setting["AddAllOutOfStockProductNotificationText"] = "";
        _wlh_res["AddAllOutOfStockProductNotificationText"] = "";
        

        window.WishListHero_setting["RemovePopupOkText"] = "";
        _wlh_res["RemovePopupOkText"] = "";
        

        window.WishListHero_setting["RemovePopup_HeaderText"] = "";
        _wlh_res["RemovePopup_HeaderText"] = "";
        

        window.WishListHero_setting["ViewWishlistText"] = "";
        _wlh_res["ViewWishlistText"] = "";
        

        window.WishListHero_setting["EmptyWishlistText"] = "";
        _wlh_res["EmptyWishlistText"] = "";
        

        window.WishListHero_setting["BuyNowButtonText"] = "";
        _wlh_res["BuyNowButtonText"] = "";
        

        window.WishListHero_setting["Wishlist_Title"] = "";
        _wlh_res["Wishlist_Title"] = "";
        

        window.WishListHero_setting["LoginPopupContent"] = "";
        _wlh_res["LoginPopupContent"] = "";
        

        window.WishListHero_setting["LoginPopupLoginBtnText"] = "";
        _wlh_res["LoginPopupLoginBtnText"] = "";
        

        window.WishListHero_setting["EnableRemoveFromWishlistAfterAddButtonText"] = "";
        _wlh_res["EnableRemoveFromWishlistAfterAddButtonText"] = "";
        

        window.WishListHero_setting["LowStockEmailSubject"] = "";
        _wlh_res["LowStockEmailSubject"] = "";
        

        window.WishListHero_setting["OnSaleEmailSubject"] = "";
        _wlh_res["OnSaleEmailSubject"] = "";
        

        window.WishListHero_setting["SharePopup_shareCopiedText"] = "";
        _wlh_res["SharePopup_shareCopiedText"] = "";
    }
    return _wlh_res;
  }
  window.WLH_reload_translations();


window.jdgmSettings={"pagination":5,"disable_web_reviews":false,"coupon_receiving_condition":"","coupon_value_type":"percentage","coupon_value_percentage":10,"coupon_value_fixed_amount":0,"coupon_discount_type":"single","coupon_tier_text_enabled":false,"coupon_tier_text_percentage":10,"coupon_tier_text_fixed_amount":0,"coupon_tier_photo_enabled":false,"coupon_tier_photo_percentage":10,"coupon_tier_photo_fixed_amount":0,"coupon_tier_video_enabled":false,"coupon_tier_video_percentage":10,"coupon_tier_video_fixed_amount":0,"enable_coupons":false,"badge_no_review_text":"No reviews","badge_n_reviews_text":"{{ n }} review/reviews","badge_star_color":"#C09488","hide_badge_preview_if_no_reviews":true,"badge_hide_text":false,"enforce_center_preview_badge":false,"widget_title":"Customer Reviews","widget_open_form_text":"Write a review","widget_close_form_text":"Cancel review","widget_refresh_page_text":"Refresh page","widget_summary_text":"Based on {{ number_of_reviews }} review/reviews","widget_no_review_text":"Be the first to write a review","widget_name_field_text":"Display name","widget_verified_name_field_text":"Verified Name (public)","widget_name_placeholder_text":"Display name","widget_required_field_error_text":"This field is required.","widget_email_field_text":"Email address","widget_verified_email_field_text":"Verified Email (private, can not be edited)","widget_email_placeholder_text":"Your email address","widget_email_field_error_text":"Please enter a valid email address.","widget_rating_field_text":"Rating","widget_review_title_field_text":"Review Title","widget_review_title_placeholder_text":"Give your review a title","widget_review_body_field_text":"Review content","widget_review_body_placeholder_text":"Start writing here...","widget_pictures_field_text":"Picture/Video (optional)","widget_submit_review_text":"Submit Review","widget_submit_verified_review_text":"Submit Verified Review","widget_submit_success_msg_with_auto_publish":"Thank you! Please refresh the page in a few moments to see your review. You can remove or edit your review by logging into \u003ca href='https://judge.me/login' target='_blank' rel='nofollow noopener'\u003eJudge.me\u003c/a\u003e","widget_submit_success_msg_no_auto_publish":"Thank you! Your review will be published as soon as it is approved by the shop admin. You can remove or edit your review by logging into \u003ca href='https://judge.me/login' target='_blank' rel='nofollow noopener'\u003eJudge.me\u003c/a\u003e","widget_show_default_reviews_out_of_total_text":"Showing {{ n_reviews_shown }} out of {{ n_reviews }} reviews.","widget_show_all_link_text":"Show all","widget_show_less_link_text":"Show less","widget_author_said_text":"{{ reviewer_name }} said:","widget_days_text":"{{ n }} days ago","widget_weeks_text":"{{ n }} week/weeks ago","widget_months_text":"{{ n }} month/months ago","widget_years_text":"{{ n }} year/years ago","widget_yesterday_text":"Yesterday","widget_today_text":"Today","widget_replied_text":"{{ shop_name }} replied:","widget_read_more_text":"Read more","widget_reviewer_name_as_initial":"","widget_rating_filter_color":"#C09488","widget_rating_filter_see_all_text":"See all reviews","widget_sorting_most_recent_text":"Most Recent","widget_sorting_highest_rating_text":"Highest Rating","widget_sorting_lowest_rating_text":"Lowest Rating","widget_sorting_with_pictures_text":"Only Pictures","widget_sorting_most_helpful_text":"Most Helpful","widget_open_question_form_text":"Ask a question","widget_reviews_subtab_text":"Reviews","widget_questions_subtab_text":"Questions","widget_question_label_text":"Question","widget_answer_label_text":"Answer","widget_question_placeholder_text":"Write your question here","widget_submit_question_text":"Submit Question","widget_question_submit_success_text":"Thank you for your question! We will notify you once it gets answered.","widget_star_color":"#C09488","verified_badge_text":"Verified","verified_badge_bg_color":"","verified_badge_text_color":"","verified_badge_placement":"left-of-reviewer-name","widget_review_max_height":4,"widget_hide_border":true,"widget_social_share":false,"widget_thumb":false,"widget_review_location_show":false,"widget_location_format":"country_iso_code","all_reviews_include_out_of_store_products":true,"all_reviews_out_of_store_text":"(out of store)","all_reviews_pagination":100,"all_reviews_product_name_prefix_text":"about","enable_review_pictures":false,"enable_question_anwser":false,"widget_theme":"carousel","review_date_format":"mm/dd/yyyy","default_sort_method":"most-recent","widget_product_reviews_subtab_text":"Product Reviews","widget_shop_reviews_subtab_text":"Shop Reviews","widget_other_products_reviews_text":"Reviews for other products","widget_store_reviews_subtab_text":"Store reviews","widget_product_variant_reference_text":"Review for","widget_no_store_reviews_text":"This store hasn't received any reviews yet","widget_web_restriction_product_reviews_text":"This product hasn't received any reviews yet","widget_no_items_text":"No items found","widget_show_more_text":"Show more","widget_write_a_store_review_text":"Write a Store Review","widget_product_and_store_reviews_text":"Product and store reviews","widget_reviews_in_collection_text":"Reviews in this collection","widget_other_languages_heading":"Reviews in Other Languages","widget_translate_review_text":"Translate review to {{ language }}","widget_translating_review_text":"Translating...","widget_show_original_translation_text":"Show original ({{ language }})","widget_translate_review_failed_text":"Review couldn't be translated.","widget_translate_review_retry_text":"Retry","widget_translate_review_try_again_later_text":"Try again later","show_product_url_for_grouped_product":false,"widget_sorting_pictures_first_text":"Pictures First","show_pictures_on_all_rev_page_mobile":false,"show_pictures_on_all_rev_page_desktop":false,"floating_tab_hide_mobile_install_preference":false,"floating_tab_button_name":"★ Reviews","floating_tab_title":"Let customers speak for us","floating_tab_button_color":"","floating_tab_button_background_color":"","floating_tab_url":"","floating_tab_url_enabled":false,"floating_tab_tab_style":"text","all_reviews_text_badge_text":"Customers rate us {{ shop.metafields.judgeme.all_reviews_rating | round: 1 }}/5 based on {{ shop.metafields.judgeme.all_reviews_count }} reviews.","all_reviews_text_badge_text_branded_style":"{{ shop.metafields.judgeme.all_reviews_rating | round: 1 }} out of 5 stars based on {{ shop.metafields.judgeme.all_reviews_count }} reviews","is_all_reviews_text_badge_a_link":false,"show_stars_for_all_reviews_text_badge":false,"all_reviews_text_badge_url":"","all_reviews_text_style":"text","all_reviews_text_color_style":"judgeme_brand_color","all_reviews_text_color":"#108474","all_reviews_text_show_jm_brand":true,"featured_carousel_show_header":true,"featured_carousel_title":"Let customers speak for us","testimonials_carousel_title":"Customers are saying","videos_carousel_title":"Real customer stories","cards_carousel_title":"Customers are saying","featured_carousel_count_text":"{{ n }} reviews","featured_carousel_add_link_to_all_reviews_page":false,"featured_carousel_url":"","featured_carousel_show_images":true,"featured_carousel_autoslide_interval":5,"featured_carousel_arrows_on_the_sides":true,"featured_carousel_height":250,"featured_carousel_width":100,"featured_carousel_image_size":0,"featured_carousel_image_height":250,"featured_carousel_arrow_color":"#F6EEEA","verified_count_badge_style":"vintage","verified_count_badge_orientation":"horizontal","verified_count_badge_color_style":"judgeme_brand_color","verified_count_badge_color":"#108474","is_verified_count_badge_a_link":false,"verified_count_badge_url":"","verified_count_badge_show_jm_brand":true,"widget_rating_preset_default":5,"widget_first_sub_tab":"product-reviews","widget_show_histogram":false,"widget_histogram_use_custom_color":true,"widget_pagination_use_custom_color":true,"widget_star_use_custom_color":true,"widget_verified_badge_use_custom_color":false,"widget_write_review_use_custom_color":false,"picture_reminder_submit_button":"Upload Pictures","enable_review_videos":false,"mute_video_by_default":false,"widget_sorting_videos_first_text":"Videos First","widget_review_pending_text":"Pending","featured_carousel_items_for_large_screen":3,"social_share_options_order":"Facebook,Twitter","remove_microdata_snippet":true,"disable_json_ld":false,"enable_json_ld_products":false,"preview_badge_show_question_text":false,"preview_badge_no_question_text":"No questions","preview_badge_n_question_text":"{{ number_of_questions }} question/questions","qa_badge_show_icon":false,"qa_badge_position":"same-row","remove_judgeme_branding":false,"widget_add_search_bar":false,"widget_search_bar_placeholder":"Search","widget_sorting_verified_only_text":"Verified only","featured_carousel_theme":"card","featured_carousel_show_rating":true,"featured_carousel_show_title":true,"featured_carousel_show_body":true,"featured_carousel_show_date":false,"featured_carousel_show_reviewer":true,"featured_carousel_show_product":false,"featured_carousel_header_background_color":"#108474","featured_carousel_header_text_color":"#ffffff","featured_carousel_name_product_separator":"reviewed","featured_carousel_full_star_background":"#C1957F","featured_carousel_empty_star_background":"#F6EEEA","featured_carousel_vertical_theme_background":"#f9fafb","featured_carousel_verified_badge_enable":false,"featured_carousel_verified_badge_color":"#108474","featured_carousel_border_style":"round","featured_carousel_review_line_length_limit":3,"featured_carousel_more_reviews_button_text":"Read more reviews","featured_carousel_view_product_button_text":"View product","all_reviews_page_load_reviews_on":"scroll","all_reviews_page_load_more_text":"Load More Reviews","disable_fb_tab_reviews":false,"enable_ajax_cdn_cache":false,"widget_advanced_speed_features":5,"widget_public_name_text":"displayed publicly like","default_reviewer_name":"John Smith","default_reviewer_name_has_non_latin":true,"widget_reviewer_anonymous":"Anonymous","medals_widget_title":"Judge.me Review Medals","medals_widget_background_color":"#f9fafb","medals_widget_position":"footer_all_pages","medals_widget_border_color":"#f9fafb","medals_widget_verified_text_position":"left","medals_widget_use_monochromatic_version":false,"medals_widget_elements_color":"#108474","show_reviewer_avatar":false,"widget_invalid_yt_video_url_error_text":"Not a YouTube video URL","widget_max_length_field_error_text":"Please enter no more than {0} characters.","widget_show_country_flag":false,"widget_show_collected_via_shop_app":true,"widget_verified_by_shop_badge_style":"light","widget_verified_by_shop_text":"Verified by Shop","widget_show_photo_gallery":false,"widget_load_with_code_splitting":true,"widget_ugc_install_preference":false,"widget_ugc_title":"Made by us, Shared by you","widget_ugc_subtitle":"Tag us to see your picture featured in our page","widget_ugc_arrows_color":"#ffffff","widget_ugc_primary_button_text":"Buy Now","widget_ugc_primary_button_background_color":"#108474","widget_ugc_primary_button_text_color":"#ffffff","widget_ugc_primary_button_border_width":"0","widget_ugc_primary_button_border_style":"none","widget_ugc_primary_button_border_color":"#108474","widget_ugc_primary_button_border_radius":"25","widget_ugc_secondary_button_text":"Load More","widget_ugc_secondary_button_background_color":"#ffffff","widget_ugc_secondary_button_text_color":"#108474","widget_ugc_secondary_button_border_width":"2","widget_ugc_secondary_button_border_style":"solid","widget_ugc_secondary_button_border_color":"#108474","widget_ugc_secondary_button_border_radius":"25","widget_ugc_reviews_button_text":"View Reviews","widget_ugc_reviews_button_background_color":"#ffffff","widget_ugc_reviews_button_text_color":"#108474","widget_ugc_reviews_button_border_width":"2","widget_ugc_reviews_button_border_style":"solid","widget_ugc_reviews_button_border_color":"#108474","widget_ugc_reviews_button_border_radius":"25","widget_ugc_reviews_button_link_to":"judgeme-reviews-page","widget_ugc_show_post_date":true,"widget_ugc_max_width":"800","widget_rating_metafield_value_type":true,"widget_primary_color":"#C09488","widget_enable_secondary_color":false,"widget_secondary_color":"#edf5f5","widget_summary_average_rating_text":"{{ average_rating }} out of 5","widget_media_grid_title":"Customer photos \u0026 videos","widget_media_grid_see_more_text":"See more","widget_round_style":true,"widget_show_product_medals":true,"widget_verified_by_judgeme_text":"Verified by Judge.me","widget_show_store_medals":true,"widget_verified_by_judgeme_text_in_store_medals":"Verified by Judge.me","widget_media_field_exceed_quantity_message":"Sorry, we can only accept {{ max_media }} for one review.","widget_media_field_exceed_limit_message":"{{ file_name }} is too large, please select a {{ media_type }} less than {{ size_limit }}MB.","widget_review_submitted_text":"Review Submitted!","widget_question_submitted_text":"Question Submitted!","widget_close_form_text_question":"Cancel","widget_write_your_answer_here_text":"Write your answer here","widget_enabled_branded_link":true,"widget_show_collected_by_judgeme":true,"widget_reviewer_name_color":"","widget_write_review_text_color":"","widget_write_review_bg_color":"#C09488","widget_collected_by_judgeme_text":"collected by Judge.me","widget_pagination_type":"standard","widget_load_more_text":"Load More","widget_load_more_color":"#F6EEEA","widget_full_review_text":"Full Review","widget_read_more_reviews_text":"Read More Reviews","widget_read_questions_text":"Read Questions","widget_questions_and_answers_text":"Questions \u0026 Answers","widget_verified_by_text":"Verified by","widget_verified_text":"Verified","widget_number_of_reviews_text":"{{ number_of_reviews }} reviews","widget_back_button_text":"Back","widget_next_button_text":"Next","widget_custom_forms_filter_button":"Filters","custom_forms_style":"horizontal","widget_show_review_information":false,"how_reviews_are_collected":"How reviews are collected?","widget_show_review_keywords":false,"widget_gdpr_statement":"How we use your data: We'll only contact you about the review you left, and only if necessary. By submitting your review, you agree to Judge.me's \u003ca href='https://judge.me/terms' target='_blank' rel='nofollow noopener'\u003eterms\u003c/a\u003e, \u003ca href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'\u003eprivacy\u003c/a\u003e and \u003ca href='https://judge.me/content-policy' target='_blank' rel='nofollow noopener'\u003econtent\u003c/a\u003e policies.","widget_multilingual_sorting_enabled":false,"widget_translate_review_content_enabled":false,"widget_translate_review_content_method":"manual","popup_widget_review_selection":"automatically_with_pictures","popup_widget_round_border_style":true,"popup_widget_show_title":true,"popup_widget_show_body":true,"popup_widget_show_reviewer":false,"popup_widget_show_product":true,"popup_widget_show_pictures":true,"popup_widget_use_review_picture":true,"popup_widget_show_on_home_page":true,"popup_widget_show_on_product_page":true,"popup_widget_show_on_collection_page":true,"popup_widget_show_on_cart_page":true,"popup_widget_position":"bottom_left","popup_widget_first_review_delay":5,"popup_widget_duration":5,"popup_widget_interval":5,"popup_widget_review_count":5,"popup_widget_hide_on_mobile":true,"review_snippet_widget_round_border_style":true,"review_snippet_widget_card_color":"#FFFFFF","review_snippet_widget_text_color":"#000000","review_snippet_widget_lighter_text_color":"#7B7B7B","review_snippet_widget_slider_arrows_background_color":"#FFFFFF","review_snippet_widget_slider_arrows_color":"#000000","review_snippet_widget_star_color":"#108474","show_product_variant":false,"all_reviews_product_variant_label_text":"Variant: ","widget_show_verified_branding":false,"widget_ai_summary_title":"Customers say","widget_ai_summary_disclaimer":"AI-powered review summary based on recent customer reviews","widget_show_ai_summary":false,"widget_show_ai_summary_bg":false,"write_review_button_visibility":"everyone","store_summary_widget_heading":"Customers rate this store","store_summary_widget_button_text":"View customer reviews","store_summary_widget_button_theme_text":"See AI reviews summary","widget_show_review_title_input":true,"redirect_reviewers_invited_via_email":"review_widget","request_store_review_after_product_review":false,"request_review_other_products_in_order":false,"review_form_color_scheme":"default","review_form_corner_style":"square","review_form_star_color":{},"review_form_text_color":"#333333","review_form_background_color":"#ffffff","review_form_field_background_color":"#fafafa","review_form_button_color":{},"review_form_button_text_color":"#ffffff","review_form_modal_overlay_color":"#000000","review_content_screen_title_text":"How would you rate this product?","review_content_introduction_text":"We would love it if you would share a bit about your experience.","store_review_form_title_text":"How would you rate this store?","store_review_form_introduction_text":"We would love it if you would share a bit about your experience.","show_review_guidance_text":true,"one_star_review_guidance_text":"Poor","five_star_review_guidance_text":"Great","customer_information_screen_title_text":"About you","customer_information_introduction_text":"Please tell us more about you.","custom_questions_screen_title_text":"Your experience in more detail","custom_questions_introduction_text":"Here are a few questions to help us understand more about your experience.","review_submitted_screen_title_text":"Thanks for your review!","review_submitted_screen_thank_you_text":"We are processing it and it will appear on the store soon.","review_submitted_screen_email_verification_text":"Please confirm your email by clicking the link we just sent you. This helps us keep reviews authentic.","confirm_email_screen_title_text":"Confirm your email","confirm_email_screen_message_text":"To help keep reviews authentic, we'll send you a secure link to continue writing your review. It only takes a moment.","check_email_screen_title_text":"Check your email","check_email_screen_message_text":"We sent you an email to {{ email }}. Click the button on the email to continue.","check_email_screen_resend_message_text":"Email resent!","check_email_resend_hint_text":"Didn't get the email? Check your spam folder or [resend the email].","verification_email_rate_limit_error_text":"You've reached the limit for review attempts on this product. Please check your inbox or try again later.","review_submitted_request_store_review_text":"Would you like to share your experience of shopping with us?","review_submitted_review_other_products_text":"Would you like to review these products?","store_review_screen_title_text":"Would you like to share your experience of shopping with us?","store_review_introduction_text":"We value your feedback and use it to improve. Please share any thoughts or suggestions you have.","reviewer_media_screen_title_picture_text":"Share a picture","reviewer_media_introduction_picture_text":"Upload a photo to support your review.","reviewer_media_screen_title_video_text":"Share a video","reviewer_media_introduction_video_text":"Upload a video to support your review.","reviewer_media_screen_title_picture_or_video_text":"Share a picture or video","reviewer_media_introduction_picture_or_video_text":"Upload a photo or video to support your review.","reviewer_media_youtube_url_text":"Paste your Youtube URL here","advanced_settings_next_step_button_text":"Next","advanced_settings_close_review_button_text":"Close","modal_write_review_flow":false,"write_review_flow_required_text":"Required","write_review_flow_privacy_message_text":"We respect your privacy.","write_review_flow_anonymous_text":"Post review as anonymous","write_review_flow_visibility_text":"This won't be visible to other customers.","write_review_flow_multiple_selection_help_text":"Select as many as you like","write_review_flow_single_selection_help_text":"Select one option","write_review_flow_required_field_error_text":"This field is required","write_review_flow_invalid_email_error_text":"Please enter a valid email address","write_review_flow_max_length_error_text":"Max. {{ max_length }} characters.","write_review_flow_media_upload_text":"\u003cb\u003eClick to upload\u003c/b\u003e or drag and drop","write_review_flow_gdpr_statement":"We'll only contact you about your review if necessary. By submitting your review, you agree to our \u003ca href='https://judge.me/terms' target='_blank' rel='nofollow noopener'\u003eterms and conditions\u003c/a\u003e and \u003ca href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'\u003eprivacy policy\u003c/a\u003e.","rating_only_reviews_enabled":false,"show_negative_reviews_help_screen":false,"new_review_flow_help_screen_rating_threshold":3,"negative_review_resolution_screen_title_text":"Tell us more","negative_review_resolution_text":"Your experience matters to us. If there were issues with your purchase, we're here to help. Feel free to reach out to us, we'd love the opportunity to make things right.","negative_review_resolution_button_text":"Contact us","negative_review_resolution_proceed_with_review_text":"Leave a review","negative_review_resolution_subject":"Issue with purchase from {{ shop_name }}.{{ order_name }}","coupon_promo_intro_any_review_text":"Write a review and get a coupon for {{ amount }} off your next purchase","coupon_promo_intro_with_photo_text":"Write a review and add a photo or video to get a coupon for {{ amount }} off your next purchase","coupon_promo_intro_with_video_text":"Write a review and add a video to get a coupon for {{ amount }} off your next purchase","coupon_promo_intro_up_to_any_review_text":"Write a review and get a coupon for up to {{ amount }} off your next purchase","coupon_promo_intro_up_to_with_photo_text":"Write a review and add a photo or video to get a coupon for up to {{ amount }} off your next purchase","coupon_promo_intro_external_text":"Write a review and get a reward for your next purchase","coupon_promo_intro_external_with_photo_text":"Write a review and add a photo or video to get a reward for your next purchase","coupon_promo_intro_external_with_video_text":"Write a review and add a video to get a reward for your next purchase","coupon_promo_media_photo_text":"Add a photo or video and get a coupon for {{ amount }} off your next purchase","coupon_promo_media_video_text":"Add a video and get a coupon for {{ amount }} off your next purchase","coupon_promo_media_external_photo_text":"Add a photo or video and get a reward for your next purchase","coupon_promo_media_external_video_text":"Add a video and get a reward for your next purchase","coupon_promo_success_text":"You've got a coupon for your next purchase at {{ shop_name }}!","coupon_promo_success_subtext":"You'll receive your coupon email within the hour.","preview_badge_collection_page_install_status":false,"widget_review_custom_css":"a {border: 0px;}\n","preview_badge_custom_css":"","preview_badge_stars_count":"5-stars","featured_carousel_custom_css":"","floating_tab_custom_css":"","all_reviews_widget_custom_css":"","medals_widget_custom_css":"","verified_badge_custom_css":"","all_reviews_text_custom_css":"","transparency_badges_collected_via_store_invite":false,"transparency_badges_from_another_provider":false,"transparency_badges_collected_from_store_visitor":false,"transparency_badges_collected_by_verified_review_provider":false,"transparency_badges_earned_reward":false,"transparency_badges_collected_via_store_invite_text":"Review collected via store invitation","transparency_badges_from_another_provider_text":"Review collected from another provider","transparency_badges_collected_from_store_visitor_text":"Review collected from a store visitor","transparency_badges_written_in_google_text":"Review written in Google","transparency_badges_written_in_etsy_text":"Review written in Etsy","transparency_badges_written_in_shop_app_text":"Review written in Shop App","transparency_badges_earned_reward_text":"Review earned a reward for future purchase","product_review_widget_per_page":10,"widget_store_review_label_text":"Review about the store","checkout_comment_extension_title_on_product_page":"Customer Comments","checkout_comment_extension_num_latest_comment_show":5,"checkout_comment_extension_format":"name_and_timestamp","checkout_comment_customer_name":"last_initial","checkout_comment_comment_notification":true,"preview_badge_collection_page_install_preference":true,"preview_badge_home_page_install_preference":false,"preview_badge_product_page_install_preference":true,"review_widget_install_preference":"","review_carousel_install_preference":false,"floating_reviews_tab_install_preference":"none","verified_reviews_count_badge_install_preference":false,"all_reviews_text_install_preference":false,"review_widget_best_location":true,"judgeme_medals_install_preference":false,"review_widget_revamp_enabled":false,"review_widget_qna_enabled":false,"review_widget_header_theme":"minimal","review_widget_widget_title_enabled":true,"review_widget_header_text_size":"medium","review_widget_header_text_weight":"regular","review_widget_average_rating_style":"compact","review_widget_bar_chart_enabled":true,"review_widget_bar_chart_type":"numbers","review_widget_bar_chart_style":"standard","review_widget_expanded_media_gallery_enabled":false,"review_widget_show_review_highlights":false,"review_widget_show_review_keywords_in_gray":false,"review_widget_reviews_section_theme":"standard","review_widget_image_style":"thumbnails","review_widget_review_image_ratio":"square","review_widget_stars_size":"medium","review_widget_verified_badge":"standard_text","review_widget_review_title_text_size":"medium","review_widget_review_text_size":"medium","review_widget_review_text_length":"medium","review_widget_number_of_columns_desktop":3,"review_widget_carousel_transition_speed":5,"review_widget_custom_questions_answers_display":"always","review_widget_card_section_size":"small","review_widget_button_text_color":"#FFFFFF","review_widget_text_color":"#000000","review_widget_lighter_text_color":"#7B7B7B","review_widget_corner_styling":"soft","review_widget_review_word_singular":"review","review_widget_review_word_plural":"reviews","review_widget_voting_label":"Helpful?","review_widget_shop_reply_label":"Reply from {{ shop_name }}:","review_widget_filters_title":"Filters","review_widget_filter_rating_title":"Rating","review_widget_filter_keyword_title":"Keyword","review_widget_clear_filters_text":"Clear filters","review_widget_expand_more_text":"More","review_widget_review_highlights_title":"Review highlights","qna_widget_question_word_singular":"Question","qna_widget_question_word_plural":"Questions","qna_widget_answer_reply_label":"Answer from {{ answerer_name }}:","qna_content_screen_title_text":"Ask a question about this product","qna_widget_question_required_field_error_text":"Please enter your question.","qna_widget_flow_gdpr_statement":"We'll only contact you about your question if necessary. By submitting your question, you agree to our \u003ca href='https://judge.me/terms' target='_blank' rel='nofollow noopener'\u003eterms and conditions\u003c/a\u003e and \u003ca href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'\u003eprivacy policy\u003c/a\u003e.","qna_widget_question_submitted_text":"Thanks for your question!","qna_widget_close_form_text_question":"Close","qna_widget_question_submit_success_text":"We’ll notify you by email when your question is answered.","all_reviews_widget_v2025_enabled":false,"all_reviews_widget_v2025_header_theme":"default","all_reviews_widget_v2025_widget_title_enabled":true,"all_reviews_widget_v2025_header_text_size":"medium","all_reviews_widget_v2025_header_text_weight":"regular","all_reviews_widget_v2025_average_rating_style":"compact","all_reviews_widget_v2025_bar_chart_enabled":true,"all_reviews_widget_v2025_bar_chart_type":"numbers","all_reviews_widget_v2025_bar_chart_style":"standard","all_reviews_widget_v2025_expanded_media_gallery_enabled":false,"all_reviews_widget_v2025_show_store_medals":true,"all_reviews_widget_v2025_show_photo_gallery":true,"all_reviews_widget_v2025_show_review_keywords":false,"all_reviews_widget_v2025_show_ai_summary":false,"all_reviews_widget_v2025_show_ai_summary_bg":false,"all_reviews_widget_v2025_show_review_highlights":false,"all_reviews_widget_v2025_show_review_keywords_in_gray":false,"all_reviews_widget_v2025_add_search_bar":false,"all_reviews_widget_v2025_default_sort_method":"most-recent","all_reviews_widget_v2025_reviews_per_page":10,"all_reviews_widget_v2025_reviews_section_theme":"default","all_reviews_widget_v2025_image_style":"thumbnails","all_reviews_widget_v2025_review_image_ratio":"square","all_reviews_widget_v2025_stars_size":"medium","all_reviews_widget_v2025_verified_badge":"standard_text","all_reviews_widget_v2025_review_title_text_size":"medium","all_reviews_widget_v2025_review_text_size":"medium","all_reviews_widget_v2025_review_text_length":"medium","all_reviews_widget_v2025_number_of_columns_desktop":3,"all_reviews_widget_v2025_carousel_transition_speed":5,"all_reviews_widget_v2025_custom_questions_answers_display":"always","all_reviews_widget_v2025_review_dates":false,"all_reviews_widget_v2025_card_section_size":"small","all_reviews_widget_v2025_show_product_variant":false,"all_reviews_widget_v2025_show_reviewer_avatar":true,"all_reviews_widget_v2025_reviewer_name_as_initial":"","all_reviews_widget_v2025_review_location_show":false,"all_reviews_widget_v2025_location_format":"","all_reviews_widget_v2025_show_country_flag":false,"all_reviews_widget_v2025_widget_thumb":false,"all_reviews_widget_v2025_verified_by_shop_badge_style":"light","all_reviews_widget_v2025_social_share":false,"all_reviews_widget_v2025_social_share_options_order":"Facebook,Twitter,LinkedIn,Pinterest","all_reviews_widget_v2025_pagination_type":"standard","all_reviews_widget_v2025_button_text_color":"#FFFFFF","all_reviews_widget_v2025_text_color":"#000000","all_reviews_widget_v2025_lighter_text_color":"#7B7B7B","all_reviews_widget_v2025_corner_styling":"soft","all_reviews_widget_v2025_title":"Customer reviews","all_reviews_widget_v2025_ai_summary_title":"Customers say about this store","all_reviews_widget_v2025_no_review_text":"Be the first to write a review","all_reviews_widget_v2025_review_highlights_title":"Review highlights","reviews_grid_widget_show_sample_reviews":false,"reviews_grid_widget_review_selection":"all","reviews_grid_widget_select_products":[],"reviews_grid_widget_show_media_only":false,"reviews_grid_widget_display_order":"media_first","reviews_grid_widget_columns_desktop":3,"reviews_grid_widget_rows_desktop":3,"reviews_grid_widget_columns_mobile":2,"reviews_grid_widget_rows_mobile":6,"reviews_grid_widget_show_stars":true,"reviews_grid_widget_show_reviewer_name":true,"reviews_grid_widget_show_review_title_on_hover_desktop":true,"reviews_grid_widget_corner_styling":"soft","reviews_grid_widget_card_spacing":"medium","reviews_grid_widget_header_text_color":"#000000","reviews_grid_widget_star_and_reviewer_name_color":"#F9F9F9","reviews_grid_widget_overlay_and_background_color":"#000000","reviews_grid_widget_content_color":"#F9F9F9","reviews_grid_widget_header_text":"From our customers","reviews_grid_widget_show_average_rating":true,"platform":"shopify","branding_url":"https://app.judge.me/reviews/stores/furlou.com","branding_text":"Powered by Judge.me","locale":"en","reply_name":"FURLOU ","widget_version":"3.0","footer":true,"autopublish":false,"review_dates":true,"enable_custom_form":false,"shop_use_review_site":true,"shop_locale":"en","enable_multi_locales_translations":false,"show_review_title_input":true,"review_verification_email_status":"always","require_verification_before_submit":false,"customer_account_validation_enabled":true,"coupon_promo_invited_eligible":true,"coupon_promo_web_eligible":false,"can_be_branded":true,"reply_name_text":"FURLOU "};


!function(e){window.jdgm=window.jdgm||{};
/* INF-1976 */
var _jdgmBlocked=function(){var raw=(window.jdgmSettings||{}).hostname_allowlist;var list=(raw==null?"":""+raw).split(/[\s,]+/).map(function(h){return h.trim().toLowerCase().replace(/\.$/,"");}).filter(function(h){return h;});if(!list.length)return false;var host=(e.location.hostname||"").toLowerCase().replace(/\.$/,"");if(/(^|\.)shopifypreview\.com$/.test(host))return false;var bare=host.replace(/^www\./,"");for(var i=0;i<list.length;i++){var en=list[i];if(en.indexOf("*.")===0){var b=en.slice(2);if(host===b||host.slice(-(b.length+1))==="."+b)return false;}else if(bare===en.replace(/^www\./,""))return false;}return true;}();
if(_jdgmBlocked){jdgm._loaderExecuted=true;jdgm._blocked=true;var _jdgmS=e.createElement("style");_jdgmS.textContent='[class^="jdgm-"],[class*=" jdgm-"]{display:none !important}';(e.head||e.documentElement).appendChild(_jdgmS);return;}
jdgm.CDN_HOST="https://cdnwidget.judge.me/",jdgm.CDN_HOST_ALT="https://cdn2.judge.me/cdn/widget_frontend/",jdgm.API_HOST="https://api.judge.me/",jdgm.CDN_BASE_URL="https://cdn.shopify.com/extensions/01a0ec75-cd34-70ff-8c10-2324df83d15e/judgeme-768/assets/",jdgm.CDN_API_HOST="https://cdn.judge.me/",
jdgm.docReady=function(d){(e.attachEvent?"complete"===e.readyState:"loading"!==e.readyState)?
setTimeout(d,0):e.addEventListener("DOMContentLoaded",d)},jdgm.loadCSS=function(d,t,o,a){
!o&&jdgm.loadCSS.requestedUrls.indexOf(d)>=0||(jdgm.loadCSS.requestedUrls.push(d),
(a=e.createElement("link")).rel="stylesheet",a.class="jdgm-stylesheet",a.media="nope!",
a.href=d,a.onload=function(){this.media="all",t&&setTimeout(t)},e.body.appendChild(a))},
jdgm.loadCSS.requestedUrls=[],jdgm.loadJS=function(e,d){var t=new XMLHttpRequest;
t.onreadystatechange=function(){4===t.readyState&&t.status>=200&&t.status<300&&(Function(t.response)(),d&&d(t.response))},
t.open("GET",e),t.onerror=function(){if(e.indexOf(jdgm.CDN_HOST)===0&&jdgm.CDN_HOST_ALT!==jdgm.CDN_HOST){var f=e.replace(jdgm.CDN_HOST,jdgm.CDN_HOST_ALT);jdgm.loadJS(f,d)}},t.send()},jdgm.docReady((function(){(window.jdgmLoadCSS||e.querySelectorAll(
".jdgm-widget, .jdgm-all-reviews-page").length>0)&&(jdgmSettings.widget_load_with_code_splitting?
parseFloat(jdgmSettings.widget_version)>=3?jdgm.loadCSS(jdgm.CDN_BASE_URL+"widget_v3_base.css"):
jdgm.loadCSS(jdgm.CDN_BASE_URL+"widget_base.css"):jdgm.loadCSS(jdgm.CDN_BASE_URL+"shopify_v2.css")
)}))}(document);



  (function() {
    var jdgmThemeFixes = {"115677364412":{"html":"","css":".jdgm-rev__title {\nfont-family: Quincy CF !important;\n}\n\n.jdgm-rev__body {\nfont-family: DM Sans !important;\n}","js":""}};
    if (!jdgmThemeFixes) return;

    // "All themes" fix: CSS and JS applied on every theme. CSS is injected
    // before the per-theme fix so the theme-specific CSS wins the cascade.
    // HTML is never applied globally (too risky).
    var allThemesFix = jdgmThemeFixes['all'];
    if (allThemesFix && allThemesFix.css) {
      var allStyleTag = document.createElement('style');
      allStyleTag.classList.add('jdgm-theme-fix-style-all');
      allStyleTag.innerHTML = allThemesFix.css;
      document.head.append(allStyleTag);
    };

    if (allThemesFix && allThemesFix.js) {
      var allScriptTag = document.createElement('script');
      allScriptTag.classList.add('jdgm-theme-fix-script-all');
      allScriptTag.innerHTML = allThemesFix.js;
      document.head.append(allScriptTag);
    };

    var thisThemeFix = jdgmThemeFixes[Shopify.theme.id];
    if (!thisThemeFix) return;

    if (thisThemeFix.html) {
      document.addEventListener("DOMContentLoaded", function() {
        var htmlDiv = document.createElement('div');
        htmlDiv.classList.add('jdgm-theme-fix-html');
        htmlDiv.innerHTML = thisThemeFix.html;
        document.body.append(htmlDiv);
      });
    };

    if (thisThemeFix.css) {
      var styleTag = document.createElement('style');
      styleTag.classList.add('jdgm-theme-fix-style');
      styleTag.innerHTML = thisThemeFix.css;
      document.head.append(styleTag);
    };

    if (thisThemeFix.js) {
      var scriptTag = document.createElement('script');
      scriptTag.classList.add('jdgm-theme-fix-script');
      scriptTag.innerHTML = thisThemeFix.js;
      document.head.append(scriptTag);
    };
  })();



  try {
    window.WishListHero_setting_theme_override = {
      
      
      
      
      
      
        HeaderFontSize : "30",
      
      
        ProductNameFontSize : "18",
      
      
        PriceFontSize : "16",
      
      t_o_f: true,
      theme_overriden_flag: true
    };
    if (typeof(window.WishListHero_setting) != "undefined" && window.WishListHero_setting) {
      window.WishListHero_setting = {
        ...window.WishListHero_setting,
        ...window.WishListHero_setting_theme_override
      };
    }
  } catch (e) {
    console.error('Error loading config', e);
  }



  (function (c, l, a, r, i, t, y) {
    c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); };
    t = l.createElement(r); t.async = 1; t.src = "https://www.clarity.ms/tag/" + i + "?ref=shopify";
    y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y);

    c.Shopify.loadFeatures([{ name: "consent-tracking-api", version: "0.1" }], error => {
      if (error) {
        console.error("Error loading Shopify features:", error);
        return;
      }

      c[a]('consentv2', {
        ad_Storage: c.Shopify.customerPrivacy.marketingAllowed() ? "granted" : "denied",
        analytics_Storage: c.Shopify.customerPrivacy.analyticsProcessingAllowed() ? "granted" : "denied",
        source: 101,
      });
    });

    l.addEventListener("visitorConsentCollected", function (e) {
      c[a]('consentv2', {
        ad_Storage: e.detail.marketingAllowed ? "granted" : "denied",
        analytics_Storage: e.detail.analyticsAllowed ? "granted" : "denied",
        source: 101,
      });
    });
  })(window, document, "clarity", "script", "t1tssionws");


(function(){if ("sendBeacon" in navigator && "performance" in window) {try {var session_token_from_headers = performance.getEntriesByType('navigation')[0].serverTiming.find(x => x.name == '_s').description;} catch {var session_token_from_headers = undefined;}var session_cookie_matches = document.cookie.match(/_shopify_s=([^;]*)/);var session_token_from_cookie = session_cookie_matches && session_cookie_matches.length === 2 ? session_cookie_matches[1] : "";var session_token = session_token_from_headers || session_token_from_cookie || "";function handle_abandonment_event(e) {var entries = performance.getEntries().filter(function(entry) {return /monorail-edge.shopifysvc.com/.test(entry.name);});if (!window.abandonment_tracked && entries.length === 0) {window.abandonment_tracked = true;var currentMs = Date.now();var navigation_start = performance.timing.navigationStart;var payload = {shop_id: 23801659472,url: window.location.href,navigation_start,duration: currentMs - navigation_start,session_token,page_type: "product"};window.navigator.sendBeacon("https://monorail-edge.shopifysvc.com/v1/produce", JSON.stringify({schema_id: "online_store_buyer_site_abandonment/1.1",payload: payload,metadata: {event_created_at_ms: currentMs,event_sent_at_ms: currentMs}}));}}window.addEventListener('pagehide', handle_abandonment_event);}}());


  window.__TREKKIE_SHIM_QUEUE = window.__TREKKIE_SHIM_QUEUE || [];


(function(){var wpmLoader=function(){"use strict";var e=/Googlebot|Storebot-Google|bingbot|Baiduspider|YandexBot|DuckDuckBot|Slurp|facebookexternalhit|Twitterbot|LinkedInBot|Applebot|AdsBot-Google|Mediapartners-Google|APIs-Google|PetalBot|SemrushBot|AhrefsBot|MJ12bot|DotBot|Acunetix|PerplexityBot|Perplexity-User/i,t=/bytedance/i;function i(){try{var e=document.cookie;if(!e||"string"!=typeof e)return;for(var t=0,i=e.split(";");t<i.length;t++){var n=i[t],r=n.indexOf("=");if(-1!==r){var o=n.slice(0,r).trim();if(o){var a=void 0;try{a=decodeURIComponent(o)}catch(e){a=o}if("_shopify_s"===a){var d=n.slice(r+1).trim();try{return decodeURIComponent(d)}catch(e){return d}}}}}return}catch(e){return}}function n(e){try{"undefined"!=typeof console&&"function"==typeof console.warn&&console.warn(e)}catch(e){}}function r(e,t){return"string"==typeof e&&e.length>0&&e.length<=t?e:void 0}function o(e){var t;switch(null==(t=null==e?void 0:e.navigation)?void 0:t.type){case 0:return"navigate";case 1:return"reload";case 2:return"back_forward";default:return}}function a(){var e,t,i;try{var n=null==(i=null==(t=null==(e=self.ShopifyAnalytics)?void 0:e.lib)?void 0:t.trekkie)?void 0:i.state;return"awaiting-consent"===n||"initialized"===n?n:void 0}catch(e){return}}return function(d,s,u,l){var c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:{};try{var p=c.trekkieShim;!0!==p&&"true"!==p||null!=window.__TREKKIE_SHIM_QUEUE||(window.__TREKKIE_SHIM_QUEUE=[])}catch(e){}var f,v,h,y,g=(v=(f={modern:/Edge?\/(1{2}[4-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Firefox\/(1{2}[4-9]|1[2-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Chrom(ium|e)\/(9{2}|\d{3,})\.\d+(\.\d+|)|(Maci|X1{2}).+ Version\/(15\.\d+|(1[6-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(9{2}|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(15[._]\d+|(1[6-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Android:?[ /-](14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Android.+Firefox\/(15\d|1[6-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|SamsungBrowser\/([2-9]\d|\d{3,})\.\d+/,legacy:/Edge?\/(1[6-9]|[2-9]\d|\d{3,})\.\d+(\.\d+|)|Firefox\/(5[4-9]|[6-9]\d|\d{3,})\.\d+(\.\d+|)|Chrom(ium|e)\/(5[1-9]|[6-9]\d|\d{3,})\.\d+(\.\d+|)([\d.]+$|.*Safari\/(?![\d.]+ Edge\/[\d.]+$))|(Maci|X1{2}).+ Version\/(10\.\d+|(1[1-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( \(\w+\)|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(3[89]|[4-9]\d|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(10[._]\d+|(1[1-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Android:?[ /-](14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Mobile Safari.+OPR\/([89]\d|\d{3,})\.\d+\.\d+|Android.+Firefox\/(15\d|1[6-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(14[89]|1[5-9]\d|[2-9]\d{2}|\d{4,})\.\d+(\.\d+|)|Android.+(UC? ?Browser|UCWEB|U3)[ /]?(15\.([5-9]|\d{2,})|(1[6-9]|[2-9]\d|\d{3,})\.\d+)\.\d+|SamsungBrowser\/(5\.\d+|([6-9]|\d{2,})\.\d+)|Android.+MQ{2}Browser\/(14(\.(9|\d{2,})|)|(1[5-9]|[2-9]\d|\d{3,})(\.\d+|))(\.\d+|)|K[Aa][Ii]OS\/(3\.\d+|([4-9]|\d{2,})\.\d+)(\.\d+|)/}).modern,h=f.legacy,(y=navigator.userAgent).match(e)?"bot":y.match(v)?"modern":y.match(h)?"legacy":y.match(t)?"bot":"unknown"),m=function(e){var t,i,n=r(e,128);try{var a=window.performance,d=null==(t=null==a?void 0:a.getEntriesByType)?void 0:t.call(a,"navigation")[0];if(!d)return{requestId:n,navigationType:o(a)};var s="type"in d?r(d.type,64):void 0,u="serverTiming"in d&&Array.isArray(d.serverTiming)?d.serverTiming:[];return{requestId:null!=n?n:r(null==(i=u.find(function(e){return"requestID"===e.name}))?void 0:i.description,128),navigationType:s}}catch(e){return{requestId:n}}}(c.requestId),w=function(e){var t=e.version,r=e.browserTarget,o=e.surface,a=e.shopId,d=e.monorailEndpoint,s=window.location.href;return{emit:function(e){var u=e.status,l=e.errorMsg,c=e.failureReason,p=e.useKeepaliveFallback,f=void 0!==p&&p,v=e.navigationType,h=e.pagehidePersisted,y=e.requestId,g=e.trekkieState;if(d){var m,w;try{var b=(new Date).getTime();m=JSON.stringify({metadata:{event_sent_at_ms:b},events:[{schema_id:"web_pixels_manager_load/3.3",payload:{version:t,bundle_target:r,page_url:s,status:u,surface:o,error_msg:l,failure_reason:c,navigation_type:v,pagehide_persisted:h,request_id:y,trekkie_state:g,shop_id:a,visit_token:i()},metadata:{event_created_at_ms:b}}]})}catch(e){return}try{if("function"==typeof window.navigator.sendBeacon&&-1===(w=window.navigator.userAgent).indexOf("iPhone; CPU iPhone OS 12_")&&-1===w.indexOf("iPad; CPU OS 12_")&&-1===w.indexOf("iPod touch; CPU iPhone OS 12_")&&window.navigator.sendBeacon.bind(window.navigator)(d,m))return}catch(e){}if(f)try{"function"==typeof window.fetch&&window.fetch(d,{method:"POST",headers:{"Content-Type":"text/plain"},body:m,keepalive:!0}).catch(function(){})}catch(e){}else try{var _=new XMLHttpRequest;_.open("POST",d,!0),_.setRequestHeader("Content-Type","text/plain"),_.send(m)}catch(e){n("[Web Pixels Manager] Got an unhandled error while logging to Monorail.")}}else n("[Web Pixels Manager] No Monorail endpoint provided, skipping logging.")}}}({version:u,browserTarget:g,surface:d.surface,shopId:d.shopId,monorailEndpoint:d.monorailEndpoint});if(Boolean(null==(_=null==(b=window.Shopify)?void 0:b.analytics)?void 0:_.replayQueue))w.emit({status:"setup-skipped",errorMsg:"replay queue already initialized."});else{var b,_;w.emit({status:"setup-started"}),window.Shopify=window.Shopify||{};var S=window.Shopify;S.analytics=S.analytics||{};var P=S.analytics;P.replayQueue=[],P.publish=function(e,t,i){return P.replayQueue.push([e,t,i]),!0};try{self.performance.mark("wpm:start")}catch(e){}var k,C="modern"===g?"modern":"legacy",E=(null!=l?l:{modern:"",legacy:""})[C],I=[(k={baseUrl:s,hashVersion:u,buildTarget:C}).baseUrl,"/wpm","/b",k.hashVersion,"modern"===k.buildTarget?"m":"l",".js"].join(""),O=!1,T=!1;try{c.browserTarget=g,function(){O=!0;try{window.addEventListener("pagehide",M)}catch(e){O=!1}}(),R(function(){try{R(x)}catch(e){D(e)}}),w.emit({status:"loading",requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()})}catch(e){D(e)}}function U(){var e;if(q(),!function(){var e,t;return Boolean(null==(t=null==(e=window.Shopify)?void 0:e.analytics)?void 0:t.initialized)}()){var t,i,n;try{if("function"!=typeof(null==(e=window.webPixelsManager)?void 0:e.init))return void A();if(!(null!==(n=i=t=window.webPixelsManager.init(d))&&"function"!=typeof n&&Object(n)===n&&"publish"in i&&"function"==typeof i.publish&&"publishCustomEvent"in i&&"function"==typeof i.publishCustomEvent&&"visitor"in i&&"function"==typeof i.visitor))return void A()}catch(e){return void A(e)}var r=window.Shopify.analytics;r.replayQueue.forEach(function(e){var i=e[0],n=e[1],r=e[2];t.publishCustomEvent(i,n,r)}),r.replayQueue=[],r.publish=t.publishCustomEvent,r.visitor=t.visitor,r.initialized=!0}}function A(e){B("manager_api_unavailable",void 0===e?void 0:Q(e))}function x(){B("script_load_failed","".concat(I," has failed to load"))}function B(e,t){T||(T=!0,q(),w.emit({status:"failed",errorMsg:t,failureReason:e,requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()}))}function M(e){O&&(q(),w.emit({status:"pagehide-while-loading",useKeepaliveFallback:!0,pagehidePersisted:e.persisted,requestId:m.requestId,navigationType:m.navigationType,trekkieState:a()}))}function q(){O=!1;try{window.removeEventListener("pagehide",M)}catch(e){}}function R(e){var t;!function(e){var t=e.src,i=e.async,n=void 0===i||i,r=e.onload,o=e.onerror,a=e.sri,d=e.scriptDataAttributes,s=void 0===d?{}:d,u=document.createElement("script"),l=document.querySelector("head"),c=document.querySelector("body");if(u.async=n,u.src=t,a&&(u.integrity=a,u.crossOrigin="anonymous"),s)for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))try{u.dataset[p]=String(s[p])}catch(e){}if(r&&u.addEventListener("load",r),o&&u.addEventListener("error",o),l)l.appendChild(u);else{if(!c)throw new Error("Did not find a head or body element to append the script");c.appendChild(u)}}({src:I,async:!0,onload:U,onerror:e,sri:(t=E,"string"==typeof t&&/^sha384-[A-Za-z0-9+/=]+$/.test(t)?E:""),scriptDataAttributes:c})}function D(e){B("script_append_failed",Q(e))}function Q(e){return e instanceof Error?e.message:"Unknown error"}}}();wpmLoader({shopId: 23801659472,storefrontBaseUrl: "https://furlou.com",extensionsBaseUrl: "https://extensions.shopifycdn.com/cdn/shopifycloud/web-pixels-manager",monorailEndpoint: "https://furlou.com/.well-known/shopify/monorail/unstable/produce_batch",surface: "storefront-renderer",enabledBetaFlags: ["16072cab","8450a54b","7ee89bf1"],webPixelsConfigList: [{"id":"1418821820","configuration":"{\"accountID\":\"W6UEiw\",\"webPixelConfig\":\"eyJlbmFibGVBZGRlZFRvQ2FydEV2ZW50cyI6IHRydWV9\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"c63c5b72c8d77be5f2d27d14c081da38","type":"APP","apiClientId":123074,"privacyPurposes":["ANALYTICS","MARKETING"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"1315733692","configuration":"{\"projectId\":\"t1tssionws\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"d8a2bb2ccbb513dc8e8b6937f4b8033e","type":"APP","apiClientId":240074326017,"privacyPurposes":[],"capabilities":["advanced_dom_events"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_personal_data"],"dataSharingControls":["share_all_events"]},"dataSharingState":"unrestricted"},{"id":"1294729404","configuration":"{\"account_ID\":\"1004956\",\"google_analytics_tracking_tag\":\"1\",\"measurement_id\":\"2\",\"api_secret\":\"3\",\"shop_settings\":\"{\\\"custom_pixel_script\\\":\\\"https:\\\\\\\/\\\\\\\/storage.googleapis.com\\\\\\\/gsf-scripts\\\\\\\/custom-pixels\\\\\\\/furlou.js\\\"}\"}","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"dbf16afd37d7bda963909dd4e886232e","type":"APP","apiClientId":1558137,"privacyPurposes":[],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"unrestricted"},{"id":"931168444","configuration":"{\"webPixelName\":\"Judge.me\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"8acc938b1a30dc7624e304493ca567d7","type":"APP","apiClientId":683015,"privacyPurposes":["ANALYTICS"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"unrestricted"},{"id":"731742396","configuration":"{\"shopId\":\"239413\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"2eedfe5ca9c7d4954f200bfa1ffb380d","type":"APP","apiClientId":2328352,"privacyPurposes":["MARKETING"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"unrestricted","enabledFlags":["9a3ed68a"]},{"id":"492175548","configuration":"{\"config\":\"{\\\"google_tag_ids\\\":[\\\"AW-16735976060\\\",\\\"GT-TBW6GMG\\\",\\\"G-ZGQJY3K2VB\\\"],\\\"target_country\\\":\\\"US\\\",\\\"gtag_events\\\":[{\\\"type\\\":\\\"begin_checkout\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/4hMwCLjugNwZEPz0qqw-\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"search\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/lnesCLLugNwZEPz0qqw-\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"view_item\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/fzSYCK_ugNwZEPz0qqw-\\\",\\\"MC-8DE763SVW9\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"purchase\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/3BOVCKnugNwZEPz0qqw-\\\",\\\"MC-8DE763SVW9\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"page_view\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/aDqRCKzugNwZEPz0qqw-\\\",\\\"MC-8DE763SVW9\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"add_payment_info\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/lqovCLvugNwZEPz0qqw-\\\",\\\"G-ZGQJY3K2VB\\\"]},{\\\"type\\\":\\\"add_to_cart\\\",\\\"action_label\\\":[\\\"AW-16735976060\\\/epxyCLXugNwZEPz0qqw-\\\",\\\"G-ZGQJY3K2VB\\\"]}],\\\"enable_monitoring_mode\\\":false}\"}","eventPayloadVersion":"v1","runtimeContext":"OPEN","scriptVersion":"a3321ca85cf5aaf6b57585fcd8d67b3a","type":"APP","apiClientId":1780363,"privacyPurposes":[],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"227311804","configuration":"{\"pixel_id\":\"2348777492099673\",\"pixel_type\":\"facebook_pixel\",\"metaapp_system_user_token\":\"-\"}","eventPayloadVersion":"v1","runtimeContext":"OPEN","scriptVersion":"96420dbe9ea96c426a1b7f364f977719","type":"APP","apiClientId":2329312,"privacyPurposes":["ANALYTICS","MARKETING","SALE_OF_DATA"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized","enabledFlags":["9a3ed68a"]},{"id":"56033468","configuration":"{\"tagID\":\"2614474351859\"}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"7ae565e198624b39e0856d352b9a6b4c","type":"APP","apiClientId":3009811,"privacyPurposes":["ANALYTICS","MARKETING","SALE_OF_DATA"],"dataSharingAdjustments":{"protectedCustomerApprovalScopes":["read_customer_address","read_customer_email","read_customer_name","read_customer_personal_data","read_customer_phone"],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized"},{"id":"65339580","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"1","type":"CUSTOM","privacyPurposes":["ANALYTICS"],"name":"Google Analytics tag (migrated)","dataSharingAdjustments":{"protectedCustomerApprovalScopes":[],"dataSharingControls":["share_all_events"]},"dataSharingState":"optimized"},{"id":"shopify-app-pixel","configuration":"{}","eventPayloadVersion":"v1","runtimeContext":"STRICT","scriptVersion":"0530","apiClientId":"shopify-pixel","type":"APP","privacyPurposes":["ANALYTICS","MARKETING"]},{"id":"shopify-custom-pixel","eventPayloadVersion":"v1","runtimeContext":"LAX","scriptVersion":"0530","apiClientId":"shopify-pixel","type":"CUSTOM","privacyPurposes":["ANALYTICS","MARKETING"]}],isMerchantRequest: false,initData: {"shop":{"name":"FURLOU ","paymentSettings":{"currencyCode":"USD"},"myshopifyDomain":"furlou.myshopify.com","countryCode":"US","storefrontUrl":"https:\/\/furlou.com"},"customer":null,"cart":null,"checkout":null,"productVariants":[{"price":{"amount":42.0,"currencyCode":"USD"},"product":{"title":"'Blue' - Hands Free Braided Leash","vendor":"FURLOU","id":"7986635505852","untranslatedTitle":"'Blue' - Hands Free Braided Leash","url":"\/products\/blue-hands-free-braided-leash","type":"Hands Free Braided Leash"},"id":"42845496049852","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509"},"sku":"HFBL-BLU-U","title":"Default Title","untranslatedTitle":"Default Title"}],"products":[{"id":"7986635505852","handle":"blue-hands-free-braided-leash","isCollective":false,"title":"'Blue' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Blue' - Hands Free Braided Leash","url":"\/products\/blue-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42845496049852","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-BLU-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8481241923772","handle":"terracotta-hands-free-braided-leash","isCollective":false,"title":"'Terracotta' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Terracotta' - Hands Free Braided Leash","url":"\/products\/terracotta-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"43994297991356","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/10.png?v=1750444609"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-TER-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8898233729212","handle":"clay-hands-free-braided-leash","isCollective":false,"title":"'Clay' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Clay' - Hands Free Braided Leash","url":"\/products\/clay-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"44927023579324","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/05.png?v=1750445383"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-CLA-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"9054753095868","handle":"bordeaux-hands-free-braided-leash","isCollective":false,"title":"'Bordeaux' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Bordeaux' - Hands Free Braided Leash","url":"\/products\/bordeaux-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"45416343077052","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/08_3_48ea2cf4-9c50-43f9-9375-2c2995558bc1.jpg?v=1762789450"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-BOR-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7884215419068","handle":"brown-hands-free-braided-leash","isCollective":false,"title":"'Brown' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Brown' - Hands Free Braided Leash","url":"\/products\/brown-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42709008253116","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/09.png?v=1750446049"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-BRO-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8898245722300","handle":"sand-hands-free-braided-leash","isCollective":false,"title":"'Sand' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Sand' - Hands Free Braided Leash","url":"\/products\/sand-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"44927131058364","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/03.png?v=1750446292"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-SAN-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7884215615676","handle":"tan-hands-free-braided-leash","isCollective":false,"title":"'Tan' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Tan' - Hands Free Braided Leash","url":"\/products\/tan-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42709008613564","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/12_e956d300-6a0d-4fd7-a796-58f00f3e6073.png?v=1750446575"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-TAN-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8898284126396","handle":"yellow-hands-free-braided-leash","isCollective":false,"title":"'Yellow' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Yellow' - Hands Free Braided Leash","url":"\/products\/yellow-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"44927210062012","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/11.png?v=1750446781"},"price":{"amount":21.0,"currencyCode":"USD"},"sku":"HFBL-YEL-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8093638525116","handle":"rose-hands-free-braided-leash","isCollective":false,"title":"'Powder Rose' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Powder Rose' - Hands Free Braided Leash","url":"\/products\/rose-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"43053629374652","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/13.png?v=1750447042"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-ROS-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7986635604156","handle":"pink-hands-free-braided-leash","isCollective":false,"title":"'Pink' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Pink' - Hands Free Braided Leash","url":"\/products\/pink-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42845496574140","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/14.png?v=1750447801"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-PIN-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7884215976124","handle":"lavender-hands-free-braided-leash","isCollective":false,"title":"'Lavender' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Lavender' - Hands Free Braided Leash","url":"\/products\/lavender-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42709010317500","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/02.png?v=1750448182"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-LAV-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"8898295201980","handle":"lilac-hands-free-braided-leash","isCollective":false,"title":"'Lilac' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Lilac' - Hands Free Braided Leash","url":"\/products\/lilac-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"44927258689724","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/04_b2e1aee0-cb6e-4395-bd2a-e9b472dddf4d.png?v=1750448385"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-LIL-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7986635440316","handle":"green-hands-free-braided-leash","isCollective":false,"title":"'Green' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Green' - Hands Free Braided Leash","url":"\/products\/green-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42845495820476","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/06.png?v=1750448717"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-GRE-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"7884201525436","handle":"black-hands-free-braided-leash","isCollective":false,"title":"'Black' - Hands Free Braided Leash","type":"Hands Free Braided Leash","untranslatedTitle":"'Black' - Hands Free Braided Leash","url":"\/products\/black-hands-free-braided-leash","vendor":"FURLOU","remoteShopId":null,"variants":[{"id":"42708974010556","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/01.png?v=1750448920"},"price":{"amount":42.0,"currencyCode":"USD"},"sku":"HFBL-BLA-U","title":"Default Title","untranslatedTitle":"Default Title"}]},{"id":"9120540491964","handle":"blue-collar-set","isCollective":false,"title":"Blue Collar Set","type":null,"untranslatedTitle":"Blue Collar Set","url":"\/products\/blue-collar-set","vendor":"FURLOU ","remoteShopId":null,"variants":[{"id":"45673542549692","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/Bluecollarset.jpg?v=1776764129"},"price":{"amount":70.55,"currencyCode":"USD"},"sku":"COSE-BLU-S","title":"SMALL","untranslatedTitle":"SMALL"}]},{"id":"9120561594556","handle":"blue-harness-set","isCollective":false,"title":"Blue Harness Set","type":null,"untranslatedTitle":"Blue Harness Set","url":"\/products\/blue-harness-set","vendor":"FURLOU ","remoteShopId":null,"variants":[{"id":"45673663201468","image":{"src":"\/\/furlou.com\/cdn\/shop\/files\/BLUEHARNESSSET.jpg?v=1776764329"},"price":{"amount":82.45,"currencyCode":"USD"},"sku":"HASE-BLU-XS","title":"EXTRA SMALL","untranslatedTitle":"EXTRA SMALL"}]}],"purchasingCompany":null},},"https://furlou.com/cdn","a5bf51cfwabd6c495p49b74ff1maa529d2b",{"modern":"","legacy":""},{"trekkieShim":true,"agentContext":true,"apiClientId":"580111","facebookCapiEnabled":"true","themeId":"152991400124","themeStoreId":"868","themePublished":"true","eventMetadataId":"d0a51081-ae30-4268-83ac-55114660fdec","pageType":"product","resourceId":"7986635505852","shopId":"23801659472","storefrontBaseUrl":"https:\/\/furlou.com","extensionBaseUrl":"https:\/\/extensions.shopifycdn.com\/cdn\/shopifycloud\/web-pixels-manager","surface":"storefront-renderer","enabledBetaFlags":"[\"16072cab\", \"8450a54b\", \"7ee89bf1\"]","isMerchantRequest":"false","hashVersion":"a5bf51cfwabd6c495p49b74ff1maa529d2b","publish":"custom","events":"[[\"page_viewed\",{}],[\"product_viewed\",{\"productVariant\":{\"price\":{\"amount\":42.0,\"currencyCode\":\"USD\"},\"product\":{\"title\":\"'Blue' - Hands Free Braided Leash\",\"vendor\":\"FURLOU\",\"id\":\"7986635505852\",\"untranslatedTitle\":\"'Blue' - Hands Free Braided Leash\",\"url\":\"\/products\/blue-hands-free-braided-leash\",\"type\":\"Hands Free Braided Leash\"},\"id\":\"42845496049852\",\"image\":{\"src\":\"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509\"},\"sku\":\"HFBL-BLU-U\",\"title\":\"Default Title\",\"untranslatedTitle\":\"Default Title\"}}]]"});})();


  window.ShopifyAnalytics = window.ShopifyAnalytics || {};
  window.ShopifyAnalytics.meta = window.ShopifyAnalytics.meta || {};
  window.ShopifyAnalytics.meta.currency = 'USD';
  var meta = {"product":{"id":7986635505852,"gid":"gid:\/\/shopify\/Product\/7986635505852","vendor":"FURLOU","type":"Hands Free Braided Leash","handle":"blue-hands-free-braided-leash","variants":[{"id":42845496049852,"price":4200,"name":"'Blue' - Hands Free Braided Leash","public_title":null,"sku":"HFBL-BLU-U"}],"remote":false},"page":{"pageType":"product","resourceType":"product","resourceId":7986635505852,"requestId":"1e27b5df-c5d7-429f-a7cd-863ecf8ca9a3-1790694775"}};
  for (var attr in meta) {
    window.ShopifyAnalytics.meta[attr] = meta[attr];
  }



  (function () {
    var customDocumentWrite = function(content) {
      var jquery = null;

      if (window.jQuery) {
        jquery = window.jQuery;
      } else if (window.Checkout && window.Checkout.$) {
        jquery = window.Checkout.$;
      }

      if (jquery) {
        jquery('body').append(content);
      }
    };

    var hasLoggedConversion = function(token) {
      if (token) {
        return document.cookie.indexOf('loggedConversion=' + token) !== -1;
      }
      return false;
    }

    var setCookieIfConversion = function(token) {
      if (token) {
        var twoMonthsFromNow = new Date(Date.now());
        twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

        document.cookie = 'loggedConversion=' + token + '; expires=' + twoMonthsFromNow;
      }
    }

    var trekkie = window.ShopifyAnalytics.lib = window.trekkie = window.trekkie || [];
    window.ShopifyAnalytics.lib.trekkie = window.trekkie;
    if (trekkie.integrations) {
      return;
    }
    trekkie.methods = [
      'identify',
      'page',
      'ready',
      'track',
      'trackForm',
      'trackLink'
    ];
    trekkie.factory = function(method) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        trekkie.push(args);
        if (method == 'track' || method == 'page') {
          var pageUrl;
          try {
            pageUrl = window.location.href;
          } catch (e) {}
          var pageReferrer;
          try {
            pageReferrer = document.referrer;
          } catch (e) {}
          try {
            if (window.__TREKKIE_SHIM_QUEUE == null) {
              window.__TREKKIE_SHIM_QUEUE = [];
            }
            window.__TREKKIE_SHIM_QUEUE.push({
              from: 'trekkie-stub',
              method: method,
              args: args.slice(1),
              pageContext: {
                url: pageUrl,
                referrer: pageReferrer
              }
            });
          } catch (e) {
            // no-op
          }
        }
        return trekkie;
      };
    };
    for (var i = 0; i < trekkie.methods.length; i++) {
      var key = trekkie.methods[i];
      trekkie[key] = trekkie.factory(key);
    }
    trekkie.load = function(config) {
      trekkie.config = config || {};
      trekkie.config.initialDocumentCookie = document.cookie;
      var first = document.getElementsByTagName('script')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.onerror = function(e) {
  var scriptFallback = document.createElement('script');
  scriptFallback.type = 'text/javascript';
  scriptFallback.onerror = function(error) {
          var Monorail = {
      produce: function produce(monorailDomain, schemaId, payload) {
        var currentMs = new Date().getTime();
        var event = {
          schema_id: schemaId,
          payload: payload,
          metadata: {
            event_created_at_ms: currentMs,
            event_sent_at_ms: currentMs
          }
        };
        return Monorail.sendRequest("https://" + monorailDomain + "/v1/produce", JSON.stringify(event));
      },
      sendRequest: function sendRequest(endpointUrl, payload) {
        // Try the sendBeacon API
        if (window && window.navigator && typeof window.navigator.sendBeacon === 'function' && typeof window.Blob === 'function' && !Monorail.isIos12()) {
          var blobData = new window.Blob([payload], {
            type: 'text/plain'
          });

          if (window.navigator.sendBeacon(endpointUrl, blobData)) {
            return true;
          } // sendBeacon was not successful

        } // XHR beacon

        var xhr = new XMLHttpRequest();

        try {
          xhr.open('POST', endpointUrl);
          xhr.setRequestHeader('Content-Type', 'text/plain');
          xhr.send(payload);
        } catch (e) {
          console.log(e);
        }

        return false;
      },
      isIos12: function isIos12() {
        return window.navigator.userAgent.lastIndexOf('iPhone; CPU iPhone OS 12_') !== -1 || window.navigator.userAgent.lastIndexOf('iPad; CPU OS 12_') !== -1;
      }
    };
    Monorail.produce('monorail-edge.shopifysvc.com',
      'trekkie_storefront_load_errors/1.1',
      {shop_id: 23801659472,
      theme_id: 152991400124,
      app_name: "storefront",
      context_url: window.location.href,
      source_url: "//furlou.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js"});

  };
  scriptFallback.async = true;
  scriptFallback.src = '//furlou.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js';
  first.parentNode.insertBefore(scriptFallback, first);
};
script.async = true;
script.src = '//furlou.com/cdn/s/trekkie.storefront.f1ba865b3fecd812ad617f74ac079261075e9edb.min.js';
first.parentNode.insertBefore(script, first);

    };
    trekkie.load(
      {"Trekkie":{"appName":"storefront","development":false,"defaultAttributes":{"shopId":23801659472,"isMerchantRequest":null,"themeId":152991400124,"themeCityHash":"13978750730336824894","contentLanguage":"en","currency":"USD","eventMetadataId":"d0a51081-ae30-4268-83ac-55114660fdec"},"isServerSideCookieWritingEnabled":true,"monorailRegion":"shop_domain","enabledBetaFlags":["764d78cb","8450a54b","7ee89bf1"]},"Session Attribution":{},"S2S":{"facebookCapiEnabled":true,"source":"trekkie-storefront-renderer","apiClientId":580111}}
    );

    var loaded = false;
    trekkie.ready(function() {
      if (loaded) return;
      loaded = true;

      window.ShopifyAnalytics.lib = window.trekkie;

      var originalDocumentWrite = document.write;
      document.write = customDocumentWrite;
      try { window.ShopifyAnalytics.merchantGoogleAnalytics.call(this); } catch(error) {};
      document.write = originalDocumentWrite;

      var match = window.location.pathname.match(/checkouts\/(.+)\/(thank_you|post_purchase)/)
      var token = match? match[1]: undefined;
      if (!hasLoggedConversion(token)) {
        setCookieIfConversion(token);
        window.ShopifyAnalytics.lib.track("Viewed Product",{"currency":"USD","variantId":42845496049852,"productId":7986635505852,"productGid":"gid:\/\/shopify\/Product\/7986635505852","name":"'Blue' - Hands Free Braided Leash","price":"42.00","sku":"HFBL-BLU-U","brand":"FURLOU","variant":null,"category":"Hands Free Braided Leash","nonInteraction":true,"remote":false,"available":true},undefined,undefined,{"shopifyEmitted":true});
      }
    });

    window.ShopifyAnalytics.lib.page(null,{"pageType":"product","resourceType":"product","resourceId":7986635505852,"requestId":"1e27b5df-c5d7-429f-a7cd-863ecf8ca9a3-1790694775","shopifyEmitted":true});

    var eventsListenerScript = document.createElement('script');
    eventsListenerScript.async = true;
    eventsListenerScript.src = "//furlou.com/cdn/shopifycloud/storefront/assets/shop_events_listener-4e26a9ce.js";
    document.getElementsByTagName('head')[0].appendChild(eventsListenerScript);
})();


  if (!window.ga || (window.ga && typeof window.ga !== 'function')) {
    window.ga = function ga() {
      (window.ga.q = window.ga.q || []).push(arguments);
      if (window.Shopify && window.Shopify.analytics && typeof window.Shopify.analytics.publish === 'function') {
        window.Shopify.analytics.publish("ga_stub_called", {}, {sendTo: "google_osp_migration"});
      }
      console.error("Shopify's Google Analytics stub called with:", Array.from(arguments), "\nSee https://help.shopify.com/manual/promoting-marketing/pixels/pixel-migration#google for more information.");
    };
    if (window.Shopify && window.Shopify.analytics && typeof window.Shopify.analytics.publish === 'function') {
      window.Shopify.analytics.publish("ga_stub_initialized", {}, {sendTo: "google_osp_migration"});
    }
  }


{}


  {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "FURLOU ",
    
      "logo": "https:\/\/pupsystores-glitch.github.io\/PUPSYWEB\/images\/logo_PUPSY_optimized.png",
    
    "sameAs": [
      "",
      "https:\/\/www.facebook.com\/furlou\/",
      "https:\/\/instagram.com\/furlou_",
      "",
      "",
      "https:\/\/www.tiktok.com\/@furlou",
      "",
      "",
      "",
      "",
      ""
    ],
    "url": "https:\/\/furlou.com"
  }



(function () {
  var dialog = document.getElementById("Popup--sections--20657885577404__overlay_text_promo_jYJi3W");
  if (!dialog) return;

  function setCookie(name, value, days) {
    document.cookie = name + "=" + value + "; path=/; max-age=" + (days * 86400);
  }

  function closeAndPersist() {
    setCookie(dialog.dataset.cookieName, dialog.dataset.cookieValue, 2); // <-- aqui tens os 2 dias
    try { dialog.close(); } catch (err) {}
  }

  // 1) Se chegaste ao site com ?popup_closed=1, fecha e grava cookie (neste domínio)
  try {
    var urlNow = new URL(window.location.href);
    if (urlNow.searchParams.get("popup_closed") === "1") {
      closeAndPersist();

      // opcional: limpa o parâmetro do URL para não ficar feio
      urlNow.searchParams.delete("popup_closed");
      window.history.replaceState({}, "", urlNow.toString());
    }
  } catch (e) {}

  // 2) Ao clicar num botão, grava cookie e redireciona com popup_closed=1 (para o outro domínio não abrir)
  dialog.querySelectorAll(".popup-promo__buttons a[data-popup-close]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = link.getAttribute("href");
      if (!href || href === "#") return;

      e.preventDefault();

      closeAndPersist();

      // adiciona o parâmetro ao destino (funciona mesmo para .com/.eu)
      try {
        var dest = new URL(href);
        dest.searchParams.set("popup_closed", "1");
        window.location.href = dest.toString();
      } catch (err) {
        // fallback (se o href não for URL válido)
        var joiner = href.indexOf("?") > -1 ? "&" : "?";
        window.location.href = href + joiner + "popup_closed=1";
      }
    });
  });
})();



      {"id":7986635505852,"title":"'Blue' - Hands Free Braided Leash","handle":"blue-hands-free-braided-leash","description":"\u003cp\u003eBecause you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e","published_at":"2023-11-04T07:04:06-07:00","created_at":"2023-07-21T17:30:08-07:00","vendor":"FURLOU","type":"Hands Free Braided Leash","tags":["Braided Leash","Hands Free Braided Leash"],"price":4200,"price_min":4200,"price_max":4200,"available":true,"price_varies":false,"compare_at_price":null,"compare_at_price_min":0,"compare_at_price_max":0,"compare_at_price_varies":false,"variants":[{"id":42845496049852,"title":"Default Title","option1":"Default Title","option2":null,"option3":null,"sku":"HFBL-BLU-U","requires_shipping":true,"taxable":true,"featured_image":null,"available":true,"name":"'Blue' - Hands Free Braided Leash","public_title":null,"options":["Default Title"],"price":4200,"weight":170,"compare_at_price":null,"inventory_management":"shopify","barcode":"644321884491","requires_selling_plan":false,"selling_plan_allocations":[],"quantity_rule":{"min":1,"max":null,"increment":1}}],"images":["\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920","\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877"],"featured_image":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","options":["Title"],"media":[{"alt":"'Blue' - Hands Free Braided Leash - FURLOU ","id":34611135021244,"position":1,"preview_image":{"aspect_ratio":1.0,"height":4000,"width":4000,"src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509"},"aspect_ratio":1.0,"height":4000,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","width":4000},{"alt":"'Blue' - Hands Free Braided Leash - FURLOU ","id":34611134791868,"position":2,"preview_image":{"aspect_ratio":1.0,"height":3287,"width":3287,"src":"\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920"},"aspect_ratio":1.0,"height":3287,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920","width":3287},{"alt":"'Moss Green' - Hands Free Braided Leash - FURLOU ","id":39510436249788,"position":3,"preview_image":{"aspect_ratio":1.0,"height":3024,"width":3024,"src":"\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877"},"aspect_ratio":1.0,"height":3024,"media_type":"image","src":"\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877","width":3024}],"requires_selling_plan":false,"selling_plan_groups":[],"content":"\u003cp\u003eBecause you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\u003c\/p\u003e\n\u003cul\u003e\u003c\/ul\u003e"}
    


  {
    "@context": "http://schema.org/",
    "@type": "Product",
     "@id" : "/products/blue-hands-free-braided-leash#product",
    "name": "'Blue' - Hands Free Braided Leash",
    "url": "https:\/\/furlou.com\/products\/blue-hands-free-braided-leash",
    "image": [
        "https:\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509\u0026width=1920"
      ],
    "description": "Because you’ve got enough to carry. This leash gets it. Your coffee, your phone, your keys — and now, you don’t need to juggle one more thing. Our hands-free braided leash keeps your pup close while giving you your hands back. Adjust it to fit your waist, shoulder, or clip it on as a regular leash. Easy, breezy, and built for everyday life - and yes, it’s our most loved product for a reason.\n","sku": "HFBL-BLU-U","brand": {
      "@type": "Organization",
      "name": "FURLOU"
    },
    "offers": [{
          "@type" : "Offer","sku": "HFBL-BLU-U","gtin12": 644321884491,"availability" : "http://schema.org/InStock",
          "price" : 42.0,
          "priceCurrency" : "USD",
          "priceValidUntil": "2026-09-30",
          "url" : "https:\/\/furlou.com\/products\/blue-hands-free-braided-leash?variant=42845496049852"
        }
]
  }



  var _ReStockConfig = window._ReStockConfig || {};

  _ReStockConfig.templateName = "product";
  _ReStockConfig.isB2BCustomer = null;
  _ReStockConfig.currentLocationId = null;
  _ReStockConfig.moneyFormat = "${{amount}}";_ReStockConfig.marketHandle = "deliver-duties-unpaid-985cccc5-bd3a-4fee-95e8-7bc72b54b8ca";
  _ReStockConfig.marketId = 37179031740;_ReStockConfig.product = {
      selected_or_first_available_variant_id : 42845496049852,
      id : 7986635505852,
      title : "'Blue' - Hands Free Braided Leash",
      handle : "blue-hands-free-braided-leash",
      available : true,
      featured_image : "\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509",
      images : ["\/\/furlou.com\/cdn\/shop\/files\/07_20523851-9f04-4d41-aead-57f109083668.png?v=1750448509","\/\/furlou.com\/cdn\/shop\/files\/07.png?v=1750448920","\/\/furlou.com\/cdn\/shop\/files\/IMG_9523.jpg?v=1777994877"],
      price : 4200,
      compare_at_price: null,
      vendor : "FURLOU",
      selling_plan_groups: [],
      variants: [{
         id: 42845496049852,
         title: "Default Title",
         available: true,
         featured_image: null,
         name: null,
         price: 4200,
         compare_at_price: null,
         inventory_management: "shopify",
         sku: "HFBL-BLU-U",
         quantity: 24,
      },]
  };let metafieldConfigData = null;metafieldConfigData = {"ask_for_gdpr_consent_enabled":false,"not_selectable_variants_enabled":false,"pre_order_products_enabled":false,"ui_style":{"notify_me_styles":[{"wrapper":null,"page":"LANDING_PAGES","inline_display_mode":"NOT_DISPLAYED","show_floating_button":false,"inject_in_parent_of_wrapper":false,"inject_to_all_wrappers":false,"inject_to_all_elements_of_each_wrapper":false,"handle_rerenders":true,"prepend_to_wrapper":false,"custom_styles":null,"enable_variant_listener_on_cards":false,"product_card_selector":null,"displayed_product_resolution_enabled":false,"variant_picker_selector":null,"selected_anchor_selector":null,"general_card_placement_enabled":false,"card_scoped_wrapper_enabled":false,"variant_group_availability_enabled":false,"quick_view_widget_lifecycle_enabled":false,"style_mode":"SMART"},{"wrapper":[".product-card--style1"],"page":"COLLECTION_PAGE","inline_display_mode":"NOT_DISPLAYED","show_floating_button":false,"inject_in_parent_of_wrapper":false,"inject_to_all_wrappers":false,"inject_to_all_elements_of_each_wrapper":false,"handle_rerenders":true,"prepend_to_wrapper":false,"custom_styles":{"color":"","showIcon":false,"iconColor":"","borderSize":"","borderColor":"","borderRadius":"","backgroundColor":""},"enable_variant_listener_on_cards":false,"product_card_selector":null,"displayed_product_resolution_enabled":false,"variant_picker_selector":null,"selected_anchor_selector":null,"general_card_placement_enabled":false,"card_scoped_wrapper_enabled":false,"variant_group_availability_enabled":false,"quick_view_widget_lifecycle_enabled":false,"style_mode":"SMART"}],"product_page_notify_me_style":{"wrapper":null,"support_wrapper":["product-form form"],"css_selector_from_theme":null,"inline_display_mode":"BUTTON","show_floating_button":false,"hide_buy_it_now_button":false,"inject_in_parent_of_wrapper":false,"inject_to_all_wrappers":false,"handle_rerenders":true,"prepend_to_wrapper":false,"css_selector":"","css_selector_by_support":"","custom_styles":{"color":"ffffff","showIcon":false,"iconColor":"","borderSize":"","borderColor":"ffffff","borderRadius":"","backgroundColor":"caa58c"},"custom_variant_listener":{"element":null,"property":null,"is_dataset_property":false},"use_add_to_cart_button_selector":false,"style_mode":"SMART"},"subscription_form_style":{"custom_styles":{"color":"ffffff","borderSize":"","borderColor":"ffffff","borderRadius":"","backgroundColor":"caa58c"},"style_mode":"MANUAL","name_field_is_visible":false,"name_field_is_required":false,"email_field_is_required":false,"phone_field_is_required":false,"whatsapp_field_is_required":false,"quantity_field_is_visible":false,"quantity_max_value":10},"button_classes":["btn","btn--medium","btn--solid","btn--secondary"],"global_raw_css":".COLLECTION_PAGE-notify-button {\r\nfont-family: var(--g-font-2);\r\nfont-weight: 600;\r\nfont-size: 15px;\r\nbackground-color: #F6EEE9;\r\n color: white;\r\n}","product_page_raw_css":".notifyButtonStyle {\r\n  background-color: #C1957F !important;\r\n}","after_subscribe_message_styles":{"toastColor":"fff","toastBackgroundColor":"0cd4a6"}},"ui_contents":[{"notify_me_contents":[{"page":"LANDING_PAGES","button_text":"NOTIFY ME WHEN BACK IN STOCK","not_selectable_variants_button_text":"Out of stock? Click here"},{"page":"COLLECTION_PAGE","button_text":"NOTIFY ME WHEN BACK IN STOCK","not_selectable_variants_button_text":"Out of stock? Click here"},{"page":"PRODUCT_PAGE","button_text":"NOTIFY ME WHEN IN STOCK","not_selectable_variants_button_text":"Out of stock? Click here"}],"subscription_form_content":{"form_title":"Notify me via:","email_input_placeholder":"Email Address ...","email_input_below_text":"Don’t worry! We hate spam as much as you do.","email_label":"Email","full_name_label":"Name","full_name_placeholder":"Full name ...","push_label":"Push notification","sms_label":"Sms","sms_input_placeholder":"1234567890","whatsapp_label":"Whatsapp","whatsapp_input_placeholder":"Whatsapp Number ...","empty_name_error_message":"Name is required.","name_length_error_message":"Name is too long.","invalid_email_error_message":"Your email address is not valid.","empty_email_error_message":"Email is required.","invalid_phone_number_error_message":"Your phone number is not valid.","empty_phone_number_error_message":"Phone number is required.","no_channels_selected_error_message":"You need to subscribe to one of the channels.","button_text":"Notify Me When Available","add_to_contacts_checkbox_text":"Notify me about other news or offers too","privacy_policy_text":"I have read and agree to the {{privacy_policy_url_text}}.","privacy_policy_url_text":"privacy policy","privacy_policy_url":"","privacy_policy_error_message":"You must accept our privacy policy","after_subscribe_message_text":"We will notify you when the item is available","already_subscribed_message_text":"You already have subscribed for this item","push_is_not_allowed_message_text":"You didn\\'t allow this site to send you push notifications. To receive back-in-stock notification from this shop.","style_mode":"SMART","quantity_label":"Quantity"},"language":"en"},{"notify_me_contents":[{"page":"PRODUCT_PAGE","button_text":"Benachrichtige mich","not_selectable_variants_button_text":"Ausverkauft? Klicke hier"},{"page":"COLLECTION_PAGE","button_text":"Benachrichtige mich","not_selectable_variants_button_text":"Ausverkauft? Klicke hier"},{"page":"LANDING_PAGES","button_text":"Benachrichtige mich","not_selectable_variants_button_text":"Ausverkauft? Klicke hier"}],"subscription_form_content":{"form_title":"Benachrichtigen Sie mich über:","email_input_placeholder":"E-Mail-Addresse ...","email_input_below_text":"Mach dir keine Sorgen!Wir hassen Spam genauso wie Sie.","email_label":"Email","full_name_label":"Name","full_name_placeholder":"Full name ...","push_label":"Push-Benachrichtigung","sms_label":"SMS","sms_input_placeholder":"Telefonnummer ...","whatsapp_label":"Whatsapp","whatsapp_input_placeholder":"Whatsapp Number ...","empty_name_error_message":"Name is required.","name_length_error_message":"Name is too long.","invalid_email_error_message":"Ihre E -Mail -Adresse ist nicht gültig.","empty_email_error_message":"Email is required.","invalid_phone_number_error_message":"Ihre Telefonnummer ist nicht gültig.","empty_phone_number_error_message":"Phone number is required.","no_channels_selected_error_message":"You need to subscribe to one of the channels.","button_text":"Benachrichtige mich, wenn es verfügbar ist","add_to_contacts_checkbox_text":"Benachrichtigen Sie mich auch über andere Nachrichten oder Angebote","privacy_policy_text":"I have read and agree to the {{privacy_policy_url_text}}.","privacy_policy_url_text":"privacy policy","privacy_policy_url":"","privacy_policy_error_message":"You must accept our privacy policy","after_subscribe_message_text":"Wir werden Sie benachrichtigen, wenn der Artikel verfügbar ist","already_subscribed_message_text":"Sie haben bereits für diesen Artikel abonniert","push_is_not_allowed_message_text":"Sie haben diese Website nicht erlaubt, Ihnen Push -Benachrichtigungen zu senden.Back-in-in-Stand-Benachrichtigung aus diesem Laden zu erhalten.","style_mode":"SMART","quantity_label":"Quantity"},"language":"de"},{"notify_me_contents":[{"page":"PRODUCT_PAGE","button_text":"Breng mij op de hoogte","not_selectable_variants_button_text":"Uitverkocht? Klik hier"},{"page":"COLLECTION_PAGE","button_text":"Breng mij op de hoogte","not_selectable_variants_button_text":"Uitverkocht? Klik hier"},{"page":"LANDING_PAGES","button_text":"Breng mij op de hoogte","not_selectable_variants_button_text":"Uitverkocht? Klik hier"}],"subscription_form_content":{"form_title":"Stel me op via:","email_input_placeholder":"E-mailadres ...","email_input_below_text":"Maak je geen zorgen!We haten spam net zo veel als jij.","email_label":"E -mail","full_name_label":"Name","full_name_placeholder":"Full name ...","push_label":"Push notificatie","sms_label":"sms","sms_input_placeholder":"Telefoonnummer ...","whatsapp_label":"Whatsapp","whatsapp_input_placeholder":"Whatsapp Number ...","empty_name_error_message":"Name is required.","name_length_error_message":"Name is too long.","invalid_email_error_message":"Uw e -mailadres is niet geldig.","empty_email_error_message":"Email is required.","invalid_phone_number_error_message":"Uw telefoonnummer is niet geldig.","empty_phone_number_error_message":"Phone number is required.","no_channels_selected_error_message":"You need to subscribe to one of the channels.","button_text":"Stel me op de hoogte wanneer beschikbaar","add_to_contacts_checkbox_text":"Stel me op de hoogte van ander nieuws of aanbiedingen","privacy_policy_text":"I have read and agree to the {{privacy_policy_url_text}}.","privacy_policy_url_text":"privacy policy","privacy_policy_url":"","privacy_policy_error_message":"You must accept our privacy policy","after_subscribe_message_text":"We zullen u op de hoogte stellen wanneer het item beschikbaar is","already_subscribed_message_text":"U hebt al geabonneerd op dit item","push_is_not_allowed_message_text":"U hebt deze site niet toegestaan om u pushmeldingen te sturen.Om back-in-stock melding van deze winkel te ontvangen.","style_mode":"SMART","quantity_label":"Quantity"},"language":"nl"},{"notify_me_contents":[{"page":"PRODUCT_PAGE","button_text":"Prévenez-moi","not_selectable_variants_button_text":"Rupture de stock?Cliquez ici"},{"page":"COLLECTION_PAGE","button_text":"Prévenez-moi","not_selectable_variants_button_text":"Rupture de stock?Cliquez ici"},{"page":"LANDING_PAGES","button_text":"Prévenez-moi","not_selectable_variants_button_text":"Rupture de stock?Cliquez ici"}],"subscription_form_content":{"form_title":"Me notifier via:","email_input_placeholder":"Adresse e-mail ...","email_input_below_text":"Ne vous inquiétez pas!Nous détestons le spam autant que vous.","email_label":"E-mail","full_name_label":"Name","full_name_placeholder":"Full name ...","push_label":"Notification push","sms_label":"SMS","sms_input_placeholder":"Numéro de téléphone ...","whatsapp_label":"Whatsapp","whatsapp_input_placeholder":"Whatsapp Number ...","empty_name_error_message":"Name is required.","name_length_error_message":"Name is too long.","invalid_email_error_message":"Votre adresse e-mail n'est pas valide.","empty_email_error_message":"Email is required.","invalid_phone_number_error_message":"Votre numéro de téléphone n'est pas valide.","empty_phone_number_error_message":"Phone number is required.","no_channels_selected_error_message":"You need to subscribe to one of the channels.","button_text":"Informez-moi lorsqu'il est disponible","add_to_contacts_checkbox_text":"Me notifiez aussi d'autres nouvelles ou offres","privacy_policy_text":"I have read and agree to the {{privacy_policy_url_text}}.","privacy_policy_url_text":"privacy policy","privacy_policy_url":"","privacy_policy_error_message":"You must accept our privacy policy","after_subscribe_message_text":"Nous vous informerons lorsque l'article sera disponible","already_subscribed_message_text":"Vous vous êtes déjà abonné à cet article","push_is_not_allowed_message_text":"Vous n'avez pas permis à ce site de vous envoyer des notifications push.Pour recevoir une notification en stock de cette boutique.","style_mode":"SMART","quantity_label":"Quantity"},"language":"fr"},{"notify_me_contents":[{"page":"PRODUCT_PAGE","button_text":"Me avise","not_selectable_variants_button_text":"Fora de estoque?Clique aqui"},{"page":"COLLECTION_PAGE","button_text":"Me avise","not_selectable_variants_button_text":"Fora de estoque?Clique aqui"},{"page":"LANDING_PAGES","button_text":"Me avise","not_selectable_variants_button_text":"Fora de estoque?Clique aqui"}],"subscription_form_content":{"form_title":"Notifique -me via:","email_input_placeholder":"Endereço de email ...","email_input_below_text":"Não se preocupe!Odiamos spam tanto quanto você.","email_label":"E-mail","full_name_label":"Name","full_name_placeholder":"Full name ...","push_label":"Notificação de empurrar","sms_label":"SMS","sms_input_placeholder":"Número de telefone ...","whatsapp_label":"Whatsapp","whatsapp_input_placeholder":"Whatsapp Number ...","empty_name_error_message":"Name is required.","name_length_error_message":"Name is too long.","invalid_email_error_message":"Seu endereço de e -mail não é válido.","empty_email_error_message":"Email is required.","invalid_phone_number_error_message":"Seu número de telefone não é válido.","empty_phone_number_error_message":"Phone number is required.","no_channels_selected_error_message":"You need to subscribe to one of the channels.","button_text":"Notifique -me quando disponível","add_to_contacts_checkbox_text":"Notifique -me sobre outras notícias ou ofertas também","privacy_policy_text":"I have read and agree to the {{privacy_policy_url_text}}.","privacy_policy_url_text":"privacy policy","privacy_policy_url":"","privacy_policy_error_message":"You must accept our privacy policy","after_subscribe_message_text":"Nós o notificaremos quando o item estiver disponível","already_subscribed_message_text":"Você já se inscreveu neste item","push_is_not_allowed_message_text":"Você não permitiu que este site enviasse notificações push.Para receber uma notificação de volta nesta loja.","style_mode":"SMART","quantity_label":"Quantity"},"language":"pt-PT"}],"default_language":"en","shop_id":6043,"app_enabled":true,"base_url":"https://api.notify-me.app","excluded_from_back_in_stock_variants":[],"included_in_back_in_stock_variants":[],"has_contact_integration":false,"ask_for_contact_integration_is_hidden":false,"privacy_policy_is_hidden":true,"disable_branding_permission":true,"is_email_hidden":false,"is_sms_hidden":false,"is_push_hidden":true,"is_whatsapp_hidden":true,"collection_page_show_button_when_any_variant_is_out_of_stock":false,"home_page_show_button_when_any_variant_is_out_of_stock":false,"subscription_limit_reached":false,"is_back_in_stock_active":true,"back_in_stock_product_selection_mode":"ALL","low_stock":{"excluded_variants":[],"is_service_active":true,"widget_settings":{"show_mode":"ALL","inventory_threshold":1},"product_page":{"is_elements_shown":false,"ui_contents":{"de":{"description":"Nur noch {{remaining_quantity}} Artikel auf Lager!"},"en":{"description":"Only {{remaining_quantity}} items left in stock!"},"fr":{"description":"Il ne reste que {{remaining_quantity}} articles en stock !"},"nl":{"description":"Er zijn nog maar {{remaining_quantity}} items op voorraad!"},"pt-PT":{"description":"Restam apenas {{remaining_quantity}} itens em estoque!"}},"style_mode":"SMART","widget":{"custom_styles":{"show_icon":true,"icon_color":"EE442E","text_color":"EE442E"},"wrapper_by_support":null,"inject_to_all_wrappers":false},"inline_button_placements":[]},"collection_page":{"is_elements_shown":false,"ui_contents":{"de":{"description":"Nur noch {{remaining_quantity}} Artikel auf Lager!"},"en":{"description":"Only {{remaining_quantity}} items left in stock!"},"fr":{"description":"Il ne reste que {{remaining_quantity}} articles en stock !"},"nl":{"description":"Er zijn nog maar {{remaining_quantity}} items op voorraad!"},"pt-PT":{"description":"Restam apenas {{remaining_quantity}} itens em estoque!"}},"style_mode":"SMART","widget":{"custom_styles":{"show_icon":true,"icon_color":"EE442E","text_color":"EE442E"},"wrapper_by_support":null,"inject_to_all_wrappers":false},"inline_button_placements":[]},"landing_page":{"is_elements_shown":false,"ui_contents":{"de":{"description":"Nur noch {{remaining_quantity}} Artikel auf Lager!"},"en":{"description":"Only {{remaining_quantity}} items left in stock!"},"fr":{"description":"Il ne reste que {{remaining_quantity}} articles en stock !"},"nl":{"description":"Er zijn nog maar {{remaining_quantity}} items op voorraad!"},"pt-PT":{"description":"Restam apenas {{remaining_quantity}} itens em estoque!"}},"style_mode":"SMART","widget":{"custom_styles":{"show_icon":true,"icon_color":"EE442E","text_color":"EE442E"},"wrapper_by_support":null,"inject_to_all_wrappers":false},"inline_button_placements":[]}},"is_suspended":false,"default_country_code":null};let metafieldPreOrderData = null;metafieldPreOrderData = {"product_page":{"ui_styles":{"is_active":false,"replace_with_add_to_cart_button":true,"hide_buy_it_now_button":false,"button":{"custom_styles":null,"is_visible":true},"price":{"custom_styles":null,"format":"{symbol}{price}","is_hidden":false},"badge":{"custom_styles":{"text_color":"000","border_radius":10,"background_color":"e4e5e7"},"is_hidden":false},"description":{"is_hidden":false},"style_mode":"SMART"},"ui_contents":{"en":{"badge_text":"Pre-order","widget_description":"Product will be available soon!","btn_text":"Pre-order now","soon_available_text":"Coming soon","billing_full_payment_text":"Full payment at checkout","billing_due_now_label":"Due now","billing_due_later_label":"Due later on"},"de":{"badge_text":"Vorbestellen","widget_description":"Das Produkt ist bald verfügbar!","btn_text":"jetzt vorbestellen","soon_available_text":"Coming soon","billing_full_payment_text":"Full payment at checkout","billing_due_now_label":"Due now","billing_due_later_label":"Due later on"},"nl":{"badge_text":"Voorafgaande bestelling","widget_description":"Het product zal binnenkort beschikbaar zijn!","btn_text":"Bestel nu vooraf","soon_available_text":"Coming soon","billing_full_payment_text":"Full payment at checkout","billing_due_now_label":"Due now","billing_due_later_label":"Due later on"},"fr":{"badge_text":"Pré-commander","widget_description":"Le produit sera bientôt disponible !","btn_text":"Pré commandez maintenant","soon_available_text":"Coming soon","billing_full_payment_text":"Full payment at checkout","billing_due_now_label":"Due now","billing_due_later_label":"Due later on"},"pt-PT":{"badge_text":"Pedido antecipado","widget_description":"Produto estará disponível em breve!","btn_text":"Reserve agora","soon_available_text":"Coming soon","billing_full_payment_text":"Full payment at checkout","billing_due_now_label":"Due now","billing_due_later_label":"Due later on"}},"elements_selectors":{"button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"price":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"description":{"wrapper_by_support":null},"inject_to_all_wrappers":false}},"collection_page":{"ui_styles":{"is_active":false,"button":{"custom_styles":null,"is_visible":true},"badge":{"custom_styles":{"text_color":"000","border_radius":10,"background_color":"e4e5e7","discount_text_color":"000"},"is_visible":false,"position":"TOP_RIGHT"},"style_mode":"SMART"},"ui_contents":{"en":{"btn_text":"Pre-order now","badge_text":"Pre-order"},"de":{"btn_text":"jetzt vorbestellen","badge_text":"Pre-order"},"nl":{"btn_text":"Bestel nu vooraf","badge_text":"Pre-order"},"fr":{"btn_text":"Pré commandez maintenant","badge_text":"Pre-order"},"pt-PT":{"btn_text":"Reserve agora","badge_text":"Pre-order"}},"elements_selectors":{"button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"badge_parent":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"price":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null,"format":"{symbol}{price}","is_hidden":false},"quick_view_button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"quick_view_section":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"quick_view_section_add_to_cart_button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"inject_to_all_wrappers":false},"enable_variant_listener_on_cards":false},"landing_page":{"ui_styles":{"is_active":false,"button":{"custom_styles":null,"is_visible":true},"badge":{"custom_styles":{"text_color":"000","border_radius":10,"background_color":"e4e5e7","discount_text_color":"000"},"is_visible":false,"position":"TOP_RIGHT"},"style_mode":"SMART"},"ui_contents":{"en":{"btn_text":"Pre-order now","badge_text":"Pre-order"},"de":{"btn_text":"jetzt vorbestellen","badge_text":"Pre-order"},"nl":{"btn_text":"Bestel nu vooraf","badge_text":"Pre-order"},"fr":{"btn_text":"Pré commandez maintenant","badge_text":"Pre-order"},"pt-PT":{"btn_text":"Reserve agora","badge_text":"Pre-order"}},"elements_selectors":{"button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"badge_parent":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"price":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null,"format":"{symbol}{price}","is_hidden":false},"quick_view_button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"quick_view_section":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"quick_view_section_add_to_cart_button":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"inject_to_all_wrappers":false},"enable_variant_listener_on_cards":false},"limit_reached":false,"variant_ids":[],"is_selling_plan_removed_by_support":false,"selling_plans_settings":{},"selling_plans_billing_settings":{},"selling_plan_id_to_market_ids":{},"selling_plan_id_to_variant_ids":{},"is_service_active":true,"override_cart_requests":true,"excluded_catalogs_products":[],"excluded_catalogs_collections":[],"excluded_company_locations":[],"description_availability_config":{},"mixed_cart_alert":{"show_mixed_cart_alert":false,"is_active":false,"ui_styles":{"show_icon":true,"show_title":true,"show_body":true,"style_mode":"SMART","custom_css":"","custom_styles":{"color":"000000","iconColor":"FFB300","borderColor":"FFB300","borderRadius":8,"backgroundColor":"FFF8E1"}},"elements_selectors":{"cart_page":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null},"cart_drawer":{"css_selector":null,"css_selector_by_support":null,"css_selector_from_theme":null}},"ui_contents":{"de":{"title":"Shipping Notice","body":"Your order contains items with different delivery dates."},"en":{"title":"Shipping Notice","body":"Your order contains items with different delivery dates."},"fr":{"title":"Shipping Notice","body":"Your order contains items with different delivery dates."},"nl":{"title":"Shipping Notice","body":"Your order contains items with different delivery dates."},"pt-PT":{"title":"Shipping Notice","body":"Your order contains items with different delivery dates."}}}};let metafieldWishlistData = undefined;metafieldWishlistData = {"is_service_active":false,"is_guest_mode_enabled":true,"wishlist_buttons":{"product_page":{"is_visible":true,"style_mode":"SMART","custom_styles":null,"inject_to_all_wrappers":false,"icon":"heart","inline_button_placements":[]},"collection_page":{"is_visible":false,"custom_styles":null,"icon":"","position":"","mode":"","button_placements":[]},"landing_page":{"is_visible":false,"custom_styles":null,"icon":"","position":"","mode":"","button_placements":[]}},"limit_reached":false,"ui_contents":{"en":{"id":4076,"add_to_wishlist_button_label":"Add to wishlist","remove_from_wishlist_button_label":"It’s in wishlist","list_access_button_label":"Wishlist","list_title":"Wishlist","list_add_all_to_cart_button_label":"Add all to cart","product_card_add_to_cart_button_label":"Add to cart","product_card_out_of_stock_button_label":"Out of stock","empty_list_description":"You didn't like any products yet!","empty_list_explore_button_label":"Explore store","add_to_cart_toast_message":"Added to your cart","login_modal_button_label":"Login","login_modal_description":"Log in to your account to add products to your wishlist and view your previously saved items.","login_modal_title":"Login required"},"fr":{"id":4084,"add_to_wishlist_button_label":"Ajouter à la liste de souhaits","remove_from_wishlist_button_label":"C'est dans la liste de souhaits","list_access_button_label":"Liste de souhaits","list_title":"Liste de souhaits","list_add_all_to_cart_button_label":"Ajouter tout au panier","product_card_add_to_cart_button_label":"Ajouter au panier","product_card_out_of_stock_button_label":"En rupture de stock","empty_list_description":"Vous n'avez pas encore aimé aucun produit !","empty_list_explore_button_label":"Explorer le magasin","add_to_cart_toast_message":"Ajouté à votre panier","login_modal_button_label":"Se connecter","login_modal_description":"Connectez-vous à votre compte pour ajouter des produits à votre liste de souhaits et afficher vos articles précédemment enregistrés.","login_modal_title":"Connexion requise"},"pt-PT":{"id":4092,"add_to_wishlist_button_label":"Adicionar à lista de desejos","remove_from_wishlist_button_label":"Está na lista de desejos","list_access_button_label":"Lista de desejos","list_title":"Lista de desejos","list_add_all_to_cart_button_label":"Adicionar tudo ao carrinho","product_card_add_to_cart_button_label":"Adicionar ao carrinho","product_card_out_of_stock_button_label":"Fora de estoque","empty_list_description":"Você ainda não gostou de nenhum produto!","empty_list_explore_button_label":"Explorar loja","add_to_cart_toast_message":"Adicionado ao seu carrinho","login_modal_button_label":"Conecte-se","login_modal_description":"Entre na sua conta para adicionar produtos à sua lista de desejos e visualizar os itens salvos anteriormente.","login_modal_title":"Login necessário"}},"access_button":{"custom_styles":null,"icon":"heart","position":"bottom-left","hide_floating_button":false,"inline_button_placements":[]},"drawer":{"custom_styles":null,"position":"left"},"add_to_cart_message":{"custom_styles":null,"position":"bottom-right"},"updated_at":1766767544};let metafieldFlagsData = null;metafieldFlagsData = {};_ReStockConfig._metafields = {
    sdkConfig: metafieldConfigData,
    preOrderConfig: metafieldPreOrderData,
    wishlistConfig: metafieldWishlistData,
    featureFlags: metafieldFlagsData
  };



(function (window) {
  try {
    if (window.__nmPreorderEarlyGuard) return;

    let cfg = null;
    const metafields = window._ReStockConfig?._metafields;
    if (metafields?.preOrderConfig && typeof metafields.preOrderConfig === 'object') {
      cfg = metafields.preOrderConfig;
    }

    let wrappersInstalled = false;

    window.__nmPreorderEarlyGuard = {
      v: 1,
      active: true,
      setConfig: function (nextConfig) {
        if (!nextConfig || typeof nextConfig !== 'object') return;
        cfg = nextConfig;
        if (cfg.override_cart_requests === true) installWrappers();
      }
    };

    function isGuardActive() {
      return window.__nmPreorderEarlyGuard?.active === true;
    }

    function isCartAddUrl(url) {
      try {
        const parsed = new URL(String(url), window.document.baseURI);
        return /(?:^|\/)cart\/add(?:\.js(?:on)?)?$/.test(parsed.pathname);
      } catch (error) {
        return false;
      }
    }

    function isPageActive() {
      const template = window._ReStockConfig?.templateName;
      let pageConfig = null;
      if (template === 'product') {
        pageConfig = cfg.product_page;
      } else if (template === 'collection' || template === 'list-collections' || template === 'search' || template === 'page') {
        pageConfig = cfg.collection_page;
      } else if (template === 'index') {
        pageConfig = cfg.landing_page;
      }
      return pageConfig?.ui_styles?.is_active === true;
    }

    function shouldEnrich() {
      if (!cfg) return false;
      if (cfg.override_cart_requests !== true) return false;
      if (cfg.is_service_active !== true) return false;
      if (cfg.limit_reached === true) return false;
      if (window._ReStockConfig?.isB2BCustomer) return false;
      return isPageActive();
    }

    function isPlanVisibleInMarket(planId) {
      const planToMarkets = cfg.selling_plan_id_to_market_ids;
      if (!planToMarkets) return true;
      const allowedMarketIds = planToMarkets[planId];
      if (!allowedMarketIds || allowedMarketIds.length === 0) return true;
      const marketId = window._ReStockConfig?.marketId;
      if (marketId == null) return true;
      return allowedMarketIds.includes(Number(marketId));
    }

    function findSellingPlanId(variantId) {
      const planToVariants = cfg.selling_plan_id_to_variant_ids;
      if (!planToVariants) return null;
      for (const planId of Object.keys(planToVariants)) {
        const variantIds = planToVariants[planId];
        if (variantIds && variantIds.includes(variantId) && isPlanVisibleInMarket(planId)) return planId;
      }
      return null;
    }

    function localizedContents() {
      const contents = cfg.product_page?.ui_contents;
      if (!contents || typeof contents !== 'object') return {};
      return contents[shopLanguage()] || contents['en'] || Object.values(contents)[0] || {};
    }

    function shopLanguage() {
      const locale = window.Shopify?.locale;
      if (locale) return locale;
      const documentLanguage = window.document?.documentElement?.lang;
      if (documentLanguage && documentLanguage !== 'null') return documentLanguage;
      return null;
    }

    function formatDate(date) {
      return date.toISOString().split('T')[0];
    }

    function toFiniteNumber(value) {
      if (typeof value === 'number') return Number.isFinite(value) ? value : null;
      if (typeof value === 'string') {
        const parsed = parseFloat(value);
        return Number.isFinite(parsed) ? parsed : null;
      }
      return null;
    }

    function clamp(value, min, max) {
      return Math.min(max, Math.max(min, value));
    }

    function availabilityDateText(planId) {
      const settings = cfg.description_availability_config?.[planId];
      if (!settings) return '';
      if (settings.type === 'SOON') return localizedContents().soon_available_text || '';
      if (settings.type === 'SPECIFIC_DATE') {
        const parsed = new Date(settings.config.date);
        return isNaN(parsed.getTime()) ? '' : formatDate(parsed);
      }
      if (settings.type === 'RELATIVE_DATE') {
        const days = typeof settings.config.days === 'string' ? parseInt(settings.config.days, 10) : settings.config.days;
        if (isNaN(days)) return '';
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return formatDate(futureDate);
      }
      return '';
    }

    function inlineVariantPrice(variantId) {
      const variants = window._ReStockConfig?.product?.variants;
      if (!Array.isArray(variants)) return null;
      const variant = variants.find(function (candidate) {
        return Number(candidate?.id) === variantId;
      });
      if (!variant) return null;
      return variant.price ? variant.price / 100 : 0;
    }

    function finalPriceForPlan(price, planId) {
      const adjustment = cfg.selling_plans_settings?.[planId];
      if (!adjustment?.has_discount) return price;
      if (adjustment.value_type === 'percentage') return price * (1 - adjustment.value / 100);
      if (adjustment.value_type === 'fixed_amount') return price - adjustment.value * (window.Shopify?.currency?.rate ?? 1);
      return price;
    }

    function formatMoneyIntl(price) {
      const currency = window.Shopify?.currency?.active || 'USD';
      const locale = window.Shopify?.locale || 'en-US';
      try {
        return new Intl.NumberFormat(locale, { style: 'currency', currency: currency }).format(price);
      } catch (error) {
        return currency + ' ' + price.toFixed(2);
      }
    }

    const AMOUNT_PLACEHOLDER = /\{\{\s*(\w+)\s*\}\}/;

    function delimit(cents, precision, thousands, decimal) {
      const parts = (cents / 100).toFixed(precision).split('.');
      const grouped = parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + thousands);
      return parts[1] ? grouped + (decimal || '.') + parts[1] : grouped;
    }

    const AMOUNT_FORMATTERS = new Map([
      ['amount', function (cents) { return delimit(cents, 2, ','); }],
      ['amount_no_decimals', function (cents) { return delimit(cents, 0, ','); }],
      ['amount_with_comma_separator', function (cents) { return delimit(cents, 2, '.', ','); }],
      ['amount_no_decimals_with_comma_separator', function (cents) { return delimit(cents, 0, '.'); }],
      ['amount_with_apostrophe_separator', function (cents) { return delimit(cents, 2, "'"); }],
      ['amount_no_decimals_with_space_separator', function (cents) { return delimit(cents, 0, ' '); }],
      ['amount_with_space_separator', function (cents) { return delimit(cents, 2, ' ', ','); }],
      ['amount_with_period_and_space_separator', function (cents) { return delimit(cents, 2, ' '); }]
    ]);

    function decodeEntities(s) {
      var el = window.document.createElement('textarea'); el.innerHTML = s; return el.value;
    }

    function moneyFormat() {
      const format = window._ReStockConfig?.moneyFormat;
      return typeof format === 'string' ? decodeEntities(format.replace(/<[^>]*>/g, '')) : '';
    }

    function formatMoney(amount) {
      const format = moneyFormat();
      const formatAmount = AMOUNT_FORMATTERS.get(AMOUNT_PLACEHOLDER.exec(format)?.[1] ?? '');
      if (!formatAmount) return formatMoneyIntl(amount);
      return format.replace(AMOUNT_PLACEHOLDER, formatAmount(Math.round(amount * 100)));
    }

    function calculateCheckoutCharge(price, policy) {
      const { charge_type, exact_amount, percentage } = policy.checkout_charge;
      if (!Number.isFinite(price) || price <= 0) return 0;
      if (charge_type === 'PERCENTAGE') return clamp(price * ((toFiniteNumber(percentage) ?? 0) / 100), 0, price);
      return clamp(toFiniteNumber(exact_amount) ?? 0, 0, price);
    }

    function formatRemainingDueDate(policy) {
      const { date_type, exact_date, after_some_days } = policy.remaining_fee_checkout_time;
      if (date_type === 'EXACT_DATE' && exact_date) {
        const parsed = new Date(exact_date + 'T12:00:00Z');
        if (!isNaN(parsed.getTime())) return formatDate(parsed);
      }
      if (date_type === 'AFTER_SOME_DAYS' && after_some_days) {
        const days = toFiniteNumber(after_some_days);
        if (days === null) return '';
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        return formatDate(futureDate);
      }
      return '';
    }

    function paymentText(planId, variantId) {
      const policy = cfg.selling_plans_billing_settings?.[planId];
      if (!policy) return '';
      const contents = localizedContents();
      if (policy.payment_type === 'FULL') return contents.billing_full_payment_text || 'Full payment at checkout';

      const price = inlineVariantPrice(variantId);
      if (price == null) return '';

      const planPrice = finalPriceForPlan(price, planId);
      const dueNowAmount = calculateCheckoutCharge(planPrice, policy);
      const dueLaterAmount = clamp(planPrice - dueNowAmount, 0, planPrice);
      const dueDate = formatRemainingDueDate(policy);

      const dueNowLabel = contents.billing_due_now_label || 'Due now';
      const dueLaterLabel = contents.billing_due_later_label || 'Due later on';
      const formattedDueNow = formatMoney(dueNowAmount);
      const formattedDueLater = formatMoney(dueLaterAmount);
      const dueLaterPart = dueDate
        ? formattedDueLater + ' ' + dueLaterLabel + ' ' + dueDate
        : formattedDueLater + ' ' + dueLaterLabel;

      return formattedDueNow + ' ' + dueNowLabel + ' · ' + dueLaterPart;
    }

    const DEFAULT_AVAILABILITY_LABEL = 'Expected availability';
    const DEFAULT_PAYMENT_LABEL = 'Payment';
    const TYPE_MARKER = 'Type';

    function cleanLabel(raw) {
      return String(raw == null ? '' : raw)
        .replace(/[[\]]/g, '')
        .replace(/[\s:：]+$/, '')
        .trim();
    }

    function resolvePaymentLabel(raw) {
      const cleaned = cleanLabel(raw);
      if (!cleaned || cleaned.charAt(0) === '_' || cleaned === TYPE_MARKER || cleaned === DEFAULT_AVAILABILITY_LABEL) {
        return DEFAULT_PAYMENT_LABEL;
      }
      return cleaned;
    }

    function resolveAvailabilityLabel(raw, paymentLabel) {
      const cleaned = cleanLabel(raw);
      if (!cleaned || cleaned.charAt(0) === '_' || cleaned === TYPE_MARKER || cleaned === paymentLabel) {
        return DEFAULT_AVAILABILITY_LABEL;
      }
      return cleaned;
    }

    function visibleCartProperties(planId, variantId) {
      const properties = {};
      try {
        const contents = localizedContents();
        const paymentLabel = resolvePaymentLabel(contents.payment_label);
        const availabilityLabel = resolveAvailabilityLabel(contents.availability_date_label, paymentLabel);
        const availabilityDate = availabilityDateText(planId);
        if (availabilityDate) properties[availabilityLabel] = availabilityDate;
        const payment = paymentText(planId, variantId);
        if (payment) properties[paymentLabel] = payment;
      } catch (error) {}
      return properties;
    }

    function setJsonProperty(item, name, value) {
      const properties = item.properties && typeof item.properties === 'object' && !Array.isArray(item.properties) ? item.properties : {};
      if (properties[name] === value) return false;
      properties[name] = value;
      item.properties = properties;
      return true;
    }

    function coerceJsonNumbers(item) {
      if (item.id) item.id = Number(item.id);
      if (item.quantity) item.quantity = Number(item.quantity);
    }

    function applyVisibleJsonProperties(item, planId, variantId) {
      const properties = visibleCartProperties(planId, variantId);
      let changed = false;
      for (const name of Object.keys(properties)) {
        if (setJsonProperty(item, name, properties[name])) changed = true;
      }
      return changed;
    }

    function enrichJsonItem(item) {
      if (!item || typeof item !== 'object') return false;
      const variantId = Number(item.id);
      if (!Number.isFinite(variantId)) return false;
      const planId = findSellingPlanId(variantId);
      if (planId == null) return false;

      if (cfg.is_selling_plan_removed_by_support) {
        const tagged = setJsonProperty(item, '_purchase_type', 'NM-preorder');
        const typed = setJsonProperty(item, 'Type', 'Pre-order');
        if (!tagged && !typed) return false;
        coerceJsonNumbers(item);
        return true;
      }

      if (item.selling_plan != null && item.selling_plan !== '' && String(item.selling_plan) === String(planId)) return false;

      setJsonProperty(item, '_purchase_type', 'NM-preorder');
      if (item.selling_plan == null || item.selling_plan === '') item.selling_plan = Number(planId);
      if (item.properties._selling_plan_id == null) setJsonProperty(item, '_selling_plan_id', String(planId));
      applyVisibleJsonProperties(item, planId, variantId);
      coerceJsonNumbers(item);
      return true;
    }

    function enrichJson(data) {
      if (!data || typeof data !== 'object') return false;
      if (Array.isArray(data.items)) {
        let changed = false;
        for (const item of data.items) {
          if (enrichJsonItem(item)) changed = true;
        }
        return changed;
      }
      if (data.items && typeof data.items === 'object') return enrichJsonItem(data.items);
      return enrichJsonItem(data);
    }

    function paramScopes(params) {
      const prefixes = [];
      const seen = {};
      params.forEach(function (value, key) {
        const match = /^items\[(\d+)\]\[id\]$/.exec(key);
        if (match && !seen[match[1]]) {
          seen[match[1]] = true;
          prefixes.push('items[' + match[1] + ']');
        }
      });
      if (prefixes.length > 0) return prefixes;
      if (params.get('items[id]') != null) return ['items'];
      if (params.get('id') != null) return [''];
      return [];
    }

    function scopeKey(prefix, name) {
      return prefix ? prefix + '[' + name + ']' : name;
    }

    function scopePropertyKey(prefix, name) {
      return prefix ? prefix + '[properties][' + name + ']' : 'properties[' + name + ']';
    }

    function setParam(params, key, value) {
      if (params.get(key) === value) return false;
      params.set(key, value);
      return true;
    }

    function applyRemovedBySupportParams(params, prefix) {
      const tagged = setParam(params, scopePropertyKey(prefix, '_purchase_type'), 'NM-preorder');
      const typed = setParam(params, scopePropertyKey(prefix, 'Type'), 'Pre-order');
      return tagged || typed;
    }

    function applyVisibleParamProperties(params, prefix, planId, variantId) {
      const properties = visibleCartProperties(planId, variantId);
      let changed = false;
      for (const name of Object.keys(properties)) {
        if (setParam(params, scopePropertyKey(prefix, name), properties[name])) changed = true;
      }
      return changed;
    }

    function enrichParamScope(params, prefix, planId, variantId) {
      if (cfg.is_selling_plan_removed_by_support) return applyRemovedBySupportParams(params, prefix);

      const existingPlan = params.get(scopeKey(prefix, 'selling_plan'));
      if (existingPlan != null && existingPlan !== '' && String(existingPlan) === String(planId)) return false;

      let changed = setParam(params, scopePropertyKey(prefix, '_purchase_type'), 'NM-preorder');
      if (existingPlan == null || existingPlan === '') {
        params.set(scopeKey(prefix, 'selling_plan'), String(planId));
        changed = true;
      }
      if (params.get(scopePropertyKey(prefix, '_selling_plan_id')) == null) {
        params.set(scopePropertyKey(prefix, '_selling_plan_id'), String(planId));
        changed = true;
      }
      if (applyVisibleParamProperties(params, prefix, planId, variantId)) changed = true;
      return changed;
    }

    function enrichParams(params) {
      const scopes = paramScopes(params);
      let changed = false;
      for (const prefix of scopes) {
        const variantId = Number(params.get(scopeKey(prefix, 'id')));
        if (!Number.isFinite(variantId)) continue;
        const planId = findSellingPlanId(variantId);
        if (planId == null) continue;
        if (enrichParamScope(params, prefix, planId, variantId)) changed = true;
      }
      return changed;
    }

    function enrichBody(body) {
      if (typeof body === 'string') {
        let jsonData = null;
        try {
          jsonData = JSON.parse(body);
        } catch (error) {
          jsonData = null;
        }
        if (jsonData && typeof jsonData === 'object') {
          return enrichJson(jsonData) ? { body: JSON.stringify(jsonData), changed: true } : { body: body, changed: false };
        }
        const params = new URLSearchParams(body);
        return enrichParams(params) ? { body: params.toString(), changed: true } : { body: body, changed: false };
      }
      if (typeof FormData !== 'undefined' && body instanceof FormData) {
        return { body: body, changed: enrichParams(body) };
      }
      if (typeof URLSearchParams !== 'undefined' && body instanceof URLSearchParams) {
        return { body: body, changed: enrichParams(body) };
      }
      return { body: body, changed: false };
    }

    function extractRequestUrl(input) {
      if (typeof input === 'string') return input;
      if (typeof input?.url === 'string') return input.url;
      if (typeof input?.href === 'string') return input.href;
      return '';
    }

    function maybeEnrichFetchInit(input, init) {
      if (!isGuardActive() || !init || init.body == null) return init;
      const url = extractRequestUrl(input);
      if (!isCartAddUrl(url) || !shouldEnrich()) return init;
      const enriched = enrichBody(init.body);
      if (!enriched.changed) return init;
      return { ...init, body: enriched.body };
    }

    function installWrappers() {
      if (wrappersInstalled) return;
      wrappersInstalled = true;

      const originalFetch = window.fetch;
      window.fetch = function (input, init) {
        let nextInit = init;
        try {
          nextInit = maybeEnrichFetchInit(input, init);
        } catch (error) {}
        return originalFetch.call(this || window, input, nextInit);
      };

      const xhrPrototype = window.XMLHttpRequest?.prototype;
      if (xhrPrototype) {
        const originalOpen = xhrPrototype.open;
        const originalSend = xhrPrototype.send;
        xhrPrototype.open = function () {
          try {
            this.__nmEarlyGuardUrl = arguments[1];
          } catch (error) {}
          return originalOpen.apply(this, arguments);
        };
        xhrPrototype.send = function (body) {
          try {
            if (isGuardActive() && body != null && this.__nmEarlyGuardUrl != null && isCartAddUrl(this.__nmEarlyGuardUrl) && shouldEnrich()) {
              const enriched = enrichBody(body);
              if (enriched.changed) return originalSend.call(this, enriched.body);
            }
          } catch (error) {}
          return originalSend.apply(this, arguments);
        };
      }
    }

    if (cfg?.override_cart_requests === true) installWrappers();
  } catch (error) {}
})(window);



(function (window) {
  try {
    if (window.__nmWishlistPageContainer) return;

    const CONTAINER_ID = 'nm-wishlist-page-root';
    const TARGET_SELECTORS = ['main#MainContent', 'main', '[role="main"]'];
    const RELATIVE_PLACEMENTS = ['before', 'after', 'start', 'end'];

    function trimTrailingSlash(path) {
      const value = String(path);
      return value.length > 1 && value.charAt(value.length - 1) === '/' ? value.slice(0, -1) : value;
    }

    function stripRoutesRoot(pathname) {
      const root = window.Shopify?.routes?.root;
      if (typeof root !== 'string') return pathname;
      const prefix = trimTrailingSlash(root);
      if (prefix === '' || prefix === '/') return pathname;
      if (pathname === prefix) return '/';
      return pathname.indexOf(prefix + '/') === 0 ? pathname.slice(prefix.length) : pathname;
    }

    function isConfiguredPage(pagePath) {
      const pathname = window.location?.pathname;
      if (typeof pathname !== 'string') return false;
      return trimTrailingSlash(stripRoutesRoot(pathname)) === trimTrailingSlash(pagePath);
    }

    function hasShareToken() {
      const search = window.location?.search;
      if (!search) return false;
      return !!new URLSearchParams(search).get('w');
    }

    function isBootable(wishlistConfig, sdkConfig) {
      if (!sdkConfig || typeof sdkConfig !== 'object') return false;
      if (sdkConfig.app_enabled !== true) return false;
      if (sdkConfig.is_suspended === true) return false;
      return wishlistConfig.is_service_active === true;
    }

    function matchElement(selector) {
      try {
        return window.document.querySelector(selector) || null;
      } catch (error) {
        return null;
      }
    }

    function configuredTarget(placement) {
      if (!placement || typeof placement !== 'object') return null;
      if (typeof placement.css_selector !== 'string' || placement.css_selector === '') return null;
      const element = matchElement(placement.css_selector);
      if (!element) return null;
      const relative = RELATIVE_PLACEMENTS.indexOf(placement.relative_placement) === -1 ? 'start' : placement.relative_placement;
      return { element: element, relative: relative };
    }

    function builtInTarget() {
      for (const selector of TARGET_SELECTORS) {
        const element = matchElement(selector);
        if (element) return { element: element, relative: 'start' };
      }
      return null;
    }

    function insertContainer(container, target) {
      if (target.relative === 'before' || target.relative === 'after') {
        const parent = target.element.parentNode;
        if (!parent) return false;
        parent.insertBefore(container, target.relative === 'before' ? target.element : target.element.nextSibling || null);
        return true;
      }
      target.element.insertBefore(container, target.relative === 'end' ? null : target.element.firstChild || null);
      return true;
    }

    function createContainer(placement) {
      const target = configuredTarget(placement) || builtInTarget();
      if (!target) return null;
      const container = window.document.createElement('div');
      container.id = CONTAINER_ID;
      container.setAttribute('data-nm-container-source', 'fallback');
      return insertContainer(container, target) ? container : null;
    }

    function usablePagePath(wishlistConfig) {
      const myWishlist = wishlistConfig && typeof wishlistConfig === 'object' ? wishlistConfig.my_wishlist : null;
      return myWishlist && typeof myWishlist.page_path === 'string' ? myWishlist.page_path : '';
    }

    function wishlistPageConfig(wishlistConfig) {
      const pagePath = usablePagePath(wishlistConfig);
      return pagePath && isConfiguredPage(pagePath) ? wishlistConfig.my_wishlist : null;
    }

    function armContainer(myWishlist) {
      const container = window.document.getElementById(CONTAINER_ID) || createContainer(myWishlist.container_placement);
      if (container) container.removeAttribute('data-nm-page-state');
    }

    function markInactive() {
      const container = window.document.getElementById(CONTAINER_ID);
      if (container) container.setAttribute('data-nm-page-state', 'inactive');
    }

    function dearmContainer() {
      const stale = window.document.getElementById(CONTAINER_ID);
      if (stale && stale.getAttribute('data-nm-container-source') === 'fallback') stale.remove();
      else markInactive();
    }

    function ensure(wishlistConfig, sdkConfig) {
      try {
        const myWishlist = wishlistPageConfig(wishlistConfig);
        if (!myWishlist) {
          if (usablePagePath(wishlistConfig)) dearmContainer();
          return;
        }
        const active = myWishlist.type === 'separate_page' || hasShareToken();
        if (active && isBootable(wishlistConfig, sdkConfig)) armContainer(myWishlist);
        else markInactive();
      } catch (error) {}
    }

    window.__nmWishlistPageContainer = { v: 1, ensure: ensure };

    const metafields = window._ReStockConfig?._metafields;
    ensure(metafields?.wishlistConfig, metafields?.sdkConfig);
  } catch (error) {}
})(window);



    window.BiscuitsBundle = window.BiscuitsBundle || {};
    window.BiscuitsBundle.quickAddRules = {
      bundleProductIds: ["44916013433020","8894944477372","44917883535548","8895488360636"],
      bundleProductHandles: ["collar-walk-set","harness-walk-set"],
      quickAddDisplayRule: "replace",
      quickViewDisplayRules: "hide",
      quickAddButtonClasses: "",
      quickAddSelector: "",
      quickViewSelector: "",
      gridItemSelector: "",
      productPageFormSelector: "",
      linkText: "View product",
      dialogType: "modal",
      dialogTemplateName: "",
      dialogContentSelector: "",
    };
  


    {"868":{"c":{"o":{"t":"none"},"r":{"n":"theme:cart:refresh","t":"event","ob":"document"}},"e":{"qab":["quick-add__button"]},"n":"broadcast","bc":"btn btn--primary btn--solid"}} 
  

{"@context":"http://schema.org","@type":"Product","@id":"https://furlou.com/products/blue-hands-free-braided-leash#product","name":"'Blue' - Hands Free Braided Leash","aggregateRating":{"@type":"AggregateRating","ratingValue":"5.00","reviewCount":3}}