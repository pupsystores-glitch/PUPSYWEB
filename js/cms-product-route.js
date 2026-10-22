(async function () {
  "use strict";

  const root = location.hostname === "pupsystores-glitch.github.io" ? "/PUPSYWEB/" : "/";
  try {
    const response = await fetch(new URL("harnes1.html", `${location.origin}${root}`), { cache: "no-store" });
    if (!response.ok) throw new Error("Product template could not be loaded");
    const html = await response.text();
    document.open();
    document.write(html);
    document.close();
  } catch (error) {
    console.error("PUPSY product route:", error);
    document.body.textContent = "პროდუქტის გვერდი დროებით ვერ ჩაიტვირთა.";
  }
})();
