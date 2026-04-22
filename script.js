const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const message = document.getElementById("message");
const music = document.getElementById("music");
const heartsContainer = document.getElementById("hearts-container");
const finalScreen = document.getElementById("finalScreen");

let noClickCount = 0;

const phrases = [
  "No",
  "¿Estás segura que no?",
  "Por favor mi bioo, no digas que no :(",
  "Si dices que no, estaré realmente muy triste T_T",
  "Íker y Axel también quieren que digas que sí 😏",
  "Por favor???? <3"
];

// Música (por restricciones del navegador)
document.body.addEventListener("click", () => {
  music.play().catch(() => {});
}, { once: true });

// Crear corazones constantemente
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💖";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = (Math.random() * 20 + 10) + "px";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";

  heartsContainer.appendChild(heart);

  setTimeout(() => {
    heart.remove();
  }, 5000);
}

setInterval(createHeart, 300);

// Botón SÍ
yesBtn.addEventListener("click", () => {
  explodeHearts();
  finalScreen.classList.add("show");
});

// Botón NO
noBtn.addEventListener("click", () => {
  noClickCount++;

  if (noClickCount < phrases.length) {
    noBtn.textContent = phrases[noClickCount];

    let scaleNo = 1 - (noClickCount * 0.1);
    noBtn.style.transform = `scale(${scaleNo})`;

    let scaleYes = 1 + (noClickCount * 0.2);
    yesBtn.style.transform = `scale(${scaleYes})`;
  }

  if (noClickCount >= 5) {
    noBtn.addEventListener("mouseover", moveButton);
  }
});

// Movimiento del botón NO
function moveButton() {
  const x = Math.random() * (window.innerWidth - noBtn.offsetWidth);
  const y = Math.random() * (window.innerHeight - noBtn.offsetHeight);

  noBtn.style.position = "absolute";
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

// Explosión de corazones
function explodeHearts() {
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "💖";
    heart.style.position = "fixed";
    heart.style.left = "50%";
    heart.style.top = "50%";
    heart.style.fontSize = "20px";

    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 300;

    heart.style.transition = "all 1s ease-out";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.left = `calc(50% + ${Math.cos(angle) * distance}px)`;
      heart.style.top = `calc(50% + ${Math.sin(angle) * distance}px)`;
      heart.style.opacity = 0;
    }, 10);

    setTimeout(() => {
      heart.remove();
    }, 1000);
  }
}