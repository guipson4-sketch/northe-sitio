(function () {
  var dock = document.getElementById("dock");
  if (!dock) return;
  var icons = [].slice.call(dock.querySelectorAll("a"));
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!fine || reduce) return;
  var R = 170, mx = -9999, my = -9999, cur = icons.map(function () { return 0; }), raf = 0, focused = -1;
  function tick() {
    raf = 0;
    var box = dock.getBoundingClientRect(), moving = false;
    icons.forEach(function (a, i) {
      var cx = box.left + a.offsetLeft + a.offsetWidth / 2;
      var cy = box.bottom - a.offsetHeight / 2;
      var d = Math.sqrt((mx - cx) * (mx - cx) + (my - cy) * (my - cy));
      var t = Math.max(0, 1 - d / R);
      var target = i === focused ? 1 : t * t * (3 - 2 * t);
      cur[i] += (target - cur[i]) * 0.2;
      if (Math.abs(target - cur[i]) > 0.003) moving = true; else cur[i] = target;
      a.style.setProperty("--m", cur[i].toFixed(3));
    });
    if (moving) raf = requestAnimationFrame(tick);
  }
  function go() { if (!raf) raf = requestAnimationFrame(tick); }
  window.addEventListener("pointermove", function (e) { mx = e.clientX; my = e.clientY; go(); }, { passive: true });
  document.addEventListener("pointerleave", function () { mx = my = -9999; go(); });
  icons.forEach(function (a, i) {
    a.addEventListener("focus", function () { focused = i; go(); });
    a.addEventListener("blur", function () { focused = -1; go(); });
  });
  go();
})();
