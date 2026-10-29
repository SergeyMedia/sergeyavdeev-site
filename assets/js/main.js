(function () {
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  // Mobile menu
  var btn = $(".menu-btn"), nav = $(".nav");
  if (btn) btn.addEventListener("click", function () { nav.classList.toggle("open"); btn.setAttribute("aria-expanded", nav.classList.contains("open")); });

  // Hero
  var hero = $("[data-hero]");
  if (hero && window.HERO) {
    var H = window.HERO, el;
    if (H.video) {
      el = document.createElement("video");
      el.src = window.mediaUrl({ path: H.video }); el.muted = true; el.loop = true; el.autoplay = true; el.playsInline = true;
      el.setAttribute("playsinline", ""); el.poster = window.mediaUrl(H.image, 2400);
    } else {
      el = new Image(); el.src = window.mediaUrl(H.image, 2400); el.alt = H.image.alt || ""; el.fetchPriority = "high";
    }
    hero.prepend(el);
  }

  function catLabel(id) { return (window.CATEGORIES.filter(function (c) { return c.id === id; })[0] || {}).label || ""; }

  // About photo
  var ab = $("[data-about-photo]");
  if (ab && window.ABOUT_PHOTO) { var ai = new Image(); ai.src = window.mediaUrl(window.ABOUT_PHOTO, 2000); ai.alt = window.ABOUT_PHOTO.alt; ab.appendChild(ai); }

  // Gallery grids
  var items = [];
  $$("[data-grid]").forEach(function (grid) {
    var featuredOnly = grid.dataset.grid === "featured";
    var list = window.PHOTOS.filter(function (p) { return !featuredOnly || p.featured; });
    list.forEach(function (p) {
      var fig = document.createElement("figure");
      fig.dataset.category = p.category;
      var img = new Image();
      img.loading = featuredOnly ? "eager" : "lazy"; img.decoding = "async"; img.alt = p.title || "";
      img.onload = function () { img.classList.add("loaded"); };
      img.src = window.mediaUrl(p, 900);
      if (img.complete) img.classList.add("loaded");
      var cap = document.createElement("figcaption");
      var cat = catLabel(p.category);
      img.alt = p.title || (cat + " photography by Sergey Avdeev");
      cap.textContent = p.title ? p.title + " — " + cat : cat;
      fig.appendChild(img); fig.appendChild(cap);
      grid.appendChild(fig);
      if (featuredOnly) {
        fig.addEventListener("click", function () { location.href = grid.dataset.link || "work/"; });
      } else {
        items.push({ fig: fig, p: p });
        fig.addEventListener("click", function () { openLb(fig); });
      }
    });
  });

  // Filters
  var filters = $(".filters");
  if (filters) {
    var all = [{ id: "all", label: "All" }].concat(window.CATEGORIES);
    all.forEach(function (c) {
      var b = document.createElement("button");
      b.type = "button"; b.textContent = c.label; b.setAttribute("aria-pressed", c.id === "all");
      b.addEventListener("click", function () {
        $$("button", filters).forEach(function (x) { x.setAttribute("aria-pressed", x === b); });
        items.forEach(function (it) { it.fig.classList.toggle("is-hidden", c.id !== "all" && it.p.category !== c.id); });
        if (history.replaceState) history.replaceState(null, "", c.id === "all" ? location.pathname : "#" + c.id);
      });
      filters.appendChild(b);
    });
    var hash = location.hash.slice(1);
    var initial = $$("button", filters)[all.map(function (c) { return c.id; }).indexOf(hash)];
    if (initial) initial.click();
  }

  // Lightbox
  var lb = $(".lightbox"), lbImg, lbCap, cur = -1;
  function visible() { return items.filter(function (it) { return !it.fig.classList.contains("is-hidden"); }); }
  function show(i) {
    var v = visible(); if (!v.length) return;
    cur = (i + v.length) % v.length;
    lbImg.src = window.mediaUrl(v[cur].p, 2400); lbImg.alt = v[cur].p.title || catLabel(v[cur].p.category);
    lbCap.textContent = (v[cur].p.title || catLabel(v[cur].p.category)) + "  ·  " + (cur + 1) + " / " + v.length;
  }
  function openLb(fig) {
    var v = visible(); show(v.map(function (it) { return it.fig; }).indexOf(fig));
    lb.classList.add("open"); document.body.style.overflow = "hidden";
  }
  function closeLb() { lb.classList.remove("open"); document.body.style.overflow = ""; }
  if (lb) {
    lbImg = $("img", lb); lbCap = $(".lb-caption", lb);
    $(".lb-close", lb).onclick = closeLb;
    $(".lb-prev", lb).onclick = function (e) { e.stopPropagation(); show(cur - 1); };
    $(".lb-next", lb).onclick = function (e) { e.stopPropagation(); show(cur + 1); };
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLb(); if (e.key === "ArrowLeft") show(cur - 1); if (e.key === "ArrowRight") show(cur + 1);
    });
    var x0 = null;
    lb.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
  }

  // Videos (YouTube facade: thumbnail until clicked, keeps pages fast)
  function videoEl(v) {
    var wrap = document.createElement("div");
    var box = document.createElement("div"); box.className = "video";
    if (v.youtube) {
      var t = new Image(); t.loading = "lazy"; t.alt = v.title; t.src = "https://i.ytimg.com/vi/" + v.youtube + "/sddefault.jpg";
      t.onerror = function () { t.src = "https://i.ytimg.com/vi/" + v.youtube + "/hqdefault.jpg"; };
      var play = document.createElement("span"); play.className = "play"; play.setAttribute("aria-hidden", "true");
      box.appendChild(t); box.appendChild(play);
      box.setAttribute("role", "button"); box.setAttribute("tabindex", "0"); box.setAttribute("aria-label", "Play " + v.title);
      var go = function () {
        box.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + v.youtube + '?autoplay=1&rel=0" title="' + v.title + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen></iframe>';
      };
      box.addEventListener("click", go);
      box.addEventListener("keydown", function (e) { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
    } else {
      var vid = document.createElement("video");
      vid.src = window.mediaUrl({ path: v.path }); vid.controls = true; vid.preload = "none"; vid.playsInline = true;
      if (v.poster) vid.poster = window.mediaUrl({ path: v.poster });
      box.appendChild(vid);
    }
    var cap = document.createElement("div"); cap.className = "video-caption"; cap.textContent = v.title;
    wrap.appendChild(box); wrap.appendChild(cap);
    return wrap;
  }
  $$("[data-videos]").forEach(function (host) {
    var list = host.dataset.videos === "reel" ? window.VIDEOS.slice(0, 1) : window.VIDEOS;
    list.forEach(function (v) { host.appendChild(videoEl(v)); });
  });

  // Contact details from SITE config
  $$("[data-email]").forEach(function (el) {
    if (window.SITE.email) { el.innerHTML = '<a href="mailto:' + window.SITE.email + '">' + window.SITE.email + "</a>"; }
  });
  $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
})();
