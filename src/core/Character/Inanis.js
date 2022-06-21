const Character0 = require("./Character0");

class Inanis extends Character0 {
    constructor(){
        super({
            name: "Ninomae Ina'nis",
            avatar: "ina.png",
            full_picture: "ina_full.png",
            motto: "",
            skills: ["召喚tako","觸手鞭笞","san值歸零","靈魂綑綁","古神降臨"],
            char_name: "Ninomae Ina'nis",
            level: 53,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400 + 20*lvl,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + 2*lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + 2*lvl,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Inanis;
