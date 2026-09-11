const projects = window.PORTFOLIO_PROJECTS || [];
const byId = id => document.getElementById(id);

function placeholder(message) {
  return ``;
}

function imageMarkup(project, file, alt) {
  const src = `${project.folder}${file}`;
  return `<button class="gallery-item" type="button" data-lightbox-src="${src}" data-lightbox-alt="${alt}"><picture><img src="${src}" alt="${alt}" loading="lazy" onerror="this.closest('.gallery-item').outerHTML='${placeholder(src)}'"></picture></button>`;
}

function videoControlsMarkup() {
  return `
    <div class="video-player-overlay" onclick="togglePortfolioVideo(this)">
      <button class="video-play-toggle" type="button" aria-label="Click to Play" aria-pressed="false" onclick="event.stopPropagation();togglePortfolioVideo(this)">
        <span class="video-play-icon" aria-hidden="true">▶</span>
        <span class="video-play-label">Click to Play</span>
      </button>
      <button class="video-fullscreen-toggle" type="button" aria-label="Fullscreen" title="Toggle Fullscreen" onclick="event.stopPropagation();toggleFullscreenVideo(this)">
        <span class="fullscreen-icon" aria-hidden="true">⛶</span>
      </button>
    </div>
  `;
}

function toggleFullscreenVideo(button) {
  const container = button.closest("figure, .work-media-primary, .media-stage, .project-video-slot") || button.parentElement;
  const video = container ? container.querySelector("video") : null;
  const targetElement = video || container;
  if (!targetElement) return;

  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (targetElement.requestFullscreen) {
      targetElement.requestFullscreen();
    } else if (targetElement.webkitRequestFullscreen) {
      targetElement.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}

function projectVideoMarkup(project, item, index) {
  const src = `${project.folder}${item.file}`;
  const poster = `${project.folder}${item.poster || ""}`;
  const label = item.label || `Featured video ${index + 1}`;
  const isShort = project.category === "short" || project.id === "genbi-community" || project.id === "serenade-decor" || project.id === "humility-apparel";
  const shortClass = isShort ? " project-video-slot--short" : "";
  const interactive = project.id === "weekly-announcement";
  const playerClass = interactive ? " video-player" : "";
  const controls = interactive ? videoControlsMarkup() : "";
  const videoAttributes = interactive ? "muted loop playsinline preload=\"metadata\"" : "autoplay muted loop playsinline controls preload=\"metadata\"";
  return `
    <figure class="project-video-slot${shortClass}${playerClass}" data-slide-index="${index}">
      <video ${videoAttributes} src="${src}" poster="${poster}" aria-label="${project.title} — ${label}">Your browser does not support HTML5 video.</video>
      ${controls}
      <button class="video-audio-toggle" type="button" aria-label="Unmute audio" aria-pressed="false">🔇</button>
      <button class="video-fullscreen-toggle" type="button" aria-label="Fullscreen" title="Toggle Fullscreen" onclick="event.stopPropagation();toggleFullscreenVideo(this)"><span class="fullscreen-icon" aria-hidden="true">⛶</span></button>
    </figure>
  `;
}

function projectVideoGridMarkup(project) {
  const videos = (project.featuredVideos || []).slice(0, 4);
  return `
    <section class="project-video-showcase" data-carousel aria-label="${project.title} featured videos">
      <div class="project-video-showcase-heading">
        <p>FEATURED VIDEOS (${videos.length})</p>
        <span>Scroll to play · swipe or drag to browse</span>
      </div>
      <div class="project-carousel-wrapper">
        <button class="carousel-arrow carousel-prev" type="button" aria-label="Previous video">‹</button>
        <div class="project-carousel-viewport" tabindex="0" aria-label="Featured video carousel">
          <div class="project-video-grid">
            ${videos.map((item, index) => projectVideoMarkup(project, item, index)).join("")}
          </div>
        </div>
        <button class="carousel-arrow carousel-next" type="button" aria-label="Next video">›</button>
      </div>
      <div class="project-carousel-footer">
        <output class="carousel-counter" aria-live="polite">1 of ${videos.length}</output>
      </div>
    </section>
  `;
}

function galleryMarkup(project) {
  const items = (project.images || []).map((file, index) => imageMarkup(project, file, `${project.title} — image ${index + 1}`)).join("");
  return `
    <section class="image-gallery-container" aria-label="${project.title} image gallery">
      <div class="project-video-showcase-heading" style="margin-top: 2.5rem; margin-bottom: 1rem;">
        <p>PHOTO GALLERY (4)</p>
        <span>Click photo to expand in full size</span>
      </div>
      <div class="image-gallery">
        ${items || placeholder(`${project.folder}image_1.jpg`)}
      </div>
    </section>
  `;
}

function workCardMediaMarkup(project) {
  if (project.category === "gallery") {
    const image = project.images?.[0];
    return image ? `<div class="work-media-stage work-media-stage--gallery"><div class="work-media-primary"><img class="work-card-image" src="${project.folder}${image}" alt="${project.title}" loading="lazy" onerror="this.closest('.work-media-stage').outerHTML='${placeholder(project.folder + image)}'"></div></div>` : placeholder(`${project.folder}image_1.jpg`);
  }
  const item = project.featuredVideos?.[0] || { file: project.video, poster: project.poster };
  if (!item?.file) return placeholder(`${project.folder}video_1.mp4`);
  const src = `${project.folder}${item.file}`;
  const poster = `${project.folder}${item.poster || ""}`;
  const interactive = project.id === "weekly-announcement";
  const playerClass = interactive ? " video-player" : "";
  const controls = interactive ? videoControlsMarkup() : "";
  const videoAttributes = interactive ? "muted loop playsinline preload=\"metadata\"" : "autoplay muted loop playsinline controls preload=\"metadata\"";
  return `<div class="work-media-stage work-media-stage--${project.category}"><div class="work-media-primary${playerClass}"><video class="work-card-video" ${videoAttributes} src="${src}" poster="${poster}" aria-label="${project.title}">Your browser does not support HTML5 video.</video>${controls}<button class="video-audio-toggle" type="button" aria-label="Unmute audio" aria-pressed="false">🔇</button></div></div>`;
}

function renderCards() {
  const list = byId("project-list");
  if (!list) return;
  list.innerHTML = projects.map(project => {
    const format = project.format || (project.category === "short" ? "Vertical 9:16" : project.category === "long" ? "Long-form Video" : project.category === "mixed" ? "Video + Campaign" : "Visual Systems");
    const tools = project.tools || "Premiere Pro · CapCut · OBS";
    const focus = project.focus || "Storytelling";
    const skills = project.skills || ["Pacing", "Color Grading", "Audio Leveling"];
    const footer = `<a href="project.html?id=${project.id}" class="project-link">Open Project ↗</a>`;
    return `<article class="project-card reveal visible" id="${project.id}" data-category="${project.category}"><div class="project-card-media" id="project-video-${project.id}">${workCardMediaMarkup(project)}</div><div class="project-info"><div><p class="project-type">${project.label}</p><h3>${project.title}</h3></div><p>${project.description}</p><dl class="project-feature-grid"><div><dt>ROLE</dt><dd>${project.role}</dd></div><div><dt>FORMAT</dt><dd>${format}</dd></div><div><dt>TOOLS</dt><dd>${tools}</dd></div><div><dt>FOCUS</dt><dd>${focus}</dd></div></dl><div class="skill-pills" aria-label="Skills">${skills.map(skill => `<span>${skill}</span>`).join("")}</div>${footer}</div></article>`;
  }).join("");
}

function renderDetail() {
  const target = byId("project-media");
  if (!target) return;
  const id = new URLSearchParams(location.search).get("id");
  const project = projects.find(item => item.id === id) || projects[0];
  if (!project) return;
  document.title = `${project.title} | Mario Reggy Yedija`;
  if (byId("project-category")) byId("project-category").textContent = project.label;
  if (byId("project-title")) byId("project-title").textContent = project.title;
  if (byId("project-description")) byId("project-description").textContent = project.detailDescription || project.description;
  if (byId("project-role")) byId("project-role").textContent = project.role;
  if (byId("project-tools")) byId("project-tools").textContent = project.tools;
  if (byId("project-format")) byId("project-format").textContent = project.format || "Digital Media";

  const backLink = document.querySelector(".back-link");
  if (backLink) {
    backLink.href = `index.html#${project.id}`;
    backLink.addEventListener("click", event => {
      if (document.referrer && document.referrer.includes("index.html")) {
        event.preventDefault();
        window.history.back();
      }
    });
  }

  if (project.category === "gallery") {
    target.innerHTML = galleryMarkup(project);
  } else {
    target.innerHTML = projectVideoGridMarkup(project) + (project.images?.length ? galleryMarkup(project) : "");
  }
}

function safePlay(video) {
  const attempt = video.play();
  if (attempt && typeof attempt.catch === "function") {
    attempt.catch(err => console.warn("Video playback block handled:", err));
  }
}

const audioState = { enabled: false, unlocked: false };

function applyAudioState() {
  document.querySelectorAll("video").forEach(video => { video.muted = !audioState.enabled; });
  document.querySelectorAll(".video-audio-toggle").forEach(button => {
    button.textContent = audioState.enabled ? "🔊" : "🔇";
    button.setAttribute("aria-label", audioState.enabled ? "Mute audio" : "Unmute audio");
    button.setAttribute("aria-pressed", String(audioState.enabled));
  });
  const globalButton = byId("global-audio-toggle");
  if (globalButton) {
    globalButton.textContent = audioState.enabled ? "🔊 Sound on" : "🔇 Unmute audio";
    globalButton.setAttribute("aria-pressed", String(audioState.enabled));
  }
}

function wireAudioControls() {
  const globalButton = document.createElement("button");
  globalButton.id = "global-audio-toggle";
  globalButton.className = "global-audio-toggle";
  globalButton.type = "button";
  globalButton.setAttribute("aria-label", "Unmute audio for all videos");
  document.body.append(globalButton);
  globalButton.addEventListener("click", event => { event.stopPropagation(); audioState.unlocked = true; audioState.enabled = !audioState.enabled; applyAudioState(); });
  document.querySelectorAll(".video-audio-toggle").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation(); audioState.unlocked = true; audioState.enabled = !audioState.enabled; applyAudioState();
  }));
  applyAudioState();
}

