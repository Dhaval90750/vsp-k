(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.remove("no-js");

  var S = window.VSPIK_SITE || {};
  var PHONE = S.phone || "919075018192";
  var EMAIL = S.email || "thawaredhaval24@gmail.com";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  function wa(text) { return "https://wa.me/" + PHONE + "?text=" + encodeURIComponent(text); }

  /* ---------- WhatsApp links with prefilled messages ---------- */
  document.querySelectorAll("[data-wa]").forEach(function (a) {
    a.href = wa(a.getAttribute("data-wa") || S.waDefault || "Hi VSp!k");
  });

  /* ---------- partner numbers from settings ---------- */
  if (S.partner) {
    document.querySelectorAll("[data-p]").forEach(function (el) {
      var v = S.partner[el.getAttribute("data-p")];
      if (v !== undefined && v !== null && v !== "") el.textContent = v;
    });
  }

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- nav: mobile menu + border on scroll ---------- */
  var nav = document.querySelector(".nav");
  var btn = document.querySelector(".menu-btn");
  var menu = document.getElementById("menu");
  function closeMenu() { if (!menu) return; menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  if (btn && menu) btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  if (menu) menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById("progress");
  var ticking = false;
  function onScroll() {
    var max = doc.scrollHeight - innerHeight;
    if (bar) bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
    nav.classList.toggle("scrolled", scrollY > 8);
    ticking = false;
  }
  addEventListener("scroll", function () { if (!ticking) { requestAnimationFrame(onScroll); ticking = true; } }, { passive: true });
  onScroll();

  /* ---------- reveal on scroll (paper drop / fold) ---------- */
  var revealables = document.querySelectorAll(".reveal, .step");
  // stagger siblings
  document.querySelectorAll(".services, .flips, .tiers, .steps, .faq, .work-grid").forEach(function (g) {
    Array.prototype.forEach.call(g.children, function (c, i) { c.style.setProperty("--d", (i % 3) * 0.09 + "s"); });
  });
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
    revealables.forEach(function (el) { io.observe(el); });
  } else {
    revealables.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- 3D tilt on cards (mouse only) ---------- */
  function bindTilt(el) {
    if (!finePointer || reduce) return;
    el.addEventListener("pointermove", function (e) {
      if (!el.classList.contains("in")) return;
      var r = el.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - 0.5;
      var py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transition = "transform .12s ease-out, box-shadow .25s";
      el.style.transform = "perspective(900px) rotateY(" + (px * 10).toFixed(2) + "deg) rotateX(" + (-py * 10).toFixed(2) + "deg) translate(-3px,-3px)";
    });
    el.addEventListener("pointerleave", function () { el.style.transition = "transform .5s cubic-bezier(.2,.9,.25,1.2), box-shadow .25s"; el.style.transform = ""; });
  }
  document.querySelectorAll(".tilt").forEach(bindTilt);

  /* ---------- hero: tiles tilt with the mouse, bits move in depth ---------- */
  var tiles = document.getElementById("tiles");
  var bits = document.querySelectorAll(".bit");
  var hero = document.querySelector(".hero");
  if (hero && tiles && finePointer && !reduce) {
    hero.addEventListener("pointermove", function (e) {
      var px = e.clientX / innerWidth - 0.5;
      var py = e.clientY / innerHeight - 0.5;
      tiles.style.setProperty("--ry", (px * 26).toFixed(2) + "deg");
      tiles.style.setProperty("--rx", (-py * 18 + 4).toFixed(2) + "deg");
      bits.forEach(function (b) {
        var d = +b.getAttribute("data-depth");
        b.style.transform = "translate3d(" + (px * d).toFixed(1) + "px," + (py * d).toFixed(1) + "px,0)";
      });
    });
    hero.addEventListener("pointerleave", function () {
      tiles.style.removeProperty("--ry"); tiles.style.removeProperty("--rx");
      bits.forEach(function (b) { b.style.transform = ""; });
    });
  }

  /* ---------- hero: drag a tile, it springs back ---------- */
  if (tiles) tiles.querySelectorAll(".tile").forEach(function (t) {
    var sx = 0, sy = 0, dragging = false;
    t.addEventListener("animationend", function () { t.style.animation = "none"; });
    t.addEventListener("pointerdown", function (e) {
      dragging = true; sx = e.clientX; sy = e.clientY;
      t.style.animation = "none";
      t.classList.add("dragging"); t.setPointerCapture(e.pointerId);
    });
    t.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      t.style.setProperty("--dx", dx + "px");
      t.style.setProperty("--dy", dy + "px");
      t.style.setProperty("--r", (dx * 0.12).toFixed(1) + "deg");
    });
    function release() {
      if (!dragging) return;
      dragging = false; t.classList.remove("dragging");
      t.style.removeProperty("--dx"); t.style.removeProperty("--dy"); t.style.removeProperty("--r");
    }
    t.addEventListener("pointerup", release);
    t.addEventListener("pointercancel", release);
  });

  /* ---------- flip cards ---------- */
  document.querySelectorAll(".flip").forEach(function (f) {
    f.addEventListener("click", function () {
      f.setAttribute("aria-pressed", f.getAttribute("aria-pressed") === "true" ? "false" : "true");
    });
  });

  /* ---------- work: build from data/projects.js ---------- */
  var projects = window.VSPIK_PROJECTS || [];
  var grid = document.getElementById("work-grid");
  var empty = document.getElementById("work-empty");
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]; }); }
  var limit = grid ? +(grid.getAttribute("data-limit") || 0) : 0;
  if (!grid) {
    /* no work section on this page */
  } else if (!projects.length) {
    if (empty) empty.hidden = false;
  } else {
    (limit ? projects.slice(0, limit) : projects).forEach(function (p, i) {
      var concept = String(p.kind || "").toLowerCase() === "concept";
      var tag = p.link ? "a" : "article";
      var el = document.createElement(tag);
      el.className = "proj reveal tilt";
      el.style.setProperty("--d", (i % 3) * 0.09 + "s");
      if (p.link) { el.href = p.link; el.target = "_blank"; el.rel = "noopener"; }
      var visual = p.image
        ? '<div class="proj-img"><img src="' + esc(p.image) + '" alt="' + esc(p.title) + ' screenshot" loading="lazy"></div>'
        : '<div class="proj-frame" aria-hidden="true"><div class="pf-bar"><i></i><i></i><i></i><span>' + esc(p.domain || "") + '</span></div>' +
          '<div class="pf-body"><span class="pf-title">' + esc(p.title) + '</span><span class="pf-field">' + esc(p.field || "") + '</span></div></div>';
      el.innerHTML = visual +
        '<div class="proj-body">' +
          '<div class="proj-meta"><span class="chip ' + (concept ? "kind-concept" : "kind-client") + '">' + esc(p.kind || "Client project") + "</span>" +
          (p.field ? '<span class="chip">' + esc(p.field) + "</span>" : "") +
          (p.status ? '<span class="chip chip-status">' + esc(p.status) + "</span>" : "") +
          (p.year ? '<span class="chip">' + esc(p.year) + "</span>" : "") + "</div>" +
          "<h3>" + esc(p.title) + "</h3>" +
          (p.client ? '<p class="client">' + esc(p.client) + "</p>" : "") +
          (p.summary ? "<p>" + esc(p.summary) + "</p>" : "") +
          (p.result ? '<p class="result">' + esc(p.result) + "</p>" : "") +
          (p.tags && p.tags.length ? '<p class="tags">' + p.tags.map(esc).join(" · ") + "</p>" : "") +
          (p.link ? '<span class="proj-go">Visit ' + esc(p.domain || "site") + ' →</span>' : "") +
        "</div>";
      grid.appendChild(el);
      bindTilt(el);
      if (io) io.observe(el); else el.classList.add("in");
    });
  }

  /* ---------- feed: reels + posts from data/feed.js ---------- */
  var FEED = window.VSPIK_FEED || { reels: [], posts: [] };
  var feedGrid = document.getElementById("feed-grid");
  var TILTS = [-1.6, 1.2, -0.7, 1.8, -1.2, 0.8, -1.9, 1.4];
  var feedCards = [];
  function nl(s) { return esc(s); } // newlines kept by CSS (white-space: pre-line)

  function captionHTML(item) {
    var full = item.caption || "";
    var short = full.split(/\n\s*\n/)[0];
    var long = short !== full;
    return '<p class="fcap-short">' + nl(short) + (long ? " …" : "") + "</p>" +
      '<p class="fcap">' + nl(full) + "</p>" +
      (item.tags && item.tags.length ? '<p class="ftags">' + item.tags.map(function (t) { return "<span>#" + esc(t) + "</span>"; }).join("") + "</p>" : "") +
      '<div class="factions">' +
        (long || (item.tags && item.tags.length) ? '<button type="button" class="f-more" aria-expanded="false">Read more</button>' : "") +
        (navigator.clipboard ? '<button type="button" class="f-copy">Copy caption</button>' : "") +
      "</div>";
  }
  function bindCaption(el, item) {
    var more = el.querySelector(".f-more");
    if (more) more.addEventListener("click", function () {
      var open = el.classList.toggle("open");
      more.textContent = open ? "Show less" : "Read more";
      more.setAttribute("aria-expanded", open ? "true" : "false");
    });
    var copy = el.querySelector(".f-copy");
    if (copy) copy.addEventListener("click", function () {
      var text = item.caption + (item.tags && item.tags.length ? "\n\n" + item.tags.map(function (t) { return "#" + t; }).join(" ") : "");
      navigator.clipboard.writeText(text).then(function () {
        copy.textContent = "Copied ✓";
        setTimeout(function () { copy.textContent = "Copy caption"; }, 1600);
      });
    });
  }

  var allVideos = [];
  function pauseOthers(v) { allVideos.forEach(function (o) { if (o !== v && !o.paused) o.pause(); }); }

  function addCard(el, i) {
    el.style.setProperty("--tilt", TILTS[i % TILTS.length] + "deg");
    el.style.setProperty("--tape", (i % 2 ? 4 : -3) + "deg");
    el.style.setProperty("--d", (i % 4) * 0.08 + "s");
    feedGrid.appendChild(el);
    feedCards.push(el);
    if (io) io.observe(el); else el.classList.add("in");
  }

  if (feedGrid) {
    var n = 0;
    (FEED.reels || []).forEach(function (r) {
      var el = document.createElement("article");
      el.className = "fcard fcard-reel reveal";
      el.dataset.kind = "reels";
      el.innerHTML =
        '<div class="fmedia">' +
          '<span class="fbadge">Reel · ' + esc(r.length || "") + "</span>" +
          (r.sound ? '<span class="fbadge fbadge-r">♪ Original audio</span>' : "") +
          '<video playsinline preload="none" poster="' + esc(r.poster) + '" aria-label="' + esc(r.title) + '"><source src="' + esc(r.video) + '" type="video/mp4"></video>' +
          '<button type="button" class="fplay" aria-label="Play reel: ' + esc(r.title) + '"><span></span></button>' +
          (r.sound ? '<button type="button" class="fsound" aria-label="Mute">🔊</button>' : "") +
          '<span class="fprog"></span>' +
        "</div>" +
        '<div class="fbody"><span class="fmeta">Reel' + (r.sound ? " · with sound" : "") + "</span><h3>" + esc(r.title) + "</h3>" + captionHTML(r) + "</div>";
      var v = el.querySelector("video");
      var prog = el.querySelector(".fprog");
      var snd = el.querySelector(".fsound");
      allVideos.push(v);
      el.querySelector(".fplay").addEventListener("click", function () { pauseOthers(v); v.play(); });
      v.addEventListener("click", function () { if (v.paused) { pauseOthers(v); v.play(); } else v.pause(); });
      v.addEventListener("play", function () { el.classList.add("playing"); });
      v.addEventListener("pause", function () { el.classList.remove("playing"); });
      v.addEventListener("ended", function () { el.classList.remove("playing"); prog.style.transform = "scaleX(0)"; });
      v.addEventListener("timeupdate", function () { if (v.duration) prog.style.transform = "scaleX(" + v.currentTime / v.duration + ")"; });
      if (snd) snd.addEventListener("click", function () {
        v.muted = !v.muted;
        snd.textContent = v.muted ? "🔇" : "🔊";
        snd.setAttribute("aria-label", v.muted ? "Unmute" : "Mute");
      });
      bindCaption(el, r);
      addCard(el, n++);
    });

    (FEED.posts || []).forEach(function (p) {
      var imgs = p.images || [];
      var multi = imgs.length > 1;
      var el = document.createElement("article");
      el.className = "fcard fcard-post reveal";
      el.dataset.kind = p.series || "";
      el.innerHTML =
        '<div class="fmedia">' +
          (multi ? '<span class="fbadge">Carousel · <b class="fcount">1</b>/' + imgs.length + "</span>" : "") +
          '<div class="ftrack">' + imgs.map(function (src, k) {
            return '<button type="button" aria-label="View ' + esc(p.title) + (multi ? ", image " + (k + 1) + " of " + imgs.length : "") + '"><img src="' + esc(src) + '" alt="' + esc(p.title) + (multi ? " (" + (k + 1) + "/" + imgs.length + ")" : "") + '" loading="lazy" width="720" height="900"></button>';
          }).join("") + "</div>" +
          (multi ? '<button type="button" class="farrow prev" aria-label="Previous slide" disabled>‹</button><button type="button" class="farrow next" aria-label="Next slide">›</button>' +
            '<div class="fdots" aria-hidden="true">' + imgs.map(function (_, k) { return '<i class="' + (k ? "" : "on") + '"></i>'; }).join("") + "</div>" : "") +
        "</div>" +
        '<div class="fbody"><span class="fmeta">' + esc(p.series || "Post") + (multi ? " · swipe" : "") + "</span><h3>" + esc(p.title) + "</h3>" + captionHTML(p) + "</div>";
      var track = el.querySelector(".ftrack");
      if (multi) {
        var prev = el.querySelector(".prev"), next = el.querySelector(".next");
        var dots = el.querySelectorAll(".fdots i"), count = el.querySelector(".fcount");
        var cur = function () { return Math.round(track.scrollLeft / track.clientWidth); };
        var go = function (k) { track.scrollTo({ left: k * track.clientWidth }); };
        prev.addEventListener("click", function () { go(cur() - 1); });
        next.addEventListener("click", function () { go(cur() + 1); });
        track.addEventListener("scroll", function () {
          var k = cur();
          dots.forEach(function (d, j) { d.classList.toggle("on", j === k); });
          count.textContent = k + 1;
          prev.disabled = k === 0;
          next.disabled = k === imgs.length - 1;
        }, { passive: true });
      }
      track.querySelectorAll("button").forEach(function (b, k) {
        b.addEventListener("click", function () { openLightbox(p, k); });
      });
      bindCaption(el, p);
      addCard(el, n++);
    });

    /* filter tabs */
    var tabs = document.querySelectorAll(".feed-tabs [data-filter]");
    tabs.forEach(function (t) {
      t.addEventListener("click", function () {
        var f = t.getAttribute("data-filter");
        tabs.forEach(function (o) { o.setAttribute("aria-selected", o === t ? "true" : "false"); });
        var shown = 0;
        feedCards.forEach(function (c) {
          var show = f === "all" || c.dataset.kind === f;
          c.classList.toggle("is-hidden", !show);
          c.classList.remove("pop");
          if (show && !reduce) {
            c.classList.add("in");
            c.style.animationDelay = (shown++ % 6) * 0.06 + "s";
            void c.offsetWidth; c.classList.add("pop");
          }
          if (!show) { var v = c.querySelector("video"); if (v && !v.paused) v.pause(); }
        });
      });
    });
  }

  /* lightbox for posts */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var lbItem = null, lbIndex = 0;
  function lbShow(k, dir) {
    var imgs = lbItem.images;
    lbIndex = Math.max(0, Math.min(imgs.length - 1, k));
    lbImg.src = imgs[lbIndex];
    lbImg.alt = lbItem.title + (imgs.length > 1 ? " (" + (lbIndex + 1) + "/" + imgs.length + ")" : "");
    lbCap.textContent = lbItem.title + (imgs.length > 1 ? "  ·  " + (lbIndex + 1) + " / " + imgs.length : "");
    lb.querySelector(".lb-prev").disabled = lbIndex === 0;
    lb.querySelector(".lb-next").disabled = lbIndex === imgs.length - 1;
    if (dir && !reduce) { lbImg.style.setProperty("--dir", dir > 0 ? "24px" : "-24px"); lbImg.classList.remove("swap"); void lbImg.offsetWidth; lbImg.classList.add("swap"); }
  }
  function openLightbox(item, k) {
    if (!lb || typeof lb.showModal !== "function") { window.open(item.images[k], "_blank", "noopener"); return; }
    lbItem = item; lbShow(k); lb.showModal();
  }
  if (lb) {
    lb.querySelector(".lb-close").addEventListener("click", function () { lb.close(); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { lbShow(lbIndex - 1, -1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { lbShow(lbIndex + 1, 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) lb.close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight") lbShow(lbIndex + 1, 1);
      if (e.key === "ArrowLeft") lbShow(lbIndex - 1, -1);
    });
  }

  /* ---------- random jokes ---------- */
  var JOKES = [
    "Newton's 1st law of projects: a project at rest stays at rest until someone says “urgent”.",
    "F = m × “bas ek chhota sa change”. Where m is the whole project.",
    "Mitochondria is the powerhouse of the cell. Your WhatsApp button is the powerhouse of your website.",
    "lim (days → ∞) of “kal pakka” = still kal.",
    "Activation energy: the effort needed to finally start the website you planned in 2019.",
    "Our websites have excellent bonding. Covalent with your customers, ionic with your competitors.",
    "Schrödinger's website: live and broken at the same time, until someone opens it on a ₹8,000 phone.",
    "sales_final_v2_FINAL(1).xlsx walks into a bar. The bartender asks, “Which version are you?”",
    "A website without a phone number is like chai without sugar. Technically fine. Nobody's happy.",
    "“Logo thoda bada karo.” Bigger. Bigger. Okay, now it's a billboard.",
    "There are 10 kinds of clients: those who read the quote, and those who say “bas thoda sa”.",
    "Entropy: your WhatsApp catalogue tends towards maximum disorder.",
    "Opportunity cost is the customer who searched for you and found the shop next door.",
    "Our code is like Pune weather: you know exactly what you're getting. Okay, bad example.",
    "Relativity: “thoda time lagega” is 2 days for us and 2 months somewhere else.",
    "We tried to make a joke about UDP. Not sure you got it.",
    "Friction: every extra form field is a speed breaker on the way to your inbox.",
    "Photosynthesis turns light into energy. We turn chai into working software.",
    "Why did the developer go broke? He used up all his cache.",
    "The best time to build a website was 10 years ago. The second best time is this week."
  ];
  var pool = JOKES.slice().sort(function () { return Math.random() - 0.5; });
  var pi = 0;
  function nextJoke() { var t = pool[pi % pool.length]; pi++; return t; }
  document.querySelectorAll("[data-joke]").forEach(function (n, i) {
    n.innerHTML = '<span class="joke-label">Random joke</span><span class="joke-text"></span><button type="button" class="joke-next">Another one ↻</button>';
    n.style.setProperty("--jr", (i % 2 ? 2.5 : -2.5) + "deg");
    var txt = n.querySelector(".joke-text");
    txt.textContent = nextJoke();
    n.querySelector(".joke-next").addEventListener("click", function () {
      n.classList.remove("pop"); void n.offsetWidth; n.classList.add("pop");
      txt.textContent = nextJoke();
    });
  });
  var fj = document.querySelector("[data-joke-text]");
  if (fj) fj.textContent = nextJoke();

  /* ---------- contact composer → WhatsApp / email ---------- */
  var form = document.getElementById("composer");
  if (form) {
  var preview = document.getElementById("preview");
  var mailBtn = document.getElementById("mail-btn");
  function compose() {
    var fd = new FormData(form);
    var name = (fd.get("name") || "").trim();
    var biz = (fd.get("biz") || "").trim();
    var msg = (fd.get("msg") || "").trim();
    var topic = fd.get("topic") || "a project";
    var lines = ["Hi VSp!k" + (name ? ", this is " + name : "") + "."];
    lines.push(topic === "the partner programme"
      ? "I'd like to join the partner programme."
      : "I'm interested in " + topic + (biz ? " for " + biz : "") + ".");
    if (topic === "the partner programme" && biz) lines.push("About me: " + biz + ".");
    if (msg) lines.push(msg);
    return lines.join("\n");
  }
  function update() {
    var text = compose();
    preview.textContent = text;
    mailBtn.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent("Project enquiry from website") + "&body=" + encodeURIComponent(text);
  }
  form.addEventListener("input", update);
  form.addEventListener("change", update);
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    window.open(wa(compose()), "_blank", "noopener");
  });
  update();
  }
})();
