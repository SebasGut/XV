//clock//
const targetDate = new Date("October 26, 2024 18:00:00").getTime();
setInterval(() => {
  const now = new Date().getTime();
  const difference = targetDate - now;
  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);
  document.querySelector(".countdown-item-days .countdown-number").textContent =
    days;
  document.querySelector(
    ".countdown-item-hours .countdown-number"
  ).textContent = hours;
  document.querySelector(
    ".countdown-item-minutes .countdown-number"
  ).textContent = minutes;
  document.querySelector(
    ".countdown-item-seconds .countdown-number"
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
  player.play();
}

buttonMusic.addEventListener("click", toggleMusic);
play_welcome_button.addEventListener("click", toggleMusicD);