function isActiveCarouselVideo(video) {
  const carousel = video.closest("[data-carousel]");
  if (!carousel) return true;
  return Number(video.closest("[data-slide-index]").dataset.slideIndex) === Number(carousel.dataset.activeSlide || 0);
}

function pauseOtherVideos(current) {
  document.querySelectorAll("video").forEach(video => { if (video !== current) video.pause(); });
}

function togglePortfolioVideo(control) {
  const player = control.closest(".video-player");
  const video = player?.querySelector("video");
  if (!video) return;
  const slide = video.closest("[data-slide-index]");
  const carousel = video.closest("[data-carousel]");
  if (carousel && slide && typeof carousel.activateSlide === "function") {
    const slideIndex = Number(slide.dataset.slideIndex);
    if (Number(carousel.dataset.activeSlide || 0) !== slideIndex) carousel.activateSlide(slideIndex);
  }
  if (video.paused) {
    video.dataset.requestedPlaying = "true";
    pauseOtherVideos(video);
    safePlay(video);
  } else {
    video.dataset.requestedPlaying = "false";
    video.pause();
  }
}

function syncVideoPlayback(video) {
  const isCustomPlayer = Boolean(video.closest(".video-player"));
  const shouldPlay = !isCustomPlayer || video.dataset.requestedPlaying === "true";
  if (video.dataset.inView === "true" && isActiveCarouselVideo(video) && shouldPlay) {
    pauseOtherVideos(video);
    safePlay(video);
  } else if (!video.paused) {
    video.pause();
  }
}

