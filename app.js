/* ==========================================================================
   ζ₀ Interactive Academic Homepage Controller
   - Hero Cinema Stage (4K Mechanism / 5-Stage Rollout / 3-Min Overview + Chapters)
   - Real-World Unitree G1 Theater (6 Tasks + Hover-to-Preview Filmstrip + Telemetry)
   - HumanoidArena Synchronized Dual-View Video Explorer (7 Tasks + 7-Task Grid)
   - Interactive Benchmarks, Component Ablations, Body-Forecast & Author Highlight
   ========================================================================== */

(function () {
  "use strict";

  // ------------------------------------------------------------------------
  // 1. Verified Paper Data (exact numbers from Zeta0-Humanoid-Full.pdf)
  // ------------------------------------------------------------------------
  const HERO_MODES = {
    mechanism: {
      src: "assets/videos/00_mechanism_visual_4k.mp4",
      poster: "assets/posters/00_mechanism_visual_4k.jpg",
      meta: "4K · Conceptual Mechanism",
      badge: "Causal Whole-Body Foresight — Conceptual Visualization",
      desc: "From current egocentric vision and proprioception alone, <strong>ζ<sub>0</sub></strong> anticipates future scene features and 29 measured body joints over +0.2 / +0.4 / +0.6 s to condition whole-body action generation. <em>(Conceptual illustration of foresight; see quantitative closed-loop body predictions below.)</em>",
      muted: true,
      loop: true,
      chapters: false
    },
    rollout: {
      src: "assets/videos/real_01_tidy_scene.mp4?v=4",
      poster: "assets/posters/real_01_tidy_scene.jpg?v=4",
      meta: "1080p · Unitree G1 · 5.6×",
      badge: "Autonomous 5-Stage Scene Tidying · Unitree G1",
      desc: "A continuous 2-minute autonomous <strong>ζ<sub>0</sub> (GR00T)</strong> rollout without human intervention: moving the chair, discarding two pieces of trash, wiping the table, and placing the cloth on the plate—with synchronized head-camera input inset.",
      muted: true,
      loop: true,
      chapters: false
    },
    overview: {
      src: "assets/videos/zeta0_overview_public.mp4",
      poster: "assets/posters/zeta0_overview_public.jpg",
      meta: "1080p · 3:00 · English Narration & Subtitles",
      badge: "Full Narrated Presentation (3:00)",
      desc: "Complete 3-minute walkthrough of <strong>ζ<sub>0</sub></strong>: motivation, joint scene-and-body future latent representation, dual-response transfer, HumanoidArena simulation, six real-world Unitree G1 tasks, and ablation analysis.",
      muted: false,
      loop: false,
      chapters: true
    }
  };

  const OVERVIEW_CHAPTERS = [
    { t: 0,     label: "Hook" },
    { t: 13.8,  label: "Motivation" },
    { t: 36.6,  label: "Foresight" },
    { t: 47.6,  label: "Method" },
    { t: 91.1,  label: "Simulation" },
    { t: 118.7, label: "Real-World" },
    { t: 148.4, label: "Results" }
  ];

  const REAL_TASKS = [
    {
      id: "tidy_scene",
      title: "Tidy Scene",
      category: "multi",
      categoryLabel: "Multi-Stage · Long-Horizon",
      demos: 200,
      speedLabel: "5.6×",
      video: "assets/videos/real_01_tidy_scene.mp4?v=4",
      poster: "assets/posters/real_01_tidy_scene.jpg?v=4",
      prompt: "Tidy up the scene.",
      stages: [
        { label: "Move chair", start: 0.0, end: 1.5 },
        { label: "Pick trash 1", start: 1.5, end: 4.1 },
        { label: "Drop trash 1", start: 4.1, end: 6.4 },
        { label: "Pick trash 2", start: 6.4, end: 9.8 },
        { label: "Drop trash 2", start: 9.8, end: 12.1 },
        { label: "Return", start: 12.1, end: 14.2 },
        { label: "Wipe table", start: 14.2, end: 17.3 },
        { label: "Place cloth", start: 17.3, end: 19.02 }
      ],
      criterion: "Moves the chair, discards two pieces of trash into the bin, wipes the table, and places the cloth on the plate.",
      scores: { pi05: 10, psi0: 20, zpsi: 60, groot: 60, zgr: 70 },
      highlight: "Ψ₀ +40 pp · GR00T +10 pp"
    },
    {
      id: "clear_table",
      title: "Clear Table",
      category: "multi",
      categoryLabel: "Multi-Stage · Long-Horizon",
      demos: 86,
      speedLabel: "2.2×",
      video: "assets/videos/real_05_clear_table.mp4?v=4",
      poster: "assets/posters/real_05_clear_table.jpg?v=4",
      prompt: "Tidy up the table and put the trash into the bin.",
      stages: [
        { label: "Pick tape", start: 0.0, end: 3.68 },
        { label: "Into bin", start: 3.68, end: 6.41 },
        { label: "Pick toy", start: 6.41, end: 10.95 },
        { label: "Into bin", start: 10.95, end: 13.68 }
      ],
      criterion: "Sequentially grasps and drops both objects on the table into the trash bin.",
      scores: { pi05: 40, psi0: 50, zpsi: 80, groot: 70, zgr: 90 },
      highlight: "Ψ₀ +30 pp · GR00T +20 pp"
    },
    {
      id: "avoid_obstacle",
      title: "Avoid Obstacle",
      category: "multi",
      categoryLabel: "Multi-Stage · Long-Horizon",
      demos: 100,
      speedLabel: "2.2×",
      video: "assets/videos/real_06_avoid_obstacle.mp4?v=4",
      poster: "assets/posters/real_06_avoid_obstacle.jpg?v=4",
      prompt: "Place the tape on the table.",
      stages: [
        { label: "Grasp tape", start: 0.0, end: 1.50 },
        { label: "Turn", start: 1.50, end: 2.32 },
        { label: "Avoid obstacles", start: 2.32, end: 6.36 },
        { label: "Place on table", start: 6.36, end: 10.23 }
      ],
      criterion: "Picks up the tape, walks around the chair/box obstacle without collision, and places the tape on the target table.",
      scores: { pi05: 10, psi0: 40, zpsi: 50, groot: 60, zgr: 70 },
      highlight: "Ψ₀ +10 pp · GR00T +10 pp"
    },
    {
      id: "hair_drying",
      title: "Hair Drying",
      category: "single",
      categoryLabel: "Single-Stage · Human Interaction",
      demos: 81,
      speedLabel: "1.4×",
      video: "assets/videos/real_02_hair_drying.mp4?v=4",
      poster: "assets/posters/real_02_hair_drying.jpg?v=4",
      prompt: "Blow-dry the person's hair using a hair dryer.",
      stages: [
        { label: "Bring dryer", start: 0.0, end: 0.43 },
        { label: "Blow-dry", start: 0.43, end: 2.50 },
        { label: "Reposition", start: 2.50, end: 6.07 },
        { label: "Blow-dry", start: 6.07, end: 10.79 },
        { label: "Retract", start: 10.79, end: 11.57 }
      ],
      criterion: "Grasps the hair dryer handed over by a person, dries the person's hair for more than 5 s, and puts the dryer down.",
      scores: { pi05: 80, psi0: 90, zpsi: 100, groot: 90, zgr: 100 },
      highlight: "10 / 10 on both bases"
    },
    {
      id: "push_chair",
      title: "Push Chair",
      category: "single",
      categoryLabel: "Single-Stage · Loco-Manipulation",
      demos: 101,
      speedLabel: "2.2×",
      video: "assets/videos/real_03_push_chair.mp4?v=4",
      poster: "assets/posters/real_03_push_chair.jpg?v=4",
      prompt: "Place the chair in front of the table",
      stages: [
        { label: "Raise arms", start: 0.0, end: 1.14 },
        { label: "Grasp chair", start: 1.14, end: 7.50 },
        { label: "Push in", start: 7.50, end: 8.86 },
        { label: "Release", start: 8.86, end: 10.45 }
      ],
      criterion: "Walks to the chair, grasps it firmly, and pushes it cleanly under the table in an aligned position.",
      scores: { pi05: 80, psi0: 80, zpsi: 90, groot: 90, zgr: 90 },
      highlight: "9 / 10 on both bases"
    },
    {
      id: "place_doll",
      title: "Place Doll",
      category: "single",
      categoryLabel: "Single-Stage · Precision Pick & Place",
      demos: 100,
      speedLabel: "1.2×",
      video: "assets/videos/real_04_place_doll.mp4?v=4",
      poster: "assets/posters/real_04_place_doll.jpg?v=4",
      prompt: "place doll to plate",
      stages: [
        { label: "Approach", start: 0.0, end: 1.75 },
        { label: "Reach", start: 1.75, end: 5.25 },
        { label: "Grasp", start: 5.25, end: 6.58 },
        { label: "Carry", start: 6.58, end: 8.75 },
        { label: "Place", start: 8.75, end: 11.33 }
      ],
      criterion: "Walks to the table, grasps the doll, and places it cleanly onto the plate.",
      scores: { pi05: 80, psi0: 90, zpsi: 90, groot: 80, zgr: 90 },
      highlight: "9 / 10 on both bases"
    }
  ];

  const SIM_TASKS = [
    {
      id: "HOI_pp_box",
      name: "Pick & Place Box",
      third: "assets/videos/sim/HOI_pp_box_3rd.mp4",
      first: "assets/videos/sim/HOI_pp_box_1st.mp4",
      thirdPoster: "assets/posters/HOI_pp_box_3rd.jpg",
      firstPoster: "assets/posters/HOI_pp_box_1st.jpg",
      psi: [61.7, 85.0],
      groot: [86.7, 96.7],
      rmse: [4.11, 5.45],
      win: "50.6%"
    },
    {
      id: "HSI_vision_navi",
      name: "Visual Navigation",
      third: "assets/videos/sim/HSI_vision_navi_3rd.mp4",
      first: "assets/videos/sim/HSI_vision_navi_1st.mp4",
      thirdPoster: "assets/posters/HSI_vision_navi_3rd.jpg",
      firstPoster: "assets/posters/HSI_vision_navi_1st.jpg",
      psi: [40.0, 61.7],
      groot: [58.3, 78.3],
      rmse: [5.18, 11.18],
      win: "82.7%"
    },
    {
      id: "HOI_football",
      name: "Football",
      third: "assets/videos/sim/HOI_football_3rd.mp4",
      first: "assets/videos/sim/HOI_football_1st.mp4",
      thirdPoster: "assets/posters/HOI_football_3rd.jpg",
      firstPoster: "assets/posters/HOI_football_1st.jpg",
      psi: [26.7, 23.3],
      groot: [38.3, 56.7],
      rmse: [3.33, 7.39],
      win: "95.1%"
    },
    {
      id: "HSI_boxing",
      name: "Boxing",
      third: "assets/videos/sim/HSI_boxing_3rd.mp4",
      first: "assets/videos/sim/HSI_boxing_1st.mp4",
      thirdPoster: "assets/posters/HSI_boxing_3rd.jpg",
      firstPoster: "assets/posters/HSI_boxing_1st.jpg",
      psi: [50.0, 61.7],
      groot: [75.0, 88.3],
      rmse: [3.29, 6.46],
      win: "92.5%"
    },
    {
      id: "HSI_sit_sofa",
      name: "Sit Sofa",
      third: "assets/videos/sim/HSI_sit_sofa_3rd.mp4?v=9",
      first: "assets/videos/sim/HSI_sit_sofa_1st.mp4?v=9",
      thirdPoster: "assets/posters/HSI_sit_sofa_3rd.jpg?v=9",
      firstPoster: "assets/posters/HSI_sit_sofa_1st.jpg?v=9",
      psi: [63.3, 96.7],
      groot: [93.3, 95.0],
      rmse: [3.28, 8.00],
      win: "97.5%"
    },
    {
      id: "HSI_open_door",
      name: "Open Door",
      third: "assets/videos/sim/HSI_open_door_3rd.mp4",
      first: "assets/videos/sim/HSI_open_door_1st.mp4",
      thirdPoster: "assets/posters/HSI_open_door_3rd.jpg",
      firstPoster: "assets/posters/HSI_open_door_1st.jpg",
      psi: [65.0, 95.0],
      groot: [98.3, 96.7],
      rmse: [3.49, 5.52],
      win: "75.3%"
    },
    {
      id: "HOI_double_desk",
      name: "Double Desk",
      third: "assets/videos/sim/HOI_double_desk_3rd.mp4",
      first: "assets/videos/sim/HOI_double_desk_1st.mp4",
      thirdPoster: "assets/posters/HOI_double_desk_3rd.jpg",
      firstPoster: "assets/posters/HOI_double_desk_1st.jpg",
      psi: [6.7, 21.7],
      groot: [43.3, 45.0],
      rmse: [4.11, 7.12],
      win: "95.1%"
    }
  ];

  const SIM_BENCHMARK_ROWS = [
    { name: "HuGe-OFT", vals: [0.00, 48.33, 53.33, 73.33, 75.00, 55.00, 73.33], mean: 54.05 },
    { name: "HuGe-GR00T", vals: [15.00, 71.67, 81.67, 68.33, 95.00, 78.33, 56.67], mean: 66.67 },
    { name: "HuGe-Pi", vals: [11.67, 63.33, 76.67, 68.33, 88.33, 83.33, 63.33], mean: 65.00 },
    { name: "Kimodo-Policy", vals: [40.0, 35.0, 80.0, 66.7, 93.3, 96.7, 61.7], mean: 67.63 },
    { name: "Kimodo-Policy*", vals: [38.3, 40.0, 90.0, 68.3, 95.0, 96.7, 76.7], mean: 72.14 },
    { name: "Fast-WAM‡", vals: [45.00, 46.25, 73.75, 67.92, 85.42, 74.58, 35.00], mean: 61.13 },
    { name: "LingBot-VA‡", vals: [41.25, 51.67, 77.92, 72.92, 84.58, 77.08, 52.08], mean: 65.36 },
    { name: "GigaWorld-Policy 0.5‡", vals: [52.50, 62.08, 65.83, 73.33, 90.83, 74.17, 60.00], mean: 68.39 },
    { name: "ACT", vals: [11.67, 8.33, 76.67, 73.33, 73.33, 73.33, 48.33], mean: 52.14, divider: true },
    { name: "π₀.₅", vals: [11.67, 5.00, 80.00, 68.33, 75.00, 66.67, 50.00], mean: 50.95 },
    { name: "Ψ₀ (Base)", vals: [6.67, 26.67, 61.67, 50.00, 65.00, 63.33, 40.00], mean: 44.76 },
    { name: "ζ₀ (Ψ₀)", vals: [21.67, 23.33, 85.00, 61.67, 95.00, 96.67, 61.67], mean: 63.57, cls: "row-zeta-psi" },
    { name: "GR00T N1.7 (Base)", vals: [43.33, 38.33, 86.67, 75.00, 98.33, 93.33, 58.33], mean: 70.48 },
    { name: "ζ₀ (GR00T)", vals: [45.00, 56.67, 96.67, 88.33, 96.67, 95.00, 78.33], mean: 79.52, cls: "row-zeta-gr" }
  ];

  const REAL_BENCHMARK_ROWS = [
    { name: "π₀.₅", vals: [8, 8, 4, 1, 8, 1], mean: 50.00 },
    { name: "Ψ₀ (Base)", vals: [9, 8, 5, 4, 9, 2], mean: 61.67 },
    { name: "ζ₀ (Ψ₀)", vals: [10, 9, 8, 5, 9, 6], mean: 78.33, cls: "row-zeta-psi" },
    { name: "GR00T N1.7 (Base)", vals: [9, 9, 7, 6, 8, 6], mean: 75.00, divider: true },
    { name: "ζ₀ (GR00T)", vals: [10, 9, 9, 7, 9, 7], mean: 85.00, cls: "row-zeta-gr" }
  ];

  const ABLATION_DATA = {
    groot: [
      { key: "Full ζ₀ (GR00T)", sub: "Complete model (40k updates)", val: 79.52, delta: 0, isFull: true },
      { key: "w/o ER", sub: "Teacher response only", val: 77.14, delta: -2.38 },
      { key: "w/o AG", sub: "No action gradient G → H/F", val: 76.90, delta: -2.62 },
      { key: "w/o TR", sub: "Executing-policy response only", val: 75.24, delta: -4.29 },
      { key: "w/o DR", sub: "No dual-response transfer", val: 75.00, delta: -4.52 },
      { key: "w/o WL", sub: "No world latent MSE", val: 74.76, delta: -4.76 },
      { key: "w/o FC", sub: "No future conditioning in G", val: 73.33, delta: -6.19 },
      { key: "w/o BF", sub: "Visual future only (no body)", val: 73.10, delta: -6.43 },
      { key: "GR00T N1.7 Base", sub: "Without ζ₀ framework", val: 70.48, delta: -9.05, isBase: true }
    ],
    psi0: [
      { key: "Full ζ₀ (Ψ₀)", sub: "Complete model (40k updates)", val: 63.57, delta: 0, isFull: true },
      { key: "w/o WL", sub: "No world latent MSE", val: 61.90, delta: -1.67 },
      { key: "w/o ER", sub: "Teacher response only", val: 61.67, delta: -1.90 },
      { key: "w/o BF", sub: "Visual future only (no body)", val: 61.43, delta: -2.14 },
      { key: "w/o TR", sub: "Executing-policy response only", val: 60.95, delta: -2.62 },
      { key: "w/o AG", sub: "No action gradient G → H/F", val: 59.52, delta: -4.05 },
      { key: "w/o DR", sub: "No dual-response transfer", val: 58.10, delta: -5.48 },
      { key: "w/o FC", sub: "No future conditioning in G", val: 47.14, delta: -16.43 },
      { key: "Ψ₀ Base", sub: "Without ζ₀ framework", val: 44.76, delta: -18.81, isBase: true }
    ]
  };

  // ------------------------------------------------------------------------
  // Utilities
  // ------------------------------------------------------------------------
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function fmtTime(sec) {
    if (!Number.isFinite(sec) || sec < 0) return "0:00";
    const s = Math.floor(sec);
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? "0" : ""}${rem}`;
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 2600);
  }

  function bindPlayIcon(video, btn, viewport) {
    const iconPause = $(".icon-pause", btn);
    const iconPlay = $(".icon-play", btn);
    const sync = () => {
      const paused = video.paused;
      if (iconPause) iconPause.style.display = paused ? "none" : "block";
      if (iconPlay) iconPlay.style.display = paused ? "block" : "none";
      if (viewport) viewport.classList.toggle("paused", paused);
    };
    video.addEventListener("play", sync);
    video.addEventListener("pause", sync);
    video.addEventListener("ended", sync);
    sync();
  }

  function safeSeek(video, targetSec, shouldPlay = false) {
    const apply = () => {
      const dur = video.duration;
      const clamped = Number.isFinite(dur) && dur > 0 ? Math.max(0, Math.min(targetSec, dur - 0.05)) : Math.max(0, targetSec);
      video.currentTime = clamped;
      if (shouldPlay && video.paused) video.play().catch(() => {});
    };
    if (video.readyState >= 1) {
      apply();
    } else {
      video.addEventListener("loadedmetadata", apply, { once: true });
      video.load();
    }
  }

  function bindScrubber(wrap, onSeekFrac) {
    let dragging = false;
    const calc = (clientX) => {
      const rect = wrap.getBoundingClientRect();
      return Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    };
    wrap.addEventListener("pointerdown", (e) => {
      e.stopPropagation();
      dragging = true;
      wrap.setPointerCapture(e.pointerId);
      onSeekFrac(calc(e.clientX));
    });
    wrap.addEventListener("pointermove", (e) => {
      if (dragging) onSeekFrac(calc(e.clientX));
    });
    wrap.addEventListener("pointerup", () => { dragging = false; });
    wrap.addEventListener("click", (e) => e.stopPropagation());
  }

  // ------------------------------------------------------------------------
  // 2. Sticky Nav & Author-Affiliation Cross-Highlight
  // ------------------------------------------------------------------------
  const siteNav = $("#siteNav");
  window.addEventListener("scroll", () => {
    siteNav.classList.toggle("scrolled", window.scrollY > 12);
  }, { passive: true });

  // Interactive author <-> affiliation highlight
  const authorEls = $$(".author");
  const affEls = $$(".aff-item");

  affEls.forEach((affEl) => {
    const id = affEl.dataset.aff;
    affEl.addEventListener("mouseenter", () => {
      affEl.classList.add("hl");
      authorEls.forEach((a) => {
        if ((a.dataset.affs || "").split(",").includes(id)) a.classList.add("hl");
      });
    });
    affEl.addEventListener("mouseleave", () => {
      affEl.classList.remove("hl");
      authorEls.forEach((a) => a.classList.remove("hl"));
    });
  });

  authorEls.forEach((aEl) => {
    const ids = (aEl.dataset.affs || "").split(",");
    aEl.addEventListener("mouseenter", () => {
      aEl.classList.add("hl");
      affEls.forEach((af) => {
        if (ids.includes(af.dataset.aff)) af.classList.add("hl");
      });
    });
    aEl.addEventListener("mouseleave", () => {
      aEl.classList.remove("hl");
      affEls.forEach((af) => af.classList.remove("hl"));
    });
  });

  // Coming Soon toast buttons
  $$("[data-toast]").forEach((btn) => {
    btn.addEventListener("click", () => showToast(btn.dataset.toast));
  });

  // ------------------------------------------------------------------------
  // 3. Flagship Hero Cinema Stage
  // ------------------------------------------------------------------------
  const heroVideo = $("#heroVideo");
  const heroViewport = heroVideo.closest(".cinema-viewport");
  const heroPlayBtn = $("#heroPlayBtn");
  const heroPlayOverlay = $("#heroPlayOverlay");
  const heroMuteBtn = $("#heroMuteBtn");
  const heroTime = $("#heroTime");
  const heroProgressWrap = $("#heroProgressWrap");
  const heroProgressFill = $("#heroProgressFill");
  const heroChapterTicks = $("#heroChapterTicks");
  const heroChapterStrip = $("#heroChapterStrip");
  const heroFullscreenBtn = $("#heroFullscreenBtn");

  let currentHeroMode = "overview";

  function syncMuteUI() {
    const muted = heroVideo.muted;
    $(".icon-muted", heroMuteBtn).style.display = muted ? "block" : "none";
    $(".icon-unmuted", heroMuteBtn).style.display = muted ? "none" : "block";
  }

  function switchHeroMode(modeKey, autoPlay = true) {
    const cfg = HERO_MODES[modeKey];
    if (!cfg) return;
    currentHeroMode = modeKey;

    $$(".stage-tab").forEach((t) => {
      const on = t.dataset.heroMode === modeKey;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });

    $("#heroMetaBadge").textContent = cfg.meta;
    $("#heroCaptionTitle").textContent = cfg.badge;
    $("#heroDesc").innerHTML = cfg.desc;
    heroChapterStrip.hidden = !cfg.chapters;

    heroVideo.pause();
    heroVideo.src = cfg.src;
    heroVideo.poster = cfg.poster;
    heroVideo.muted = cfg.muted;
    heroVideo.loop = cfg.loop;
    heroVideo.playbackRate = 1;
    $$('[data-speed-for="hero"] .speed-btn').forEach((b) =>
      b.classList.toggle("active", b.dataset.rate === "1")
    );
    syncMuteUI();
    heroProgressFill.style.width = "0%";
    heroVideo.load();

    // Render chapter tick marks for overview mode
    heroChapterTicks.innerHTML = "";
    if (cfg.chapters) {
      const approxDur = 180;
      OVERVIEW_CHAPTERS.forEach((ch) => {
        if (ch.t === 0) return;
        const tick = document.createElement("div");
        tick.className = "hud-tick";
        tick.style.left = `${(ch.t / approxDur) * 100}%`;
        heroChapterTicks.appendChild(tick);
      });
    }

    if (autoPlay) {
      heroVideo.play().catch(() => {
        // Browser blocked unmuted autoplay — fallback to muted
        heroVideo.muted = true;
        syncMuteUI();
        heroVideo.play().catch(() => {});
      });
    }
  }

  $$(".stage-tab").forEach((tab) => {
    tab.addEventListener("click", () => switchHeroMode(tab.dataset.heroMode, true));
  });

  $("#jumpOverviewVideo").addEventListener("click", () => {
    $("#hero-stage").scrollIntoView({ behavior: "smooth", block: "start" });
    switchHeroMode("overview", true);
  });

  const toggleHeroPlay = () => {
    if (heroVideo.paused) heroVideo.play().catch(() => {});
    else heroVideo.pause();
  };
  heroPlayBtn.addEventListener("click", toggleHeroPlay);
  heroPlayOverlay.addEventListener("click", toggleHeroPlay);
  heroVideo.addEventListener("click", toggleHeroPlay);

  heroMuteBtn.addEventListener("click", () => {
    heroVideo.muted = !heroVideo.muted;
    syncMuteUI();
  });

  heroFullscreenBtn.addEventListener("click", () => {
    if (heroVideo.requestFullscreen) heroVideo.requestFullscreen();
    else if (heroVideo.webkitEnterFullscreen) heroVideo.webkitEnterFullscreen();
  });

  $$('[data-speed-for="hero"] .speed-btn').forEach((btn) => {
    btn.addEventListener("click", () => {
      heroVideo.playbackRate = parseFloat(btn.dataset.rate);
      $$('[data-speed-for="hero"] .speed-btn').forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  bindPlayIcon(heroVideo, heroPlayBtn, heroViewport);
  bindScrubber(heroProgressWrap, (frac) => {
    if (heroVideo.duration) heroVideo.currentTime = frac * heroVideo.duration;
  });

  const updateHeroTime = () => {
    const dur = heroVideo.duration || 0;
    const cur = heroVideo.currentTime || 0;
    heroTime.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;
    if (dur > 0) heroProgressFill.style.width = `${(cur / dur) * 100}%`;
  };
  heroVideo.addEventListener("loadedmetadata", updateHeroTime);
  heroVideo.addEventListener("timeupdate", () => {
    updateHeroTime();
    const cur = heroVideo.currentTime || 0;

    if (currentHeroMode === "overview") {
      let activeIdx = 0;
      OVERVIEW_CHAPTERS.forEach((ch, idx) => {
        if (cur >= ch.t - 0.3) activeIdx = idx;
      });
      $$(".chapter-pill", heroChapterStrip).forEach((p, idx) =>
        p.classList.toggle("active", idx === activeIdx)
      );
    }
  });

  $$(".chapter-pill", heroChapterStrip).forEach((pill) => {
    pill.addEventListener("click", () => {
      safeSeek(heroVideo, parseFloat(pill.dataset.seek), true);
    });
  });

  // Render initial chapter ticks for default 3-min overview mode
  (function initHeroTicks() {
    const approxDur = 180;
    OVERVIEW_CHAPTERS.forEach((ch) => {
      if (ch.t === 0) return;
      const tick = document.createElement("div");
      tick.className = "hud-tick";
      tick.style.left = `${(ch.t / approxDur) * 100}%`;
      heroChapterTicks.appendChild(tick);
    });
  })();
  syncMuteUI();

  // ------------------------------------------------------------------------
  // 4. Real-World Unitree G1 Video Theater (6 Tasks + Hover Filmstrip)
  // ------------------------------------------------------------------------
  const realMainVideo = $("#realMainVideo");
  const realViewport = realMainVideo.closest(".cinema-viewport");
  const realPlayBtn = $("#realPlayBtn");
  const realPlayOverlay = $("#realPlayOverlay");
  const realTime = $("#realTime");
  const realProgressWrap = $("#realProgressWrap");
  const realProgressFill = $("#realProgressFill");
  const realFilmstrip = $("#realFilmstrip");

  let activeRealIdx = 0;
  let activeRealFilter = "all";

  function buildRealFilmstrip() {
    realFilmstrip.innerHTML = "";
    REAL_TASKS.forEach((task, idx) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "film-card" + (idx === activeRealIdx ? " active" : "");
      card.dataset.idx = idx;
      card.dataset.category = task.category;
      card.innerHTML = `
        <div class="film-thumb">
          <img src="${task.poster}" alt="${task.title} preview" loading="lazy" />
          <video muted loop playsinline preload="none" data-src="${task.video}"></video>
          <span class="film-badge">${task.speedLabel}</span>
        </div>
        <div class="film-body">
          <div class="film-title">${task.title}</div>
          <div class="film-score">ζ₀ (GR00T) ${task.scores.zgr}%</div>
        </div>
      `;

      // Hover-to-preview muted clip inside thumbnail!
      const previewVid = $("video", card);
      card.addEventListener("mouseenter", () => {
        if (!previewVid.src) previewVid.src = previewVid.dataset.src;
        previewVid.play().catch(() => {});
      });
      card.addEventListener("mouseleave", () => {
        previewVid.pause();
      });
      card.addEventListener("click", () => selectRealTask(idx, true));

      realFilmstrip.appendChild(card);
    });
  }

  function selectRealTask(idx, shouldPlay = true) {
    activeRealIdx = idx;
    const task = REAL_TASKS[idx];

    $$(".film-card", realFilmstrip).forEach((c) =>
      c.classList.toggle("active", Number(c.dataset.idx) === idx)
    );

    // Update Telemetry Panel
    const badge = $("#realCategoryBadge");
    badge.textContent = task.categoryLabel;
    badge.className = "tag-pill " + (task.category === "multi" ? "tag-multi" : "tag-single");
    $("#realDemosBadge").textContent = `${task.demos} demos`;
    $("#realTaskTitle").textContent = task.title;
    $("#realTaskPrompt").textContent = `"${task.prompt}"`;
    $("#realTaskCriterion").textContent = task.criterion;

    // Interactive Stage chips (synced live with video & click-to-seek!)
    const stageWrap = $("#realStageChips");
    stageWrap.innerHTML = task.stages
      .map(
        (s, i) =>
          `<button type="button" class="stage-chip" data-stage-idx="${i}" data-start="${s.start}" data-end="${s.end}">${s.label}</button>${i < task.stages.length - 1 ? '<span class="stage-arrow">&rarr;</span>' : ""}`
      )
      .join("");
    $$(".stage-chip", stageWrap).forEach((chip) => {
      chip.addEventListener("click", () => {
        safeSeek(realMainVideo, parseFloat(chip.dataset.start), true);
      });
    });

    // Mini animated horizontal bars
    const rows = [
      { label: "π₀.₅", val: task.scores.pi05, cls: "fill-pi" },
      { label: "Ψ₀", val: task.scores.psi0, cls: "fill-psi" },
      { label: "ζ₀ (Ψ₀)", val: task.scores.zpsi, cls: "fill-zpsi", zeta: true },
      { label: "GR00T N1.7", val: task.scores.groot, cls: "fill-gr" },
      { label: "ζ₀ (GR00T)", val: task.scores.zgr, cls: "fill-zgr", zeta: true }
    ];
    $("#realMiniBars").innerHTML = rows
      .map(
        (r) => `
      <div class="mini-bar-row">
        <span class="mini-bar-name ${r.zeta ? "is-zeta" : ""}">${r.label}</span>
        <div class="mini-bar-track"><div class="mini-bar-fill ${r.cls}" style="width:${r.val}%"></div></div>
        <span class="mini-bar-val ${r.zeta ? "is-zeta" : ""}">${r.val}%</span>
      </div>`
      )
      .join("");

    // Update main video
    const prevRate = realMainVideo.playbackRate || 1;
    realMainVideo.pause();
    realMainVideo.src = task.video;
    realMainVideo.poster = task.poster;
    realMainVideo.playbackRate = prevRate;
    realProgressFill.style.width = "0%";
    realMainVideo.load();
    if (shouldPlay) realMainVideo.play().catch(() => {});
  }

  function getVisibleRealIndices() {
    return REAL_TASKS.map((t, i) => ({ t, i }))
      .filter(({ t }) => activeRealFilter === "all" || t.category === activeRealFilter)
      .map(({ i }) => i);
  }

  $$("#realFilterPills .filter-pill").forEach((pill) => {
    pill.addEventListener("click", () => {
      activeRealFilter = pill.dataset.filter;
      $$("#realFilterPills .filter-pill").forEach((p) => p.classList.toggle("active", p === pill));
      $$(".film-card", realFilmstrip).forEach((card) => {
        const match = activeRealFilter === "all" || card.dataset.category === activeRealFilter;
        card.classList.toggle("is-hidden", !match);
      });
      const visible = getVisibleRealIndices();
      if (!visible.includes(activeRealIdx) && visible.length) {
        selectRealTask(visible[0], true);
      }
    });
  });

  $("#realPrevBtn").addEventListener("click", () => {
    const visible = getVisibleRealIndices();
    const pos = visible.indexOf(activeRealIdx);
    const nextIdx = visible[(pos - 1 + visible.length) % visible.length];
    selectRealTask(nextIdx, true);
  });

  $("#realNextBtn").addEventListener("click", () => {
    const visible = getVisibleRealIndices();
    const pos = visible.indexOf(activeRealIdx);
    const nextIdx = visible[(pos + 1) % visible.length];
    selectRealTask(nextIdx, true);
  });

  const toggleRealPlay = () => {
    if (realMainVideo.paused) realMainVideo.play().catch(() => {});
    else realMainVideo.pause();
  };
  realPlayBtn.addEventListener("click", toggleRealPlay);
  realPlayOverlay.addEventListener("click", toggleRealPlay);
  realMainVideo.addEventListener("click", toggleRealPlay);

  $("#realFullscreenBtn").addEventListener("click", () => {
    if (realMainVideo.requestFullscreen) realMainVideo.requestFullscreen();
    else if (realMainVideo.webkitEnterFullscreen) realMainVideo.webkitEnterFullscreen();
  });

  $$('[data-speed-for="real"] .speed-btn').forEach((btn) => {
    btn.addEventListener("click", () => {
      realMainVideo.playbackRate = parseFloat(btn.dataset.rate);
      $$('[data-speed-for="real"] .speed-btn').forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  bindPlayIcon(realMainVideo, realPlayBtn, realViewport);
  bindScrubber(realProgressWrap, (frac) => {
    if (realMainVideo.duration) realMainVideo.currentTime = frac * realMainVideo.duration;
  });

  const updateRealTime = () => {
    const dur = realMainVideo.duration || 0;
    const cur = realMainVideo.currentTime || 0;
    realTime.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;
    if (dur > 0) realProgressFill.style.width = `${(cur / dur) * 100}%`;

    // Sync active & completed stage chips live with the V4 video's StageBar
    $$(".stage-chip", $("#realStageChips")).forEach((chip) => {
      const s = parseFloat(chip.dataset.start);
      const e = parseFloat(chip.dataset.end);
      const active = cur >= s && cur < e;
      const done = cur >= e;
      chip.classList.toggle("is-active", active);
      chip.classList.toggle("is-done", done);
    });
  };
  realMainVideo.addEventListener("loadedmetadata", updateRealTime);
  realMainVideo.addEventListener("timeupdate", updateRealTime);

  buildRealFilmstrip();
  selectRealTask(0, false);

  // ------------------------------------------------------------------------
  // 5. HumanoidArena Synchronized Dual-View Video Explorer
  // ------------------------------------------------------------------------
  const simTaskTabs = $("#simTaskTabs");
  const simThird = $("#simThirdVideo");
  const simFirst = $("#simFirstVideo");
  const simPlayBtn = $("#simPlayBtn");
  const simTime = $("#simTime");
  const simProgressWrap = $("#simProgressWrap");
  const simProgressFill = $("#simProgressFill");
  const simTelemetry = $("#simTelemetryStrip");
  const simDualPanel = $("#simDualPanel");
  const simGridPanel = $("#simGridPanel");
  const simGridVideo = $("#simGridVideo");

  let activeSimIdx = 0;

  function buildSimTabs() {
    simTaskTabs.innerHTML = "";
    SIM_TASKS.forEach((task, idx) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "sim-task-tab" + (idx === activeSimIdx ? " active" : "");
      btn.innerHTML = `${task.name} <span class="sim-tab-rate">${task.groot[1].toFixed(1)}%</span>`;
      btn.addEventListener("click", () => selectSimTask(idx, true));
      simTaskTabs.appendChild(btn);
    });
  }

  function selectSimTask(idx, shouldPlay = true) {
    activeSimIdx = idx;
    const task = SIM_TASKS[idx];

    $$(".sim-task-tab", simTaskTabs).forEach((b, i) => b.classList.toggle("active", i === idx));

    const rate = simThird.playbackRate || 1;
    simThird.pause();
    simFirst.pause();
    simThird.src = task.third;
    simThird.poster = task.thirdPoster;
    simFirst.src = task.first;
    simFirst.poster = task.firstPoster;
    simThird.playbackRate = rate;
    simFirst.playbackRate = rate;
    simProgressFill.style.width = "0%";
    simThird.load();
    simFirst.load();

    const gDiff = (task.groot[1] - task.groot[0]).toFixed(1);
    const pDiff = (task.psi[1] - task.psi[0]).toFixed(1);
    simTelemetry.innerHTML = `
      <div class="sim-stat-cell">
        <div class="sim-stat-k">ζ₀ (GR00T) vs. GR00T</div>
        <div class="sim-stat-v">${task.groot[1].toFixed(1)}% <span class="gain">${Number(gDiff) >= 0 ? "+" : ""}${gDiff} pp</span></div>
      </div>
      <div class="sim-stat-cell">
        <div class="sim-stat-k">ζ₀ (Ψ₀) vs. Ψ₀</div>
        <div class="sim-stat-v">${task.psi[1].toFixed(1)}% <span class="gain">${Number(pDiff) >= 0 ? "+" : ""}${pDiff} pp</span></div>
      </div>
      <div class="sim-stat-cell">
        <div class="sim-stat-k">Body Forecast RMSE (0–0.6 s)</div>
        <div class="sim-stat-v">${task.rmse[0].toFixed(2)}&deg; <span class="gain">vs. ${task.rmse[1].toFixed(2)}&deg; hold</span></div>
      </div>
      <div class="sim-stat-cell">
        <div class="sim-stat-k">Beats Hold Pose (+0.6 s)</div>
        <div class="sim-stat-v">${task.win} <span class="gain">closed-loop</span></div>
      </div>
    `;

    if (shouldPlay) {
      Promise.all([simThird.play(), simFirst.play()]).catch(() => {});
    }
  }

  const toggleSimPlay = () => {
    if (simThird.paused) {
      simFirst.currentTime = simThird.currentTime;
      simThird.play().catch(() => {});
      simFirst.play().catch(() => {});
    } else {
      simThird.pause();
      simFirst.pause();
    }
  };
  simPlayBtn.addEventListener("click", toggleSimPlay);
  simThird.addEventListener("click", toggleSimPlay);
  simFirst.addEventListener("click", toggleSimPlay);
  bindPlayIcon(simThird, simPlayBtn, null);

  // Keep 1st-person synced tightly to 3rd-person master & show duration immediately on metadata load
  const updateSimTime = () => {
    const dur = simThird.duration || 0;
    const cur = simThird.currentTime || 0;
    simTime.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;
    if (dur > 0) simProgressFill.style.width = `${(cur / dur) * 100}%`;
  };
  simThird.addEventListener("loadedmetadata", updateSimTime);
  simThird.addEventListener("timeupdate", () => {
    updateSimTime();
    const cur = simThird.currentTime || 0;
    if (Math.abs(simFirst.currentTime - cur) > 0.08 && simFirst.readyState >= 2) {
      simFirst.currentTime = cur;
    }
  });

  bindScrubber(simProgressWrap, (frac) => {
    if (simThird.duration) {
      const target = frac * simThird.duration;
      simThird.currentTime = target;
      if (simFirst.duration) simFirst.currentTime = Math.min(target, simFirst.duration - 0.02);
    }
  });

  $$('[data-speed-for="sim"] .speed-btn').forEach((btn) => {
    btn.addEventListener("click", () => {
      const r = parseFloat(btn.dataset.rate);
      simThird.playbackRate = r;
      simFirst.playbackRate = r;
      $$('[data-speed-for="sim"] .speed-btn').forEach((b) => b.classList.toggle("active", b === btn));
    });
  });

  // Custom Studio HUD for 7-Task Simultaneous Grid video
  const simGridViewport = $("#simGridViewport");
  const simGridPlayBtn = $("#simGridPlayBtn");
  const simGridPlayOverlay = $("#simGridPlayOverlay");
  const simGridProgressWrap = $("#simGridProgressWrap");
  const simGridProgressFill = $("#simGridProgressFill");
  const simGridTime = $("#simGridTime");

  const toggleSimGridPlay = () => {
    if (simGridVideo.paused) simGridVideo.play().catch(() => {});
    else simGridVideo.pause();
  };
  simGridPlayBtn.addEventListener("click", toggleSimGridPlay);
  simGridPlayOverlay.addEventListener("click", toggleSimGridPlay);
  simGridVideo.addEventListener("click", toggleSimGridPlay);
  bindPlayIcon(simGridVideo, simGridPlayBtn, simGridViewport);
  bindScrubber(simGridProgressWrap, (frac) => {
    if (simGridVideo.duration) simGridVideo.currentTime = frac * simGridVideo.duration;
  });
  const updateSimGridTime = () => {
    const dur = simGridVideo.duration || 0;
    const cur = simGridVideo.currentTime || 0;
    simGridTime.textContent = `${fmtTime(cur)} / ${fmtTime(dur)}`;
    if (dur > 0) simGridProgressFill.style.width = `${(cur / dur) * 100}%`;
  };
  simGridVideo.addEventListener("loadedmetadata", updateSimGridTime);
  simGridVideo.addEventListener("timeupdate", updateSimGridTime);
  $$('[data-speed-for="simgrid"] .speed-btn').forEach((btn) => {
    btn.addEventListener("click", () => {
      simGridVideo.playbackRate = parseFloat(btn.dataset.rate);
      $$('[data-speed-for="simgrid"] .speed-btn').forEach((b) => b.classList.toggle("active", b === btn));
    });
  });
  $("#simGridFullscreenBtn").addEventListener("click", () => {
    if (simGridVideo.requestFullscreen) simGridVideo.requestFullscreen();
    else if (simGridVideo.webkitEnterFullscreen) simGridVideo.webkitEnterFullscreen();
  });

  // Switch Dual-View vs 7-Task Grid
  $$("[data-sim-mode]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.simMode;
      $$("[data-sim-mode]").forEach((b) => b.classList.toggle("active", b === btn));
      const isDual = mode === "dual";
      simDualPanel.hidden = !isDual;
      simGridPanel.hidden = isDual;
      if (isDual) {
        simGridVideo.pause();
        simThird.play().catch(() => {});
        simFirst.play().catch(() => {});
      } else {
        simThird.pause();
        simFirst.pause();
        simGridVideo.play().catch(() => {});
      }
    });
  });

  buildSimTabs();
  selectSimTask(0, false);

  // Smart IntersectionObserver: auto-play visible muted video stages & auto-pause offscreen (including hero audio!)
  const stageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const el = entry.target;
        if (el === heroVideo) {
          if (!entry.isIntersecting && !heroVideo.paused) heroVideo.pause();
        } else if (el === realMainVideo) {
          if (entry.isIntersecting) realMainVideo.play().catch(() => {});
          else realMainVideo.pause();
        } else if (el === simDualPanel && !simDualPanel.hidden) {
          if (entry.isIntersecting) {
            simThird.play().catch(() => {});
            simFirst.play().catch(() => {});
          } else {
            simThird.pause();
            simFirst.pause();
          }
        } else if (el === simGridPanel && !simGridPanel.hidden) {
          if (entry.isIntersecting) simGridVideo.play().catch(() => {});
          else simGridVideo.pause();
        }
      });
    },
    { threshold: 0.35 }
  );
  stageObserver.observe(heroVideo);
  stageObserver.observe(realMainVideo);
  stageObserver.observe(simDualPanel);
  stageObserver.observe(simGridPanel);

  // Prevent hero audio from playing while user interacts with lower video sections
  realMainVideo.addEventListener("play", () => {
    if (!heroVideo.paused && !heroVideo.muted) heroVideo.pause();
  });
  simThird.addEventListener("play", () => {
    if (!heroVideo.paused && !heroVideo.muted) heroVideo.pause();
  });
  simGridVideo.addEventListener("play", () => {
    if (!heroVideo.paused && !heroVideo.muted) heroVideo.pause();
  });

  // ------------------------------------------------------------------------
  // 6. Interactive Quantitative Results & Ablations
  // ------------------------------------------------------------------------
  function renderSimTable() {
    const tbody = $("#simBenchmarkTable tbody");
    const colBest = [0, 1, 2, 3, 4, 5, 6].map((c) =>
      Math.max(...SIM_BENCHMARK_ROWS.map((r) => r.vals[c]))
    );
    const meanBest = Math.max(...SIM_BENCHMARK_ROWS.map((r) => r.mean));

    tbody.innerHTML = SIM_BENCHMARK_ROWS.map((row) => {
      const classes = [row.cls || "", row.divider ? "row-divider" : ""].filter(Boolean).join(" ");
      const cells = row.vals
        .map((v, c) => `<td class="${v === colBest[c] ? "best-val" : ""}">${v.toFixed(1)}</td>`)
        .join("");
      return `
        <tr class="${classes}">
          <td>${row.name}</td>
          ${cells}
          <td class="${row.mean === meanBest ? "best-val" : ""}">
            <div class="mean-cell">
              <div class="mean-bar-bg"><div class="mean-bar-fill" style="width:${row.mean}%"></div></div>
              <span>${row.mean.toFixed(2)}</span>
            </div>
          </td>
        </tr>`;
    }).join("");
  }

  function renderRealTable() {
    const tbody = $("#realBenchmarkTable tbody");
    tbody.innerHTML = REAL_BENCHMARK_ROWS.map((row) => {
      const classes = [row.cls || "", row.divider ? "row-divider" : ""].filter(Boolean).join(" ");
      const cells = row.vals.map((v) => `<td>${v} / 10</td>`).join("");
      return `
        <tr class="${classes}">
          <td>${row.name}</td>
          ${cells}
          <td class="${row.mean === 85.00 ? "best-val" : ""}">
            <div class="mean-cell">
              <div class="mean-bar-bg"><div class="mean-bar-fill" style="width:${row.mean}%"></div></div>
              <span>${row.mean.toFixed(2)}</span>
            </div>
          </td>
        </tr>`;
    }).join("");
  }

  function renderAblations(baseKey) {
    const rows = ABLATION_DATA[baseKey];
    const color = baseKey === "groot" ? "var(--body)" : "var(--scene)";
    const muted = baseKey === "groot" ? "#7ec4b7" : "#89b2d9";
    $("#ablationChart").innerHTML = rows
      .map((r) => {
        const bg = r.isFull ? color : r.isBase ? "#94a3b8" : muted;
        const deltaHtml = r.isFull
          ? `<span class="abl-delta is-full">Full</span>`
          : `<span class="abl-delta">${r.delta.toFixed(2)} pp</span>`;
        return `
          <div class="abl-row">
            <div class="abl-label">${r.key}<span>${r.sub}</span></div>
            <div class="abl-track"><div class="abl-fill" style="width:${r.val}%;background:${bg}"></div></div>
            <div class="abl-nums"><strong>${r.val.toFixed(2)}%</strong>${deltaHtml}</div>
          </div>`;
      })
      .join("");
  }

  $$("#resultsTabs .res-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.resTab;
      $$("#resultsTabs .res-tab").forEach((t) => t.classList.toggle("active", t === tab));
      $$(".res-panel").forEach((p) => p.classList.toggle("active", p.id === `panel-${id}`));
    });
  });

  $$("#ablationBaseToggle .base-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$("#ablationBaseToggle .base-btn").forEach((b) => b.classList.toggle("active", b === btn));
      renderAblations(btn.dataset.base);
    });
  });

  renderSimTable();
  renderRealTable();
  renderAblations("groot");

  // ------------------------------------------------------------------------
  // 7. Image Lightbox & BibTeX Copy
  // ------------------------------------------------------------------------
  const lightbox = $("#lightbox");
  const lightboxImg = $("#lightboxImg");
  const lightboxCaption = $("#lightboxCaption");

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    lightboxImg.alt = caption || "";
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
  }

  $$(".zoomable").forEach((el) => {
    el.addEventListener("click", () => openLightbox(el.dataset.zoomSrc, el.dataset.zoomCaption));
  });

  $("#lightboxClose").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });

  // Copy BibTeX
  const copyBtn = $("#copyBibtexBtn");
  const copyLabel = $("#copyBibtexLabel");
  copyBtn.addEventListener("click", async () => {
    const text = $("#bibtexCode").textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    copyBtn.classList.add("copied");
    copyLabel.textContent = "Copied!";
    showToast("BibTeX copied to clipboard.");
    setTimeout(() => {
      copyBtn.classList.remove("copied");
      copyLabel.textContent = "Copy BibTeX";
    }, 2000);
  });
})();
