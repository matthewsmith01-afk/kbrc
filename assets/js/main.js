/* Kachemak Bay Running Club - site interactions
   Vanilla JS, no dependencies. Progressive enhancement only. */
(function () {
  "use strict";

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Sticky header state ---- */
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav__links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      toggle.classList.toggle("is-active", open);
      toggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    links.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        links.classList.remove("is-open");
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");
        document.body.classList.remove("nav-open");
      }
    });
  }

  /* ---- Scroll reveal ---- */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---- Animated number counters ---- */
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        var target = parseFloat(el.getAttribute("data-count"));
        var suffix = el.getAttribute("data-suffix") || "";
        var dur = 1400, start = null;
        var step = function (ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var eased = 1 - Math.pow(1 - p, 3);
          var val = target * eased;
          el.textContent = (target % 1 === 0 ? Math.round(val) : val.toFixed(1)) + suffix;
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        cObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ---- Hero parallax ---- */
  var layers = document.querySelectorAll(".hero .layer[data-speed]");
  if (layers.length && !reduceMotion) {
    var ticking = false;
    var applyParallax = function () {
      var y = window.scrollY;
      layers.forEach(function (l) {
        var speed = parseFloat(l.getAttribute("data-speed"));
        l.style.transform = "translate3d(0," + (y * speed) + "px,0)";
      });
      ticking = false;
    };
    window.addEventListener("scroll", function () {
      if (!ticking) { requestAnimationFrame(applyParallax); ticking = true; }
    }, { passive: true });
  }

  /* ---- Results table: filter + search ---- */
  var resultsTable = document.querySelector("[data-results]");
  if (resultsTable) {
    var rows = Array.prototype.slice.call(resultsTable.querySelectorAll("tbody tr[data-row]"));
    var chips = document.querySelectorAll("[data-filter]");
    var searchInput = document.querySelector("[data-search]");
    var emptyRow = resultsTable.querySelector(".empty-row");
    var activeFilter = "all";

    var apply = function () {
      var q = (searchInput && searchInput.value || "").trim().toLowerCase();
      var shown = 0;
      rows.forEach(function (row) {
        var matchFilter = activeFilter === "all" || row.getAttribute("data-race") === activeFilter;
        var matchSearch = !q || row.getAttribute("data-name").toLowerCase().indexOf(q) !== -1;
        var visible = matchFilter && matchSearch;
        row.hidden = !visible;
        if (visible) shown++;
      });
      if (emptyRow) emptyRow.hidden = shown !== 0;
    };

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("is-active"); c.setAttribute("aria-pressed", "false"); });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        activeFilter = chip.getAttribute("data-filter");
        apply();
      });
    });
    if (searchInput) searchInput.addEventListener("input", apply);
    apply();
  }

  /* ---- Footer year ---- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Photo fallback ----
     Images with data-fallback try the real raster file first; if it is not
     present (404 / decode error), they swap to the SVG placeholder so the
     layout never shows a broken image. Drop real .jpg/.png files into
     assets/img with the documented names and they appear automatically. */
  var fallbackImgs = document.querySelectorAll("img[data-fallback]");
  fallbackImgs.forEach(function (img) {
    img.addEventListener("error", function handle() {
      var fb = img.getAttribute("data-fallback");
      if (fb && img.src.indexOf(fb) === -1) {
        img.src = fb;
      } else {
        img.removeEventListener("error", handle);
      }
    });
  });
})();
