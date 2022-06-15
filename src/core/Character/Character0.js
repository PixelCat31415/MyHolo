// basic template
// shows minimum interface of a character
// other characters should inherit from this class
// should not be constructed

const Points = require("../Points");
const Entity = require("../Entity");

class Character0 extends Entity {
    static get hidden(){
        return true;
    }

    constructor(obj) {
        super(obj);
    }

    prepare(opp, match) {
        this.abil = new Points(this.max_abil);
    }

    attack(opp, match) {}

    isDefeated(opp, match) {
        return this.abil.hp < 0;
    }

    finish(opp, match) {}

    getAbil(abil_lvl) {
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

    dump() {
        return {
            name: this.name,
            avatar: this.avatar,
            char_name: this.char_name,
            level: this.level,
            max_abil: this.max_abil.dump(),
        };
    }
}

module.exports = Character0;
