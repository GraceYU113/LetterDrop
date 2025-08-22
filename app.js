const startScreen = document.getElementById("start-screen");
const playBtn = document.getElementById("play-btn");
const guidanceBtn = document.getElementById("guidance-btn");
const guidanceText = document.getElementById("guidance-text");

const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const missedEl = document.getElementById("missed");

//Game status variables control
let score = 0;
let missed = 0;
const maxMissed = 5;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let gameOver = false
let gameStartTime = null;

//Time variables control
let lastTime = null;
let letterTimer = 0;
let letterInterval = 700; // initial time interval (700 ms)
let speedMultiplier = 1;  // fall speed multiplier, increases with time


function createFallingLetter() {
  const letter = document.createElement("div");
  const char = letters[Math.floor(Math.random() * letters.length)];
  letter.classList.add("letter");
  letter.textContent = char;

  // Randomly mark some letters as dangerous (20% chance)
  if (Math.random() < 0.2) {
    letter.classList.add("danger");
  }

  // Random location
  letter.style.left = `${Math.random() * 90}%`;
  letter.style.top = `-50px`;
  letter.style.animationDuration = `${3 / speedMultiplier}s`;

  gameContainer.appendChild(letter);
  letter.dataset.char = char;

  // When letter reaches the bottom without being caught
  letter.addEventListener("animationend", () => {
    if (gameContainer.contains(letter)) {
      gameContainer.removeChild(letter);
      missed++;
      updateStats();
    }
  });

  // Mouse click on a letter
  letter.addEventListener("click", () => {
    if (letter.classList.contains("danger")) {
      showGameOver();
      gameOver = true;
    } else {
      score++;
      updateStats();
      letter.remove();
    }
  });
}


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

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "RESTART";
  restartBtn.classList.add("pixel-btn", "restart-btn");
  restartBtn.classList.add("pixel-btn", "restart-btn");
  restartBtn.addEventListener("click", () => {
    overlay.remove();                // remove overlay
    gameContainer.innerHTML = "";    // clear the game area
    startScreen.style.display = "flex"; // back to main menu
  });

  overlay.appendChild(title);
  overlay.appendChild(scoreText);
  overlay.appendChild(restartBtn);
  gameContainer.appendChild(overlay);

  // remove remaining letters
  document.querySelectorAll(".letter").forEach(letter => letter.remove());
}

// game loop for requestAnimationFrame
function gameLoop(timestamp) {
  if (gameOver) return;

  if (!gameStartTime) {
    gameStartTime = timestamp; // The time to call time
  }
  const elapsed = (timestamp - gameStartTime) / 1000; 

  if (lastTime != null) {
    const delta = timestamp - lastTime;
    letterTimer += delta;

    if (letterTimer >= letterInterval) {
      createFallingLetter();
      letterTimer = 0;
    }

    // Increase speed over time
    if (elapsed > speedMultiplier * 5) {
      speedMultiplier += 0.2;
      letterInterval = Math.max(200, letterInterval - 20);
    }
  }

  lastTime = timestamp;
  requestAnimationFrame(gameLoop);
}

// Start/reset game
function startGame() {
  score = 0;
  missed = 0;
  gameOver = false;
  updateStats();

  lastTime = null;
  letterTimer = 0;
  speedMultiplier = 1;
  letterInterval = 700;
  gameStartTime = null;   // reset start time

   gameContainer.innerHTML = ""; //Replace all of the existing content in gomeContainer with new string, here I want to replace with empty string
  requestAnimationFrame(gameLoop);//make sure only play button is been clicked, the game will load
  }

playBtn.addEventListener("click", () => {
  startScreen.style.display = "none"; //when the play button is pressed, hide the starting page
  startGame();
});

guidanceBtn.addEventListener("click", () => {
  guidanceText.style.display =
    guidanceText.style.display === "none" ? "block" : "none"; //Ternary operator ?:  --> ‘toggle’ effect: Checks whether the guidance text is currently hidden ("none").
});  //If it is hidden, change it to "block" (make it visible). If it is visible, change it back to "none" (hide it again).

document.addEventListener("keydown", (e) => {
  if (gameOver) return;

  const pressedKey = e.key.toUpperCase();
  const fallingLetters = document.querySelectorAll(".letter");

  for (let letter of fallingLetters) {
    if (letter.dataset.char === pressedKey) {
      if (letter.classList.contains("danger")) {
        // Typing a grey (aka danger) letter ends the game immediately
        showGameOver();
        gameOver = true;
        return;
      } else {
        // Normal letter: +1 score
        gameContainer.removeChild(letter);
        score++;
        updateStats();
        return;
      }
    }
  }
});


