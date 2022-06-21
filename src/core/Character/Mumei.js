const Character0 = require("./Character0");

class Mumei extends Character0 {
    constructor(){
        super({
            name: "Nanashi Mumei",
            avatar: "mumei.png",
            full_picture: "mumei_full.png",
            motto: "",
            skills: ["鑽木取火","貓頭鷹俯衝","念力冥想","智慧之光","諸神黃昏"],
            char_name: "Nanashi Mumei",
            level: 49,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10 + lvl,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Mumei;
