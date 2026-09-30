(function () {
  var doc = document.documentElement;
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var canIO = "IntersectionObserver" in window;
  function $(s) { return document.querySelector(s); }
  function $$(s) { return Array.prototype.slice.call(document.querySelectorAll(s)); }
  function watch(els, cb, opts) {
    if (!canIO) { els.forEach(function (el) { cb(el); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { io.unobserve(en.target); cb(en.target); } });
    }, opts || { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });
  }

  var themeBtn = $("#theme");
  themeBtn.addEventListener("click", function () {
    var cur = doc.getAttribute("data-theme");
    if (!cur) cur = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    var next = cur === "dark" ? "light" : "dark";
    doc.setAttribute("data-theme", next);
    try { localStorage.setItem("northe-theme", next); } catch (e) {}
  });

  var menu = $("#menu"), nav = $("#nav");
  menu.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  });

  var site = $(".site"), bar = $("#progress"), ticking = false;
  function onScroll() {
    var h = doc.scrollHeight - window.innerHeight;
    bar.style.transform = "scaleX(" + (h > 0 ? Math.min(1, window.scrollY / h) : 0) + ")";
    site.classList.toggle("stuck", window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  $$("[data-stagger]").forEach(function (box) {
    Array.prototype.forEach.call(box.children, function (c, i) {
      c.setAttribute("data-rv", "");
      c.style.setProperty("--d", (i * 90) + "ms");
    });
  });
  var rvEls = $$("[data-rv]");
  rvEls.forEach(function (el) { el.classList.add("rv"); });
  watch(rvEls, function (el) { el.classList.add("in"); });
  watch($$(".rail"), function (el) { el.classList.add("in"); });
})();
