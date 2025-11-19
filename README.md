# Bug Hunter RPG

A browser-based mini RPG where you play as a developer trying to defeat the **Production Bug Dragon** before release night.

This is a re-themed and heavily restyled version of the classic freeCodeCamp RPG project, focused on cleaner code, better UX, and a modern UI.

---

## Overview

You start in the **dev hub** with:

- **XP:** 0  
- **Health:** 100  
- **Gold:** 50  
- **Inventory:** `["rubber duck"]`

From there you can:

- Visit the **shop** to buy health or stronger tools.
- Enter the **bug cave** to fight smaller bugs and level up.
- Fight the **Production Bug Dragon** once you’re ready.

---

## Tech Stack

- **HTML** – semantic structure for the game card, stats, controls, and log.
- **CSS** – modern dark UI with gradients, soft glow, responsive layout.
- **JavaScript** – game state, combat system, shop, and mini-game.

---

## Features

- **Turn-based combat**
  - Fight three enemy types:
    - *annoying lint error*
    - *legacy feature request*
    - *production bug dragon*
  - Attack, dodge, or run back to the hub.
- **Weapons & inventory**
  - Weapons:
    - `rubber duck`
    - `debugger`
    - `Stack Overflow tab`
    - `refactor hammer`
  - Buy weapons with gold and stack them in your inventory.
  - Weapons can **break** with a small random chance.
  - Can sell older weapons for gold.
- **Shop**
  - Buy 10 health for 10 gold.
  - Buy a stronger weapon for 30 gold (until you have the best).
- **XP & scaling**
  - Gaining XP reduces the damage you take over time.
  - Enemy attack damage uses enemy level + randomness – XP.
- **Win / Lose states**
  - **Win** by defeating the Production Bug Dragon.
  - **Lose** when your health hits 0.
  - Both states show a replay screen with `REPLAY?` buttons.
- **Easter egg mini-game**
  - After killing a monster, you can access a secret game:
    - Pick 2 or 8.
    - Ten random numbers (0–10) are generated.
    - If your number appears → **+20 gold**.
    - If not → **-10 health** (can kill you).

---

## How the Code Is Structured

### Game state

```js
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["rubber duck"];
Data: weapons, monsters, locations
weapons: array of { name, power }.

monsters: array of { name, level, health }.

locations: array of objects that define:

name

"button text": text for the 3 buttons

"button functions": functions bound to those buttons

text: description/log text for that location

This lets update(location) drive the entire UI:

js
Copy code
function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerText = location.text;
}
Combat
fightSlime, fightBeast, fightDragon set fighting index and call goFight().

goFight():

Switches to the fight location.

Shows monster stats and sets monsterHealth.

attack():

Shows flavor text.

Reduces player health via getMonsterAttackValue(level).

If isMonsterHit():

Calculates damage based on weapon power and XP.

Reduces monsterHealth.

Checks for:

lose() if player health ≤ 0.

winGame() if dragon dies.

defeatMonster() for other monsters.

Includes 10% chance your current weapon breaks (if you have more than one).

Mini-game
easterEgg() switches to the special location.
pickTwo() / pickEight() call pick(guess).

pick(guess):

Generates 10 random integers between 0 and 10.

Shows them in the log.

If the guessed number appears → +20 gold.

Otherwise → -10 health, and can trigger lose().

Reset
restart() resets all stats, inventory, and UI, then calls goTown().

How to Run
Clone the repo:

bash
Copy code
git clone https://github.com/SharpSanders/rpg-game.git
cd rpg-game
Open the game:

Double-click index.html, or

Use Live Server in VS Code for fast reloads.

Everything runs client-side; no build step or backend needed.

Project Structure
text
Copy code
rpg-game/
├── index.html   # Game layout and containers
├── styles.css   # Neon-dark UI, layout, responsive styles
└── script.js    # Game state, logic, combat, shop, mini-game
What I Practiced
Managing a small game state with plain JavaScript.

Using arrays of data (weapons, monsters, locations) to drive UI instead of hardcoding.

Working with DOM events and dynamic button behaviors.

Implementing basic game mechanics:

health/xp systems

random damage

inventory & upgrades

Designing a clean, modern game card UI in pure CSS.

Future Improvements
Add sound effects for attacks, buying items, and game over.

Animate health loss and damage numbers.

Add difficulty modes that tweak monster stats.

Persist best runs or stats in localStorage.

Refactor to a more modular structure (classes or factory functions).

Author
Created by Trevyn Sanders.