function wireCustomVideoPlayers() {
  document.querySelectorAll(".video-player").forEach(player => {
    const video = player.querySelector("video");
    const overlay = player.querySelector(".video-player-overlay");
    const button = player.querySelector(".video-play-toggle");
    if (!video || !overlay || !button) return;
    let hideTimer;
    const updateButton = () => {
      const playing = !video.paused && !video.ended;
      const icon = button.querySelector(".video-play-icon");
      const label = button.querySelector(".video-play-label");
      icon.textContent = playing ? "❚❚" : "▶";
      label.textContent = playing ? "Click to Pause" : "Click to Play";
      button.setAttribute("aria-label", playing ? "Click to Pause" : "Click to Play");
      button.setAttribute("aria-pressed", String(playing));
    };
    const reveal = () => {
      clearTimeout(hideTimer);
      overlay.classList.remove("is-hidden");
      if (!video.paused) hideTimer = setTimeout(() => overlay.classList.add("is-hidden"), 3000);
    };
    video.addEventListener("click", () => togglePortfolioVideo(video));
    player.addEventListener("pointermove", reveal, { passive: true });
    player.addEventListener("pointerenter", reveal, { passive: true });
    video.addEventListener("play", () => { updateButton(); reveal(); });
    video.addEventListener("pause", () => { clearTimeout(hideTimer); updateButton(); overlay.classList.remove("is-hidden"); });
    video.addEventListener("ended", () => { video.dataset.requestedPlaying = "false"; updateButton(); });
    updateButton();
  });
}

