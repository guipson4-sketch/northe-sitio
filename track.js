(function () {
  var GA_ID = "G-BPTGZYQHF1";
  var KEY = "northe_consent";
  var loaded = false;
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;

  function get() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function set(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  function load() {
    if (loaded) return;
    loaded = true;
    var s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_ID;
    document.head.appendChild(s);
    gtag("js", new Date());
    gtag("config", GA_ID, { anonymize_ip: true });
  }

  function track(name, params) {
    if (!loaded) return;
    gtag("event", name, params || {});
  }
  window.northeTrack = track;

  function banner() {
    var css = document.createElement("style");
    css.textContent =
      ".ck{position:fixed;left:16px;right:16px;bottom:16px;z-index:60;max-width:560px;margin:0 auto;background:#111;color:#fff;border-radius:24px;padding:18px 20px;font:300 14px/1.5 Inter,system-ui,sans-serif;display:flex;gap:14px;align-items:center;flex-wrap:wrap}" +
      ".ck p{margin:0;flex:1 1 240px;color:#bdbdbd}.ck a{color:#fff;text-decoration:underline}" +
      ".ck button{font:400 14px Inter,system-ui,sans-serif;border:0;border-radius:999px;padding:10px 18px;cursor:pointer}" +
      ".ck .ok{background:#8052ff;color:#fff}.ck .no{background:transparent;color:#bdbdbd}";
    document.head.appendChild(css);
    var b = document.createElement("div");
    b.className = "ck";
    b.setAttribute("role", "dialog");
    b.setAttribute("aria-label", "Aviso de cookies");
    b.innerHTML = '<p>Usamos cookies de medición (Google Analytics) para saber qué páginas funcionan y mejorar el sitio. No guardamos tu nombre ni tu correo. <a href="/privacidad/">Más información</a></p>' +
      '<button type="button" class="no">Rechazar</button><button type="button" class="ok">Aceptar</button>';
    b.querySelector(".ok").addEventListener("click", function () { set("yes"); b.remove(); load(); });
    b.querySelector(".no").addEventListener("click", function () { set("no"); b.remove(); });
    document.body.appendChild(b);
  }

  function init() {
    var c = get();
    if (c === "yes") load();
    else if (c !== "no") banner();
  }

  document.addEventListener("click", function (e) {
    var a = e.target.closest ? e.target.closest("a,button") : null;
    if (!a) return;
    var h = a.getAttribute("href") || "";
    var page = location.pathname;
    if (a.id === "wa" || h.indexOf("wa.me/") > -1) track("contacto_whatsapp", { pagina: page, desde: a.id === "wa" ? "resultado_auditoria" : "enlace" });
    else if (a.id === "mail") track("contacto_email", { pagina: page, desde: "resultado_auditoria" });
    else if (h.indexOf("mailto:") === 0) track("contacto_email", { pagina: page, desde: "enlace" });
    else if (a.id === "copy") track("resultado_copiado", { pagina: page });
    else if (/linkedin|instagram|facebook/.test(h)) track("clic_red_social", { pagina: page, red: h.split("/")[2] });
    else if (h.indexOf("#auditoria-expres") > -1) track("auditoria_cta", { pagina: page });
  }, true);

  document.addEventListener("submit", function (e) {
    if (e.target.querySelector && e.target.querySelector("#calc")) track("auditoria_completada", { pagina: location.pathname });
  }, true);

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init); else init();
})();
