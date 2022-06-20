// example of how a character should look like

const Character0 = require("./Character0");

class CHARID extends Character0 {
    constructor(){
        super({
            name: "FULL NAME",
            avatar: "NAME.png",
            full_picture: "NAME_full.png",
            motto: "",
            skills: ["skills"],
            char_name: "FULL NAME",
            level: 48763,
            max_abil: {},
            abil: {},
            hidden: true,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = CHARID;
