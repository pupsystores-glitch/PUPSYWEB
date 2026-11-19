(async function () {
  "use strict";

  const root = location.hostname === "pupsystores-glitch.github.io" ? "/PUPSYWEB/" : "/";
  const overrides = [...document.querySelectorAll([
    "script[data-admin-editor-text-edits]",
    "script[data-admin-editor-image-edits]",
    "script[data-admin-editor-background-edits]",
    "script[data-admin-editor-link-edits]",
    "style[data-admin-editor-deletions]",
  ].join(","))].map(element => element.outerHTML).join("");
  try {
    const response = await fetch(new URL("harnes1.html", `${location.origin}${root}`), { cache: "no-store" });
    if (!response.ok) throw new Error("Product template could not be loaded");
    const html = await response.text();
    document.open();
    document.write(overrides ? html.replace(/<\/body>/i, closing => overrides + closing) : html);
    document.close();
  } catch (error) {
    console.error("PUPSY product route:", error);
    document.body.textContent = "პროდუქტის გვერდი დროებით ვერ ჩაიტვირთა.";
  }
})();
