const Character0 = require("./Character0");

class Calliope extends Character0 {
    constructor(){
        super({
            name: "Mori Calliope",
            avatar: "calli.png",
            full_picture: "calli_full.png",
            motto: "",
            skills: ["鐮刀斬","生命剝奪","召喚亡靈","死亡之聲","靈魂收割"],
            char_name: "Mori Calliope",
            level: 55,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + 2*lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100 + 2*lvl,
            skl: (lvl) => 10 * lvl + 10 + 2*lvl,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Calliope;
