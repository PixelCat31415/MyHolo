const Character0 = require("./Character0");

class Fauna extends Character0 {
    constructor() {
        super({
            name: "Ceres Fauna",
            avatar: "fauna.png",
            full_picture: "fauna_full.png",
            motto: "",
            skills: [
                "召喚動物",
                "麒麟衝撞",
                "召喚樹人",
                "自然魔法",
                "暴走大地之母",
            ],
            char_name: "Ceres Fauna",
            level: 25,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400 + 10 * lvl,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Fauna;