function wireUniversalVideoPlayback() {
  const videos = [...document.querySelectorAll("video")];
  if (!videos.length) return;
  videos.forEach(video => {
    video.muted = !audioState.enabled;
    video.loop = true;
  });
  if (!("IntersectionObserver" in window)) return;
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    const video = entry.target;
    video.dataset.inView = String(entry.isIntersecting && entry.intersectionRatio >= .5);
    if (video.dataset.inView === "true") syncVideoPlayback(video);
    else video.pause();
  }), { threshold: [.5] });
  videos.forEach(video => observer.observe(video));
  document.addEventListener("visibilitychange", () => { if (document.hidden) videos.forEach(video => video.pause()); });
}

function wireCarousels() {
  document.querySelectorAll("[data-carousel]").forEach(carousel => {
    const viewport = carousel.querySelector(".project-carousel-viewport");
    const slides = [...carousel.querySelectorAll("[data-slide-index]")];
    const counter = carousel.querySelector(".carousel-counter");
    let active = 0, scrollFrame, dragStartX, dragStartScroll, dragging = false;
    const setActive = index => {
      active = Math.max(0, Math.min(index, slides.length - 1));
      carousel.dataset.activeSlide = String(active);
      if (counter) {
        counter.value = `${active + 1} of ${slides.length}`;
        counter.textContent = counter.value;
      }
      slides.forEach((slide, slideIndex) => {
        slide.classList.toggle("is-active", slideIndex === active);
        const video = slide.querySelector("video");
        if (slideIndex !== active) video.pause();
        else syncVideoPlayback(video);
      });
    };
    const move = direction => {
      const destinationIndex = Math.max(0, Math.min(active + direction, slides.length - 1));
      const destination = slides[destinationIndex];
      setActive(destinationIndex);
      viewport.scrollTo({ left: destination.offsetLeft, behavior: "smooth" });
    };
    carousel.activateSlide = index => {
      const destination = slides[index];
      if (!destination) return;
      setActive(index);
      viewport.scrollTo({ left: destination.offsetLeft, behavior: "smooth" });
    };
    carousel.querySelector(".carousel-prev")?.addEventListener("click", () => move(-1));
    carousel.querySelector(".carousel-next")?.addEventListener("click", () => move(1));
    viewport.addEventListener("scroll", () => {
      if (!scrollFrame) scrollFrame = requestAnimationFrame(() => {
        const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
        const closestIndex = slides.reduce((best, slide, index) => Math.abs((slide.offsetLeft + slide.offsetWidth / 2) - viewportCenter) < Math.abs((slides[best].offsetLeft + slides[best].offsetWidth / 2) - viewportCenter) ? index : best, 0);
        setActive(closestIndex); scrollFrame = null;
      });
    }, { passive: true });
    viewport.addEventListener("pointerdown", event => {
      if (event.pointerType !== "mouse" || event.button !== 0) return;
      if (event.target.closest(".video-play-toggle, .video-audio-toggle, .video-fullscreen-toggle, .video-player-overlay, .carousel-arrow")) return;
      dragStartX = event.clientX; dragStartScroll = viewport.scrollLeft; dragging = false;
      viewport.setPointerCapture(event.pointerId);
    });
    viewport.addEventListener("pointermove", event => {
      if (dragStartX == null) return;
      const distance = event.clientX - dragStartX;
      if (Math.abs(distance) > 6) { dragging = true; viewport.scrollLeft = dragStartScroll - distance; }
    });
    const endDrag = event => {
      if (dragStartX == null) return;
      if (viewport.hasPointerCapture(event.pointerId)) viewport.releasePointerCapture(event.pointerId);
      dragStartX = null;
      if (dragging) setTimeout(() => { dragging = false; }, 0);
    };
    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);
    viewport.addEventListener("click", event => { if (dragging) { event.preventDefault(); event.stopPropagation(); } }, true);
    setActive(0);
  });
}

