//clock//
const targetDate = new Date("March 13, 2026 18:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const difference = targetDate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  document.querySelector(".countdown-item-days .countdown-number").textContent =
    days;
  document.querySelector(
    ".countdown-item-hours .countdown-number",
  ).textContent = hours;
  document.querySelector(
    ".countdown-item-minutes .countdown-number",
  ).textContent = minutes;
  document.querySelector(
    ".countdown-item-seconds .countdown-number",
  ).textContent = seconds;
}, 1000);

//button music
const player = document.getElementById("audio-player");
const buttonMusic = document.getElementById("music-button");
const playWelcomeButton = document.getElementById("play_welcome_button");

function toggleMusic() {
  if (player.paused) {
    player.play();
    buttonMusic.textContent = "⏸️";
  } else {
    player.pause();
    buttonMusic.textContent = "▶️";
  }
}

function toggleMusicD() {
  if (player.paused) player.play();

  const welcome = document.getElementById("welcome_mesagge");
  const glass = document.getElementById("glass_efect");
  if (welcome) welcome.style.display = "none";
  if (glass) glass.style.display = "none";
  document.body.style.overflow = "auto"; // permitir scroll
  document.querySelectorAll(".soft-section").forEach((section) => {
    section.classList.add("show-fade");
  });
}

buttonMusic && buttonMusic.addEventListener("click", toggleMusic);
playWelcomeButton && playWelcomeButton.addEventListener("click", toggleMusicD);

// Initialize background reveal and carousel once
document.addEventListener("DOMContentLoaded", () => {
  // BACKGROUND REVEAL
  const main = document.querySelector("main");
  const bgContainer = document.createElement("div");
  bgContainer.id = "bg-container";
  bgContainer.style.cssText = `position: fixed; inset: 0; pointer-events: none; z-index: -9;`;
  main && main.prepend(bgContainer);

  const reveals = [];

  // Precarga de imágenes de fondo alterno
  const preloadImages = [];
  function preloadBgImage(src) {
    if (!preloadImages.includes(src)) {
      const img = new window.Image();
      img.src = src;
      preloadImages.push(src);
    }
  }

  function initBackgroundReveal(selector, bgImage) {
    const section = document.querySelector(selector);
    if (!section || !bgContainer) return;

    preloadBgImage(bgImage); // Precargar imagen al inicio

    const bgAlt = document.createElement("div");
    bgAlt.style.cssText = `position: fixed; inset: 0; background-size: cover; background-position: center; background-attachment: fixed; background-color: #f8e6f2; transition: background-image 0.5s, background-color 0.5s; clip-path: inset(100% 0 0 0); will-change: clip-path; transform: translateZ(0);`;
    bgAlt.dataset.image = bgImage;
    bgAlt.dataset.loaded = "false";
    bgContainer.appendChild(bgAlt);
    reveals.push({ section, bgAlt });
  }

  function onScroll() {
    const vh = window.innerHeight;
    const isMobile = window.innerWidth <= 1024;
    reveals.forEach(({ section, bgAlt }) => {
      const rect = section.getBoundingClientRect();
      if (rect.bottom <= 0 || rect.top >= vh) {
        bgAlt.style.clipPath = "inset(100% 0 0 0)";
        return;
      }
      // Mostrar imagen precargada instantáneamente
      if (bgAlt.dataset.loaded === "false") {
        bgAlt.style.backgroundImage = `url('${bgAlt.dataset.image}')`;
        bgAlt.style.backgroundColor = "transparent";
        bgAlt.dataset.loaded = "true";
      }
      // Mobile: quitar fixed para evitar salto
      if (isMobile) {
        bgAlt.style.backgroundAttachment = "scroll";
      } else {
        bgAlt.style.backgroundAttachment = "fixed";
      }
      const topInset = Math.max(0, Math.min(100, (rect.top / vh) * 100));
      const bottomInset = Math.max(0, Math.min(100, ((vh - rect.bottom) / vh) * 100));
      bgAlt.style.clipPath = `inset(${topInset}% 0 ${bottomInset}% 0)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // register existing sections
  initBackgroundReveal(".img-section", "img/bg-2.webp");
  initBackgroundReveal(".img-section2", "img/bg-3.webp");
  initBackgroundReveal(".img-section3", "img/bg-4.webp");

  // CAROUSEL
  const images = document.querySelectorAll('.carousel-items div');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');
  if (images.length && prevBtn && nextBtn) {
    let current = 0;
    function showImage(index) {
      images.forEach((item) => item.classList.remove('active'));
      images[index].classList.add('active');
    }
    prevBtn.addEventListener('click', function () {
      current = (current - 1 + images.length) % images.length;
      showImage(current);
    });
    nextBtn.addEventListener('click', function () {
      current = (current + 1) % images.length;
      showImage(current);
    });
    showImage(current);
  }
});
