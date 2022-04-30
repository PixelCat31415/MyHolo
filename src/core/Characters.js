// All characters in the game

const Points = require("./Points");

class CharacterBase {
    static get char_name() {
        return "[[Characters-Prototype]]";
    }
    static get basePts() {
        return Points({
            hp: 0,
            atk: 0,
            def: 0,
            agi: 0,
            str: 0,
            skl: 0,
            luk: 0,
        });
    }
    static points(lvl) {
        return new Points({
            hp: 400 * Math.pow(1.07, lvl) - 400,
            atk: 25 * Math.pow(1.06, lvl) - 23,
            def: 25 * Math.pow(1.06, lvl) - 23,
            agi: 25 * Math.pow(1.06, lvl) - 23,
            str: (100 * Math.log(lvl + 10)) / Math.log(1.5) - 400,
            skl: 10 * lvl + 10,
            luk: 10 * lvl + 10,
        });
    }
    static prepare(self, opp, match) {}
    static attack(self, opp, match) {}
    static isDefeated(self, opp, match) {
        return self.pts.hp < 0;
    }
    static finish(self, opp, match) {}
}

// character prototype
// ALWAYS create an instance before using
const _charProto = {
    0: CharacterBase,
    1: class extends CharacterBase {
        static get char_name() {
            return "NoEmotionCat";
        }
        static get basePts() {
            return Points({
                hp: 100000,
                atk: 0,
                def: 0,
                agi: 0,
                str: 0,
                skl: 0,
                luk: 0,
            });
        }
        static prepare(self, opp, match) {
            self.pts = new Points(self.maxPts);
            match.log(`Never even try to challenge me, ${opp.name}...`);
        }
        static attack(self, opp, match) {
            self.pts = new Points(self.maxPts);
            match.log(`${opp.name}... I shall forgive your rudeness.`);
        }
        static finish(self, opp, match) {
            self.pts = new Points(self.maxPts);
            match.log(`${opp.name}. I've remembered you...`);
        }
    },
};

class Characters {
    static getCharacter(id) {
        if (_charProto[id]) return _charProto[id];
        return _charProto[0];
    }
    static get CharacterBase() {
        return CharacterBase;
    }
}

module.exports = Characters;
