const Character0 = require("./Character0");

class Sana extends Character0 {
    constructor(){
        super({
            name: "Tsukumo Sana",
            avatar: "sana.png",
            full_picture: "sana_full.png",
            motto: "",
            skills: ["巨大化","黑洞","空間坍縮","超新星爆炸","次元風暴"],
            char_name: "Tsukumo Sana",
            level: 35,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400 + 10*lvl,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100 + 2*lvl,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Sana;
