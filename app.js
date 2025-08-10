const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const missedEl = document.getElementById("missed");

let score = 0;
let missed = 0;
const maxMissed = 5;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let lastTime = null;
let letterTimer = 0;
let letterInterval = 700; // initial time interval (700 ms)
let speedMultiplier = 1;  // fall speed multiplier, increases with time


//Generate random letter
function createFallingLetter() {
  const letter = document.createElement("div");
  const char = letters[Math.floor(Math.random() * letters.length)];
  letter.classList.add("letter");
  letter.textContent = char;

  // Random location
  letter.style.left = `${Math.random() * 90}%`;
  letter.style.top = `-50px`;

  letter.style.animationDuration = `${3 / speedMultiplier}s`; // speed multiplier


  gameContainer.appendChild(letter);
  letter.dataset.char = char;

  letter.addEventListener("animationend", () => {
    if (gameContainer.contains(letter)) {
      gameContainer.removeChild(letter);
      missed++;
      updateStats();
    }
  });
}

document.addEventListener("keydown", (e) => {
  const pressedKey = e.key.toUpperCase();
  const fallingLetters = document.querySelectorAll(".letter");

  for (let letter of fallingLetters) {
    if (letter.dataset.char === pressedKey) {
      gameContainer.removeChild(letter);
      score++;
      updateStats();
      return;
    }
  }
});

function updateStats() {
  scoreEl.textContent = score;
  missedEl.textContent = missed;

  if (missed >= maxMissed) {
    alert(`Game Over!\nFinal Score: ${score}`);
    location.reload();
  }
}

// game loop for requestAnimationFrame
function gameLoop(timestamp) {
  if (lastTime != null) {
    const delta = timestamp - lastTime;
    letterTimer += delta;

    if (letterTimer >= letterInterval) {
      createFallingLetter();
      letterTimer = 0;
    }

    if (timestamp / 1000 > speedMultiplier * 5) {
      speedMultiplier += 0.2;
      letterInterval = Math.max(200, letterInterval - 20); // 最短间隔 200ms
    }
  }

 lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
