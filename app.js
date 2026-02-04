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
  if (player.paused) {
    player.play();
  } else {
    player.pause();
  }

  document.getElementById("welcome_mesagge").style.display = "none";
  document.getElementById("glass_efect").style.display = "none";
  document.body.style.overflow = "auto"; // Permitir scroll
  document.querySelectorAll(".soft-section").forEach((section) => {
    section.classList.add("show-fade");
  });
  player.play();
}

buttonMusic.addEventListener("click", toggleMusic);
play_welcome_button.addEventListener("click", toggleMusicD);

//background reveal//
document.addEventListener("DOMContentLoaded", () => {
  const main = document.querySelector("main");

  const bgContainer = document.createElement("div");
  bgContainer.id = "bg-container";
  bgContainer.style.cssText = `
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: -9;
  `;
  main.prepend(bgContainer);

  const reveals = [];

  function initBackgroundReveal(selector, bgImage, index) {
    const section = document.querySelector(selector);
    if (!section) return;

    const bgAlt = document.createElement("div");
    bgAlt.style.cssText = `
      position: fixed;
      inset: 0;
      background-size: cover;
      background-position: center;
      background-attachment: fixed;
      clip-path: inset(100% 0 0 0);
      will-change: clip-path;
      transform: translateZ(0);
    `;
    bgAlt.dataset.image = bgImage;
    bgAlt.dataset.loaded = "false";

    bgContainer.appendChild(bgAlt);
    reveals.push({ section, bgAlt });
  }

  function onScroll() {
    const vh = window.innerHeight;

    reveals.forEach(({ section, bgAlt }) => {
      const rect = section.getBoundingClientRect();

      if (rect.bottom <= 0 || rect.top >= vh) {
        bgAlt.style.clipPath = "inset(100% 0 0 0)";
        return;
      }

      // Lazy load real
      if (bgAlt.dataset.loaded === "false" && rect.top < vh) {
        bgAlt.style.backgroundImage = `url('${bgAlt.dataset.image}')`;
        bgAlt.dataset.loaded = "true";
      }

      const topInset = Math.max(0, Math.min(100, (rect.top / vh) * 100));
      const bottomInset = Math.max(0, Math.min(100, ((vh - rect.bottom) / vh) * 100));

      bgAlt.style.clipPath = `inset(${topInset}% 0 ${bottomInset}% 0)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  initBackgroundReveal(".img-section", "img/bg-2.webp", 1);
  initBackgroundReveal(".img-section2", "img/bg-3.webp", 2);
  initBackgroundReveal(".img-section3", "img/bg-4.webp", 3);

  // EJEMPLO: Para agregar más secciones, usa así:
  // initBackgroundReveal(".img-section-2", "../img/bg-3.jpg", 2);
  // initBackgroundReveal(".img-section-3", "../img/bg-4.jpg", 3);
});

//carouccel//
document.addEventListener('DOMContentLoaded', function () {
    const images = document.querySelectorAll('.carousel-items div');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    let current = 0;

    function showImage(index) {
        images.forEach(item => item.classList.remove('active'));
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
});
