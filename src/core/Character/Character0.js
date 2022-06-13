// basic template
// shows minimum interface of a character
// other characters should inherit from this class

const Points = require("../Points");

class Character0 {
    static get avatar() {
        return "nacho.jpg";
    }

    static prepare(self, opp, match) {
        self.abil = new Points(self.max_abil);
    }

    static attack(self, opp, match) {}

    static isDefeated(self, opp, match) {
        return self.abil.hp < 0;
    }

    static finish(self, opp, match) {}

    static getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10,
        });
    }
}

module.exports = Character0;
