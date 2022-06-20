const Character0 = require("./Character0");

class Baelz extends Character0 {
    constructor() {
        super({
            name: "Hakos Baelz",
            avatar: "baelz.png",
            full_picture: "baelz_full.png",
            motto: "",
            skills: ["嚙咬", "命運之力", "秩序崩壞", "熵增", "混沌漩渦"],
            char_name: "Hakos Baelz",
            level: 20,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10,
        });
    }
}

module.exports = Baelz;
