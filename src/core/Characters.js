// All characters in the game

const Points = require("./Points");

class Characters {
    name;
    pts;

    constructor(char) {
        char = char || 0;
        if (_charProto[char]) {
            return new _charProto[char]();
        }
        this.name = char.name || "Character";
        this.pts = new Points(char.pts);
    }

    prepare(self, opp, match) {}
    attack(self, opp, match) {}
    isDefeated(self, opp, match) {
        return self.pts.hp < 0;
    }
    finish(self, opp, match) {}
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
        finish(self, opp, match) {
            match.addMessage(`${opp.name}. I've remembered you...`);
            self.pts.hp = 100000;
        }
    },
    49: class extends Characters {
        constructor() {
            this.name = "NAME HERE";
            this.pts = {
                hp: 0,
                atk: 100,
                def: 0,
                agi: 0,
                str: 0,
                skl: 0,
                luk: 0,
            };
        }
        attack(self, opp, match) {
            self.pts.atk += 49;
            opp.pts.hp -= self.pts.atk;
        }
    },
};

module.exports = Characters;
