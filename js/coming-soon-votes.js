(function () {
  "use strict";

  const API = "https://pupsy-decap-oauth.pupsystores.workers.dev/api";
  const VISITOR_KEY = "pupsy-coming-soon-voter";

  function visitorId() {
    try {
      let value = localStorage.getItem(VISITOR_KEY);
      if (!value) {
        value = crypto.randomUUID();
        localStorage.setItem(VISITOR_KEY, value);
      }
      return value;
    } catch (_) {
      return crypto.randomUUID();
    }
  }

  function ensureDialog() {
    let dialog = document.getElementById("coming-soon-vote-dialog");
    if (dialog) return dialog;
    dialog = document.createElement("div");
    dialog.id = "coming-soon-vote-dialog";
    dialog.className = "csv-dialog";
    dialog.innerHTML = '<div class="csv-dialog__card" role="dialog" aria-modal="true" aria-labelledby="csv-dialog-title"><button class="csv-dialog__close" type="button" aria-label="დახურვა">×</button><div class="csv-dialog__icon" aria-hidden="true">✓</div><h2 id="csv-dialog-title">გმადლობთ ხმისთვის!</h2><p class="csv-dialog__product"></p><p>დაგვიტოვეთ ტელეფონის ნომერი ან ელფოსტა. პროდუქტის დამატებისას აუცილებლად შეგატყობინებთ.</p><form class="csv-dialog__form"><label for="csv-contact">ტელეფონი ან ელფოსტა</label><input id="csv-contact" name="contact" type="text" autocomplete="email" maxlength="200" placeholder="მაგ. 555 12 34 56 ან name@example.com" required><p class="csv-dialog__error" role="alert"></p><button class="csv-dialog__submit" type="submit">შეტყობინება მინდა</button><button class="csv-dialog__skip" type="button">ახლა არა</button><p class="csv-dialog__privacy">საკონტაქტო მონაცემს მხოლოდ ამ პროდუქტზე შეტყობინებისთვის გამოვიყენებთ.</p></form><div class="csv-dialog__success" role="status" hidden><span class="csv-dialog__success-icon" aria-hidden="true"><svg viewBox="0 0 52 52" focusable="false"><path d="M14 27l8 8 17-18" /></svg></span><p>კონტაქტი შენახულია — შეგატყობინებთ.</p></div></div>';
    document.body.append(dialog);
    dialog.querySelector(".csv-dialog__close").addEventListener("click", () => dialog.classList.remove("is-open"));
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog || event.target.closest(".csv-dialog__skip")) dialog.classList.remove("is-open");
    });
    dialog.querySelector(".csv-dialog__form").addEventListener("submit", async (event) => {
      event.preventDefault();
      const input = dialog.querySelector("#csv-contact");
      const error = dialog.querySelector(".csv-dialog__error");
      const submit = dialog.querySelector(".csv-dialog__submit");
      error.textContent = "";
      submit.disabled = true;
      try {
        const response = await fetch(`${API}/contacts`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ voteId: dialog.dataset.voteId, contact: input.value.trim() }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "ვერ მოხერხდა შენახვა. სცადეთ თავიდან.");
        dialog.querySelector(".csv-dialog__form").hidden = true;
        dialog.querySelector(".csv-dialog__success").hidden = false;
      } catch (err) {
        error.textContent = err.message;
      } finally {
        submit.disabled = false;
      }
    });
    return dialog;
  }

  function showDialog(voteId, title) {
    const dialog = ensureDialog();
    dialog.dataset.voteId = voteId;
    dialog.querySelector(".csv-dialog__product").textContent = title;
    dialog.querySelector(".csv-dialog__form").hidden = false;
    dialog.querySelector(".csv-dialog__success").hidden = true;
    dialog.querySelector(".csv-dialog__error").textContent = "";
    dialog.querySelector("#csv-contact").value = "";
    dialog.classList.add("is-open");
    setTimeout(() => dialog.querySelector("#csv-contact").focus(), 220);
  }

  function mount(productId, title, container, options = {}) {
    if (!container || !productId) return;
    container.querySelector("[data-coming-soon-voter]")?.remove();
    const wrapper = document.createElement(options.inline ? "div" : "section");
    wrapper.dataset.comingSoonVoter = "";
    wrapper.className = options.inline ? "csv-vote csv-vote--inline" : "csv-vote";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "csv-vote__button";
    button.innerHTML = '<span class="csv-vote__heart" aria-hidden="true">♡</span><span>მინდა მალე დაემატოს</span><span class="csv-vote__count" aria-label="ხმების რაოდენობა">…</span>';
    const message = document.createElement("span");
    message.className = "csv-vote__message";
    message.setAttribute("role", "status");
    wrapper.append(button, message);
    container.append(wrapper);

    fetch(`${API}/votes?productId=${encodeURIComponent(productId)}`)
      .then(response => response.ok ? response.json() : null)
      .then(data => { if (data) button.querySelector(".csv-vote__count").textContent = String(data.count); })
      .catch(() => { button.querySelector(".csv-vote__count").textContent = "♡"; });

    button.addEventListener("click", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      button.disabled = true;
      message.textContent = "ხმა იგზავნება…";
      try {
        const response = await fetch(`${API}/votes`, {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, title, voterId: visitorId() }),
        });
        const result = await response.json();
        if (!response.ok) throw new Error(result.error || "ხმის მიცემა ვერ მოხერხდა.");
        button.querySelector(".csv-vote__count").textContent = String(result.count);
        button.classList.add("is-voted");
        message.textContent = result.duplicate ? "ამ პროდუქტზე თქვენი ხმა უკვე დათვლილია." : "თქვენი ხმა დათვლილია!";
        showDialog(result.voteId, title);
      } catch (error) {
        message.textContent = error.message || "ხმის გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან.";
      } finally {
        button.disabled = false;
      }
    });
  }

  const style = document.createElement("style");
  style.textContent = `
    .csv-vote{display:flex;flex-direction:column;align-items:flex-start;gap:5px;margin:10px 0 4px;font-family:inherit}
    .csv-vote--inline{margin:9px 10px 12px}
    .csv-vote__button{display:inline-flex;align-items:center;justify-content:center;gap:7px;min-height:38px;padding:8px 12px;border:1px solid #d8b49d;border-radius:10px;background:#fffaf7;color:#75452f;font-family:inherit;font-size:12px;font-weight:600;line-height:1.3;cursor:pointer;transition:transform .18s ease,background .18s ease,border-color .18s ease}
    .csv-vote__button:hover{background:#f8eee7;border-color:#a86f4c;transform:translateY(-1px)}
    .csv-vote__button:disabled{opacity:.65;cursor:wait}
    .csv-vote__button.is-voted{background:#8a4d2e;color:#fff;border-color:#8a4d2e}
    .csv-vote__heart{font-size:18px;line-height:1}.csv-vote__count{min-width:20px;padding:2px 6px;border-radius:999px;background:#f0e2d8;text-align:center;font-size:11px}.is-voted .csv-vote__count{background:#ffffff33;color:#fff}
    .csv-vote__message{font-size:11px;line-height:1.4;color:#735443}
    .csv-dialog{position:fixed;inset:0;z-index:2147483000;display:grid;place-items:center;padding:18px;background:rgb(20 16 14 / 55%);opacity:0;visibility:hidden;transition:opacity .22s ease,visibility .22s ease;font-family:inherit}
    .csv-dialog.is-open{opacity:1;visibility:visible}.csv-dialog__card{position:relative;width:min(100%,420px);padding:28px 24px 22px;border:1px solid #ead9cd;border-radius:20px;background:#fffdfa;color:#2d2824;box-shadow:0 24px 70px rgb(0 0 0 / 25%);transform:translateY(14px) scale(.97);transition:transform .25s cubic-bezier(.2,.75,.25,1)}.is-open .csv-dialog__card{transform:translateY(0) scale(1)}
    .csv-dialog__close{position:absolute;top:12px;right:14px;border:0;background:transparent;color:#75695f;font-size:26px;cursor:pointer}.csv-dialog__icon{display:grid;place-items:center;width:42px;height:42px;border-radius:14px;background:#f4e7dd;color:#8a4d2e;font-weight:800;font-size:20px}.csv-dialog h2{margin:15px 0 7px;font-size:19px;line-height:1.3}.csv-dialog p{margin:7px 0;color:#63584f;font-size:13px;line-height:1.55}.csv-dialog .csv-dialog__product{color:#8a4d2e;font-weight:700}
    .csv-dialog__form{display:grid;gap:9px;margin-top:18px}.csv-dialog__form label{font-size:12px;font-weight:700}.csv-dialog__form input{width:100%;box-sizing:border-box;padding:12px;border:1px solid #ddcec3;border-radius:10px;background:#fff;color:#2d2824;font:inherit;font-size:14px;outline:none}.csv-dialog__form input:focus{border-color:#a86f4c;box-shadow:0 0 0 3px #a86f4c24}.csv-dialog__error{color:#a93226!important;font-size:12px!important}.csv-dialog__submit{border:0;border-radius:10px;padding:12px;background:#8a4d2e;color:#fff;font-family:inherit;font-size:13px;font-weight:700;cursor:pointer}.csv-dialog__submit:disabled{opacity:.6}.csv-dialog__skip{border:0;padding:8px;background:transparent;color:#71675f;font-family:inherit;font-size:12px;font-weight:500;cursor:pointer}.csv-dialog__privacy{font-size:10px!important;color:#83766d!important}.csv-dialog__success[hidden]{display:none}.csv-dialog__success{display:flex;flex-direction:column;align-items:center;gap:15px;margin:26px 0 8px!important;text-align:center;animation:csv-success-arrive .42s cubic-bezier(.2,.8,.25,1) both}.csv-dialog__success p{margin:0!important;color:#31734a!important;font-size:16px!important;font-weight:700}.csv-dialog__success-icon{display:grid;place-items:center;width:82px;height:82px;border-radius:50%;background:#22a45a;box-shadow:0 0 0 9px #22a45a1c;animation:csv-check-pop .55s cubic-bezier(.18,.85,.32,1.3) both}.csv-dialog__success-icon svg{width:48px;height:48px;overflow:visible}.csv-dialog__success-icon path{fill:none;stroke:#fff;stroke-width:5;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:42;stroke-dashoffset:42;animation:csv-check-draw .42s .2s ease-out forwards}@keyframes csv-success-arrive{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}@keyframes csv-check-pop{from{opacity:0;transform:scale(.45)}to{opacity:1;transform:scale(1)}}@keyframes csv-check-draw{to{stroke-dashoffset:0}}
    @media(prefers-reduced-motion:reduce){.csv-dialog,.csv-dialog__card,.csv-vote__button,.csv-dialog__success,.csv-dialog__success-icon,.csv-dialog__success-icon path{animation:none;transition:none}.csv-dialog__success-icon path{stroke-dashoffset:0}}
  `;
  document.head.append(style);
  window.PupsyComingSoonVotes = { mount };
})();
