/* Builds the story from js/content.js and handles reveals, music and effects. */
(() => {
  const C = window.GIFT, story = document.getElementById("story");
  const fill = s => s.replaceAll("{name}", C.name).replaceAll("{age}", C.age);
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  /* ---- Music (starts only after the open button is tapped) ---- */
  const audio = new Audio(C.music.src); audio.loop = true; audio.volume = C.music.volume ?? .6; audio.preload = "none";
  const soundBtn = document.getElementById("sound");
  let wantSound = false;
  const sync = () => soundBtn.classList.toggle("playing", wantSound && !audio.paused);
  audio.addEventListener("error", () => soundBtn.classList.add("off"));
  audio.addEventListener("play", sync); audio.addEventListener("pause", sync);
  soundBtn.addEventListener("click", () => {
    wantSound = !wantSound;
    if (wantSound) audio.play().catch(() => {}); else audio.pause();
    sync();
  });

  /* ---- Build scenes ---- */
  const makeImage = key => {
    const d = C.images[key], f = el("figure", "frame item" + (d.shape === "round" ? " round" : ""));
    f.dataset.parallax = "1"; f.style.aspectRatio = d.ratio || "4/5";
    f.append(el("span", "ph", d.src.split("/").pop()));
    const img = new Image(); img.alt = d.alt || ""; img.decoding = "async";
    img.onload = () => { f.classList.add("loaded"); if (d.shape !== "round") f.style.aspectRatio = "auto"; };
    img.src = d.src; f.append(img);
    f.addEventListener("click", () => { f.classList.add("pop"); setTimeout(() => f.classList.remove("pop"), 700); });
    return f;
  };

  const scenes = C.scenes.map(sc => {
    const sec = el("section", "scene scene--" + sc.type); sec.id = sc.id;
    const host = sc.card ? sec.appendChild(el("div", "card")) : sec;
    const items = sc.lines.map(L => {
      if (typeof L === "string") L = { t: L };
      let node;
      if (L.image) node = makeImage(L.image);
      else if (L.button) { node = el("button", "item open", L.button); node.type = "button"; node.id = "openBtn"; }
      else node = el("p", "item line " + (L.style || ""), fill(L.t));
      host.append(node);
      return { node, wait: L.wait ?? 1400 };
    });
    story.append(sec);
    return { sec, items, played: false };
  });

  const play = async s => {
    if (s.played) return; s.played = true;
    for (const it of s.items) { if (!reduce) await sleep(it.wait); it.node.classList.add("in"); }
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { const s = scenes.find(x => x.sec === e.target); if (s) play(s); }
  }), { rootMargin: "0px 0px -25% 0px" });
  scenes.forEach(s => io.observe(s.sec));

  /* ---- Open the gift ---- */
  document.getElementById("openBtn").addEventListener("click", e => {
    e.currentTarget.disabled = true;
    wantSound = true; audio.play().catch(() => {}); sync();
    document.body.classList.remove("locked");
    setTimeout(() => document.getElementById("twist").scrollIntoView({ behavior: reduce ? "auto" : "smooth" }), 500);
  });

  /* ---- Gentle parallax / zoom on photos (never crops them) ---- */
  const px = [...document.querySelectorAll("[data-parallax]")];
  let tick = false;
  const update = () => {
    tick = false; const vh = innerHeight;
    px.forEach(f => {
      const r = f.getBoundingClientRect(); if (r.bottom < -100 || r.top > vh + 100) return;
      const p = Math.min(1, Math.max(0, 1 - r.top / vh));
      f.style.translate = `0 ${((0.5 - p) * 28).toFixed(1)}px`;
      f.style.scale = (0.96 + 0.04 * Math.min(1, p * 1.6)).toFixed(3);
    });
  };
  if (!reduce) { addEventListener("scroll", () => { if (!tick) { tick = true; requestAnimationFrame(update); } }, { passive: true }); update(); }

  /* ---- Gold dust ---- */
  const cv = document.getElementById("dust"), cx = cv.getContext("2d");
  if (!reduce) {
    let w, h; const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => { w = cv.width = innerWidth * dpr; h = cv.height = innerHeight * dpr; };
    size(); addEventListener("resize", size);
    const n = innerWidth < 600 ? 28 : 55;
    const P = Array.from({ length: n }, () => ({ x: Math.random(), y: Math.random(), r: .6 + Math.random() * 1.6, v: .00008 + Math.random() * .00018, a: .15 + Math.random() * .4, o: Math.random() * 6 }));
    const frame = t => {
      cx.clearRect(0, 0, w, h);
      for (const p of P) {
        p.y -= p.v; if (p.y < -.02) { p.y = 1.02; p.x = Math.random(); }
        const x = (p.x + Math.sin(t / 3000 + p.o) * .015) * w, y = p.y * h;
        cx.beginPath(); cx.fillStyle = `rgba(201,164,92,${(p.a * (.6 + .4 * Math.sin(t / 900 + p.o))).toFixed(3)})`;
        cx.arc(x, y, p.r * dpr, 0, 7); cx.fill();
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
})();
