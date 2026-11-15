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
  function closeMenu() { menu.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
  btn.addEventListener("click", function () {
    var open = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", open ? "true" : "false");
  });
  menu.querySelectorAll("a").forEach(function (a) { a.addEventListener("click", closeMenu); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  /* ---------- scroll progress ---------- */
  var bar = document.getElementById("progress");
  var ticking = false;
  function onScroll() {
    var max = doc.scrollHeight - innerHeight;
    bar.style.transform = "scaleX(" + (max > 0 ? scrollY / max : 0) + ")";
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
  if (finePointer && !reduce) {
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
  tiles.querySelectorAll(".tile").forEach(function (t) {
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
  if (!projects.length) {
    empty.hidden = false;
  } else {
    projects.forEach(function (p, i) {
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
})();