function wirePosterFallbacks() {
  document.querySelectorAll("video[poster]").forEach(video => {
    const posterSrc = video.getAttribute("poster");
    if (!posterSrc) return;
    const probe = new Image();
    probe.onerror = () => {
      video.removeAttribute("poster");
      video.classList.add("poster-missing");
      video.dataset.missingPoster = posterSrc;
    };
    probe.src = posterSrc;
  });
}

function wireMedia() {
  wireAudioControls(); wireCustomVideoPlayers(); wireUniversalVideoPlayback(); wireCarousels(); wirePosterFallbacks();
  document.querySelectorAll("video").forEach(video => video.addEventListener("error", () => { const figure = video.closest("figure"); if (figure) figure.innerHTML = placeholder(video.currentSrc || video.getAttribute("src") || video.querySelector("source")?.getAttribute("src") || "video.mp4"); }));
  const lightbox = byId("lightbox"), image = byId("lightbox-image");
  document.querySelectorAll("[data-lightbox-src]").forEach(button => button.addEventListener("click", () => { image.src = button.dataset.lightboxSrc; image.alt = button.dataset.lightboxAlt; lightbox.hidden = false; document.body.classList.add("lightbox-open"); }));
  document.querySelectorAll(".lightbox-close").forEach(button => button.addEventListener("click", closeLightbox));
  lightbox?.addEventListener("click", event => { if (event.target === lightbox) closeLightbox(); });
}
function closeLightbox() { const lightbox = byId("lightbox"); if (lightbox) { lightbox.hidden = true; document.body.classList.remove("lightbox-open"); } }

function wirePageUI() {
  const navbar = document.querySelector(".navbar"), menuButton = document.querySelector(".menu-btn"), nav = document.querySelector(".nav-links"); let scrollFrame;
  addEventListener("scroll", () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(() => { navbar?.classList.toggle("scrolled", scrollY > 30); scrollFrame = null; }); }, { passive: true });
  menuButton?.addEventListener("click", () => { const open = menuButton.classList.toggle("open"); nav.classList.toggle("open", open); document.body.classList.toggle("menu-open", open); menuButton.setAttribute("aria-expanded", String(open)); });
  document.querySelectorAll(".nav-links a").forEach(link => link.addEventListener("click", () => { menuButton?.classList.remove("open"); nav?.classList.remove("open"); document.body.classList.remove("menu-open"); }));
  document.querySelectorAll(".filter").forEach(button => button.addEventListener("click", () => { document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button)); document.querySelectorAll(".project-card").forEach(card => card.classList.toggle("hidden", button.dataset.filter !== "all" && card.dataset.category !== button.dataset.filter)); }));
  if (byId("year")) byId("year").textContent = new Date().getFullYear();
}

function revealSections() {
  const items = document.querySelectorAll(".reveal:not(.visible)");
  if (!("IntersectionObserver" in window)) { items.forEach(item => item.classList.add("visible")); return; }
  const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .08 });
  items.forEach(item => observer.observe(item));
}

