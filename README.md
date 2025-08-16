# Letter Drop

## Game Overview
**Letter Drop** is an interactive typing game where random letters (`A–Z`) fall from the top of the screen.  
The player must type the correct key on the keyboard to catch the letter.

- **Win / Lose Condition**:  
  If the player misses or fails to type the correct key 5 times, the game ends and the final score is displayed.  
- **Background**:  
  Designed to replace boring typing drills with a more engaging activity, similar to *Fruit Ninja*.

---

## Screenshots
![Game Over](image.png)  
![In-Game](image-1.png)

---

## Get Started
Play online here: [Letter Drop](https://graceyu113.github.io/LetterDrop/)

---

## Technologies Used
- HTML  
- CSS: animations  
- JavaScript: DOM manipulation, event listeners  

---

## Core Mechanics
- Random letters are generated and fall from the top of the screen.  
- `letterInterval` controls how often new letters spawn; this interval decreases over time to increase difficulty.  
- `animationDuration` shortens as `speedMultiplier` increases, making letters fall faster.  

Reference: [MDN – requestAnimationFrame](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame)

---

## Fonts & Assets
- Google Fonts:  
  - `'Press Start 2P'` for falling letters  
  - `'Permanent Marker'` for "Game Over" screen  

---

## Planned Features
- Add background sound effects for correct and wrong letters  




 