const Character0 = require("./Character0");

class Omega extends Character0 {
    constructor(){
        super({
            name: "Omega Alpha",
            avatar: "omega.jpg",
            full_picture: "omega_full.jpg",
            motto: "",
            skills: ["始源之劍","世界放逐","遠古詛咒","終焉之時","歐米茄的凝視"],
            char_name: "Omega Alpha",
            level: 56,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.08, lvl) - 400 + 10*lvl,
            atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            def: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23 + lvl,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100 + 2*lvl,
            skl: (lvl) => 10 * lvl + 10 + lvl,
            luk: (lvl) => 10 * lvl + 10 + 2*lvl,
        });
    }
}

module.exports = Omega;