function wireCursorGlow() {
  const glow = document.querySelector(".cursor-glow");
  if (!glow) return;

  let rafId = null;

  window.addEventListener("pointermove", event => {
    // Abaikan jika pengakses menggunakan layar sentuh/HP
    if (event.pointerType === "touch") return;

    if (rafId) cancelAnimationFrame(rafId);
    
    // Gunakan requestAnimationFrame agar pergerakan halus & tidak berat
    rafId = requestAnimationFrame(() => {
      glow.style.left = `${event.clientX}px`;
      glow.style.top = `${event.clientY}px`;
      glow.style.opacity = "1";
    });
  }, { passive: true });

  // Sembunyikan cahaya saat kursor keluar dari jendela browser
  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
}

// Panggil fungsi di urutan paling bawah script.js bersama fungsi-fungsi lainnya:
wireCursorGlow();


function projectVideoMarkup(project, item, index) {
  const src = `${project.folder}${item.file}`;
  const poster = `${project.folder}${item.poster || ""}`;
  const label = item.label || `Featured video ${index + 1}`;
  const isShort = project.category === "short" || project.id === "genbi-community" || project.id === "serenade-decor" || project.id === "humility-apparel" || project.id === "obs-livestream";
  const shortClass = isShort ? " project-video-slot--short" : "";
  const interactive = project.id === "weekly-announcement";
  const playerClass = interactive ? " video-player" : "";
  const controls = interactive ? videoControlsMarkup() : "";
  const videoAttributes = interactive ? "muted loop playsinline preload=\"metadata\"" : "autoplay muted loop playsinline controls preload=\"metadata\"";
  return `
    <figure class="project-video-slot${shortClass}${playerClass}" data-slide-index="${index}">
      <video ${videoAttributes} src="${src}" poster="${poster}" aria-label="${project.title} — ${label}">Your browser does not support HTML5 video.</video>
      ${controls}
      <button class="video-audio-toggle" type="button" aria-label="Unmute audio" aria-pressed="false">🔇</button>
      <button class="video-fullscreen-toggle" type="button" aria-label="Fullscreen" title="Toggle Fullscreen" onclick="event.stopPropagation();toggleFullscreenVideo(this)"><span class="fullscreen-icon" aria-hidden="true">⛶</span></button>
    </figure>
  `;
}

function projectVideoGridMarkup(project) {
  const videos = (project.featuredVideos || []).slice(0, 4);
  const showNav = videos.length > 1;
  const singleClass = videos.length === 1 ? " project-video-grid--single" : "";

  return `
    <section class="project-video-showcase" data-carousel aria-label="${project.title} featured videos">
      <div class="project-video-showcase-heading">
        <p>FEATURED VIDEO (${videos.length})</p>
        <span>${showNav ? "Scroll to play · swipe or drag to browse" : "Autoplay vertical short video"}</span>
      </div>
      <div class="project-carousel-wrapper">
        ${showNav ? `<button class="carousel-arrow carousel-prev" type="button" aria-label="Previous video">‹</button>` : ""}
        <div class="project-carousel-viewport" tabindex="0" aria-label="Featured video carousel">
          <div class="project-video-grid${singleClass}">
            ${videos.map((item, index) => projectVideoMarkup(project, item, index)).join("")}
          </div>
        </div>
        ${showNav ? `<button class="carousel-arrow carousel-next" type="button" aria-label="Next video">›</button>` : ""}
      </div>
      <div class="project-carousel-footer">
        <output class="carousel-counter" aria-live="polite">1 of ${videos.length}</output>
      </div>
    </section>
  `;
}

function galleryMarkup(project) {
  const items = (project.images || []).map((file, index) => imageMarkup(project, file, `${project.title} — image ${index + 1}`)).join("");
  return `
    <section class="image-gallery-container" aria-label="${project.title} image gallery">
      <div class="project-video-showcase-heading" style="margin-top: 2.5rem; margin-bottom: 1rem;">
        <p>PHOTO GALLERY (${project.images?.length || 0})</p>
        <span>Click photo to expand in full size</span>
      </div>
      <div class="image-gallery">
        ${items || placeholder(`${project.folder}image_1.jpg`)}
      </div>
    </section>
  `;
}

renderCards(); renderDetail(); wireMedia(); wirePageUI(); revealSections();