const Character0 = require("./Character0");

class Irys extends Character0 {
    constructor() {
        super({
            name: "IRyS",
            avatar: "irys.png",
            full_picture: "irys_full.png",
            motto: "",
            skills: [
                "天使之光",
                "召喚惡魔",
                "絕望深淵",
                "暗黑爆破",
                "聖光制裁",
            ],
            char_name: "IRyS",
            level: 40,
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
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10 + lvl,
            luk: (lvl) => 10 * lvl + 10 + 2 * lvl,
        });
    }
}

module.exports = Irys;
