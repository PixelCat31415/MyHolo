// All characters in the game

const Points = require("./Points");

class Characters {
    name;
    pts;
    prepare(self, opp, match) {}
    attack(self, opp, match) {}
    finish(self, opp, match) {}

    constructor(char) {
        if (_charProto[char]) {
            return new _charProto[char]();
        }
        char = char || {};
        this.name = char.name || "Character";
        this.pts = new Points(char.pts) || new Points();
    }
}

// character prototype
// ALWAYS create an instance before using
const _charProto = {
    0: class extends Characters {
        constructor() {
            super({ name: "NoEmotionWanderer", pts: { hp: 100000 } });
        }
        prepare(self, opp, match) {
            match.addMessage(`Never even try challenging me, ${opp.name}...`);
            self.pts.hp = 100000;
        }
        attack(self, opp, match) {
            match.addMessage(`${opp.name}... I shall forgive your rudeness.`);
            self.pts.hp = 100000;
        }
        finish(self, opp, match){
            match.addMessage(`${opp.name}. I've remembered you...`);
            self.pts.hp = 100000;
        }
    },
};

module.exports = Characters;
