
// ---------------------------
// Game state
// ---------------------------
let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["rubber duck"];

// ---------------------------
// DOM elements
// ---------------------------
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// ---------------------------
// Data: weapons, monsters, locations
// ---------------------------
const weapons = [
  { name: "rubber duck", power: 5 },
  { name: "debugger", power: 30 },
  { name: "Stack Overflow tab", power: 50 },
  { name: "refactor hammer", power: 100 },
];

const monsters = [
  {
    name: "annoying lint error",
    level: 2,
    health: 18,
  },
  {
    name: "legacy feature request",
    level: 8,
    health: 65,
  },
  {
    name: "production bug dragon",
    level: 20,
    health: 320,
  },
];

const locations = [
  {
    name: "dev hub",
    "button text": ["Go to shop", "Enter bug cave", "Fight boss bug"],
    "button functions": [goStore, goCave, fightDragon],
    text: `You are in the dev hub, staring at a wall of error logs.\n\n` +
      `• The shop has gear that might keep you alive.\n` +
      `• The bug cave is full of low-level chaos.\n` +
      `• The Production Bug Dragon is waiting at the end of the sprint.`,
  },
  {
    name: "shop",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Back to dev hub"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You step into the gear shop. A tired intern nods at you without making eye contact.",
  },
  {
    name: "bug cave",
    "button text": ["Fight lint error", "Fight feature request", "Back to dev hub"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You walk into the bug cave. The air smells like burnt coffee and half-finished tickets.",
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run back to hub"],
    "button functions": [attack, dodge, goTown],
    text: "You are in combat. Your code reviews flash before your eyes.",
  },
  {
    name: "kill monster",
    "button text": ["Back to dev hub", "Back to dev hub", "Secret mini-game"],
    "button functions": [goTown, goTown, easterEgg],
    text:
      'The bug screams "It works on my machine!" as it disappears.\nYou gain XP and steal some coffee money.',
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "Your brain blue-screens. You burn out and the release gets delayed. ☠️",
  },
  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text:
      "You refactor the Production Bug Dragon into a harmless feature flag.\n\n" +
      "The release ships. Users are happy. You win the game! 🎉",
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Back to dev hub"],
    "button functions": [pickTwo, pickEight, goTown],
    text:
      "You find a secret game in an old debug menu.\n\n" +
      "Pick a number above. Ten numbers will be randomly chosen between 0 and 10.\n" +
      "If your number shows up, you win bonus gold. If not, stress damage.",
  },
];

// ---------------------------
// Initialize buttons & starting location
// ---------------------------
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

goTown();

// ---------------------------
// Core UI update function
// ---------------------------
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

// ---------------------------
// Navigation
// ---------------------------
function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

// ---------------------------
// Shop actions
// ---------------------------
function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    text.innerText = "You chug an aggressively sweet energy drink. +10 health.";
  } else {
    text.innerText = "You check your wallet. Yeah, that's not enough gold.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      const newWeapon = weapons[currentWeapon].name;
      inventory.push(newWeapon);

      text.innerText = `You buy a ${newWeapon}.`;
      text.innerText += `\nInventory: ${inventory.join(", ")}.`;
    } else {
      text.innerText = "The shopkeeper laughs. \"Come back when you have 30 gold.\"";
    }
  } else {
    text.innerText =
      "You already have the strongest tool in the shop. There's nothing left to upgrade… except your skills.";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    const soldWeapon = inventory.shift();
    text.innerText = `You sell your old ${soldWeapon} to a junior dev.`;
    text.innerText += `\nInventory: ${inventory.join(", ")}.`;
  } else {
    text.innerText = "Maybe don't sell your only weapon. You're not *that* confident.";
  }
}

// ---------------------------
// Combat setup
// ---------------------------
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

// ---------------------------
// Combat actions
// ---------------------------
function attack() {
  const monster = monsters[fighting];

  text.innerText = `The ${monster.name} attacks your sanity.`;
  text.innerText += `\nYou counter with your ${weapons[currentWeapon].name}.`;

  health -= getMonsterAttackValue(monster.level);

  if (isMonsterHit()) {
    const damage = weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    monsterHealth -= damage;
    text.innerText += `\nYou deal ${damage} damage.`;
  } else {
    text.innerText += "\nYou miss. Your cursor was on the wrong window.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }

  // Chance for weapon to break
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    const brokenWeapon = inventory.pop();
    currentWeapon--;
    text.innerText += `\nYour ${brokenWeapon} \"mysteriously\" stops working.`;
  }
}

function getMonsterAttackValue(level) {
  // Higher XP means you take less damage over time
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  // Slight comeback mechanic: easier to hit when low health
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = `You dodge the ${monsters[fighting].name}'s attack.\nNice footwork.`;
}

// ---------------------------
// Combat outcomes
// ---------------------------
function defeatMonster() {
  const monster = monsters[fighting];
  const goldEarned = Math.floor(monster.level * 6.7);

  gold += goldEarned;
  xp += monster.level;

  goldText.innerText = gold;
  xpText.innerText = xp;

  update(locations[4]);
  text.innerText += `\n\n+${monster.level} XP, +${goldEarned} gold.`;
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

// ---------------------------
// Reset
// ---------------------------
function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["rubber duck"];

  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;

  goTown();
}

// ---------------------------
// Easter egg mini-game
// ---------------------------
function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];

  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }

  text.innerText = `You picked ${guess}.\nHere are the random numbers:\n\n`;

  for (let i = 0; i < numbers.length; i++) {
    text.innerText += numbers[i] + (i < numbers.length - 1 ? ", " : "\n\n");
  }

  if (numbers.includes(guess)) {
    text.innerText += "Nice call. You win 20 gold.";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "RNG said no. You lose 10 health.";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
