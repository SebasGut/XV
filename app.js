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

//img scroll effect - background reveal with clip-path on scroll //
document.addEventListener("DOMContentLoaded", () => {
  // Crear div contenedor para todos los fondos alternativos
  const main = document.querySelector("main");
  const bgContainer = document.createElement("div");
  bgContainer.id = "bg-container";
  bgContainer.style.cssText = "position: fixed; top: 0; left: 0; width: 100%; height: 100vh; pointer-events: none; z-index: 0;";
  main.insertBefore(bgContainer, main.firstChild);

  // Función genérica para crear efecto de cortina
  function initBackgroundReveal(selector, bgImage, bgIndex = 0) {
    const section = document.querySelector(selector);
    if (!section) return;

    // Crear elemento de fondo alterno si no existe
    let bgAlt = document.querySelector(`#bg-alt-${bgIndex}`);
    if (!bgAlt) {
      bgAlt = document.createElement("div");
      bgAlt.id = `bg-alt-${bgIndex}`;
      bgAlt.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-image: url('${bgImage}');
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        z-index: -9;
        clip-path: inset(100% 0 0 0);
        pointer-events: none;
      `;
      bgContainer.appendChild(bgAlt);
    }

    // Manejador de scroll: calcular inset superior e inferior para controlar la máscara
    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = section.offsetHeight;

      // Si la sección está completamente fuera del viewport, ocultar
      if (rect.bottom <= 0 || rect.top >= windowHeight) {
        bgAlt.style.clipPath = `inset(100% 0 0 0)`;
        return;
      }

      // topInset: cuánto ocultar desde arriba (0 = visible, 100 = oculto)
      const topInset = Math.max(0, Math.min(100, (rect.top / windowHeight) * 100));

      // bottomInset: cuánto ocultar desde abajo (0 = visible, 100 = oculto)
      const bottomInset = Math.max(0, Math.min(100, ((windowHeight - rect.bottom) / windowHeight) * 100));

      // Aplicar ambos insets; cuando se entra se irá reduciendo topInset,
      // cuando se sale hacia arriba (entra el siguiente elemento) se irá
      // incrementando bottomInset, produciendo el efecto de desaparecer hacia arriba.
      bgAlt.style.clipPath = `inset(${topInset}% 0 ${bottomInset}% 0)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
  }

  // Inicializar la sección existente
  initBackgroundReveal(".img-section", "../img/bg-2.jpg", 1);
  initBackgroundReveal(".img-section2", "../img/bg-3.jpg", 2);
  initBackgroundReveal(".img-section3", "../img/bg-4.jpg", 3);

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
