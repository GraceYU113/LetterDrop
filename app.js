const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const missedEl = document.getElementById("missed");

let score = 0;
let missed = 0;
const maxMissed = 5;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let gameOver = false


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
  if (gameOver) return;

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

if (missed >= maxMissed && !gameOver) {
    gameOver = true;
    showGameOver();
  }
}

// display ‘Game-over’ overlay
function showGameOver() {
  const overlay = document.createElement("div");
  overlay.id = "game-over";

  const title = document.createElement("h1");
  title.textContent = "Game Over";

  const scoreText = document.createElement("p");
  scoreText.textContent = `Final Score: ${score}`;

  overlay.appendChild(title);
  overlay.appendChild(scoreText);
  gameContainer.appendChild(overlay);

  // remove remaining letters
  document.querySelectorAll(".letter").forEach(letter => letter.remove());
}

// game loop for requestAnimationFrame
function gameLoop(timestamp) {
  if (gameOver) return; //stop generateing new letters after game over

  if (lastTime != null) {
    const delta = timestamp - lastTime;
    letterTimer += delta;

    if (letterTimer >= letterInterval) {
      createFallingLetter();
      letterTimer = 0;
    }

    if (timestamp / 1000 > speedMultiplier * 5) {
      speedMultiplier += 0.2;
      letterInterval = Math.max(200, letterInterval - 20); // litime the min interval to 200ms
    }
  }

 lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
