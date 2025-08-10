Game Guidance
1. The game is called ‘Letter Drop’. Random letters (ABCDE…) will be generated and fall from the top of screen, the player needs to type the correct key on the keyboard.
2. Win/lose scenario: If the player misses/ doesn’t type the correct keys for 5 times, game ends. The final score shows.
3. I plan to use the following functions to fulfill the game:
mathRandom:
e.g. const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
……
const char = letters[Math.floor(Math.random() * letters.length)];

Event listener: keydown event.
If the pressed key matches the falling letter, remove the letter and increase the score.
If not, reduce a life count (max is 5).

requestAnimationFrame
letterInterval controls the fall speed of new letters, decreasing over time.
animationDuration shortens as speedMultiplier increases, making letters fall faster and raising the difficulty.



/* level-up content to be added: 
1) As time passes, the speed of falling letter becomes faster. 
--> Change setInterval to requestAnimationFrame; 
use letter.style.animationDuration = '${3/speedMultiplier}';
2) Some bomb 'letter', maybe in grey color, if u type it, u'll end the game immediately
3) Some reward 'letter', maybe in pink color, if u type it, u'll gey 2 scores. */
4）Add background music if possible

/* problem to be solved： 'Game over' show-up in a more vivid way.*/
--> do no use alert() when game ends, adds a overlay in the game container. 