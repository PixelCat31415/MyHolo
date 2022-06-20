const Character0 = require("./Character0");

class Kiara extends Character0 {
    constructor(){
        super({
            name: "Takanashi Kiara",
            avatar: "kiara.png",
            full_picture: "kiara_full.png",
            motto: "",
            skills: ["炸雞腿bonk","火焰彈","劍斬盾擊","鳳舞九天","浴火涅槃"],
            char_name: "Takanashi Kiara",
            level: 30,
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
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100 + 2*lvl,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + lvl,
        });
    }
}

module.exports = Kiara;
