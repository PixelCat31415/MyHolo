const Character0 = require("./Character0");

class Gura extends Character0 {
    constructor() {
        super({
            name: "Gawr Gura",
            avatar: "gura.png",
            full_picture: "gawr_gura_full.png",
            motto: "",
            skills: ["張嘴一咬", "水龍捲", "槌頭鯊頭槌", "神鯊擺尾", "三叉戟穿刺"],
            char_name: "Gawr Gura",
            level: 10,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10,
        });
    }
}

module.exports = Gura;
