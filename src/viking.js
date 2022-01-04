// Soldier
class Soldier {
  constructor(health, strength) {
    this.health = health;
    this.strength = strength;
  }

  attack() {
    return this.strength;
  }

  receiveDamage(damage) {
    this.health -= damage;
  }
}

// Viking
class Viking extends Soldier {
  constructor(name, health, strength) {
    super(health, strength);
    this.name = name;
  }

  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `${this.name} has received ${damage} points of damage`;
    } else {
      return `${this.name} has died in act of combat`;
    }
  }

  battleCry() {
    return `Odin Owns You All!`;
  }
}

// Saxon
class Saxon extends Soldier {
  receiveDamage(damage) {
    this.health -= damage;
    if (this.health > 0) {
      return `A Saxon has received ${damage} points of damage`;
    } else {
      return `A Saxon has died in combat`;
    }
  }
}

// War
class War {
  constructor() {
    this.vikingArmy = [];
    this.saxonArmy = [];
  }

  addViking(viking) {
    this.vikingArmy.push(viking);
  }

  addSaxon(saxon) {
    this.saxonArmy.push(saxon);
  }

  vikingAttack() {
    // Option 1 to handle the attack: using splice
    let randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let attackedSaxon = this.saxonArmy[randomSaxonIndex];

    let randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let vikingAttacker = this.vikingArmy[randomVikingIndex];

    let attackReturn = attackedSaxon.receiveDamage(vikingAttacker.attack());

    if (attackedSaxon.health <= 0) this.saxonArmy.splice(randomSaxonIndex, 1);

    return attackReturn;
  }

  saxonAttack() {
    // Option 2 to handle the attack: using filter
    let randomVikingIndex = Math.floor(Math.random() * this.vikingArmy.length);
    let attackedViking = this.vikingArmy[randomVikingIndex];

    let randomSaxonIndex = Math.floor(Math.random() * this.saxonArmy.length);
    let saxonAttacker = this.saxonArmy[randomSaxonIndex];

    let attackReturn = attackedViking.receiveDamage(saxonAttacker.attack());

    this.vikingArmy = this.vikingArmy.filter((vik) => vik.health > 0);

    return attackReturn;
  }

  showStatus() {
    if (this.saxonArmy.length <= 0) {
      return "Vikings have won the war of the century!";
    } else if (this.vikingArmy.length <= 0) {
      return "Saxons have fought for their lives and survived another day...";
    } else {
      return "Vikings and Saxons are still in the thick of battle.";
    }
  }
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== "undefined") {
  module.exports = { Soldier, Viking, Saxon, War };
}