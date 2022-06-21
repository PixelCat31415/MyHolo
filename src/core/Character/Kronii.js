const Character0 = require("./Character0");

class Kronii extends Character0 {
    constructor(){
        super({
            name: "Ouro Kronii",
            avatar: "kronii.png",
            full_picture: "kronii_full.png",
            motto: "",
            skills: ["指針刺擊","直升機空襲","時間牢籠","穿梭時空","za warudo"],
            char_name: "Ouro Kronii",
            level: 52,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400 + 10*lvl,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + 2*lvl,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + 2*lvl,
        });
    }
}

module.exports = Kronii;
