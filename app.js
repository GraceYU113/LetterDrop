const gameContainer = document.getElementById("game-container");
const scoreEl = document.getElementById("score");
const missedEl = document.getElementById("missed");

let score = 0;
let missed = 0;
const maxMissed = 5;
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

//Generate random letter
function createFallingLetter() {
  const letter = document.createElement("div");
  const char = letters[Math.floor(Math.random() * letters.length)];
  letter.classList.add("letter");
  letter.textContent = char;

  // Random location
  letter.style.left = `${Math.random() * 90}%`;
  letter.style.top = `-50px`;
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

setInterval(createFallingLetter, 600);

/* level-up content to be added: 
1) As time passes, the speed of falling becomes faster
2) Some bomb 'letter', maybe in grey color, if u type it, u'll end the game immediately
3) Some reward 'letter', maybe in pink color, if u type it, u'll gey 2 scores. */

/* problem to be solved: 'Game over' show-up in a more vivid way.*/