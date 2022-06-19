const Character0 = require("./Character0");

class Gura extends Character0 {
    static get hidden (){
        return false;
    }

    constructor(){
        super({
            name: "Nacho Neko",
            avatar: "nacho.jpg",
            full_picture: "nacho_full.jpg",
            motto: "ouououo",
            char_name: "Nacho Neko",
            level: 87,
            max_abil: {
                hp: 16971,
                atk: 411,
                def: 411,
                agi: 411,
                str: 906,
                skl: 500,
                luk: 500,
            },
            abil: {},
        });
    }

    getAbil(abil_lvl) {
        return abil_lvl.map({
            hp: (lvl) => 400 * Math.pow(1.09, lvl) - 400,
            atk: (lvl) => 25 * Math.pow(1.07, lvl) - 23,
            def: (lvl) => 25 * Math.pow(1.065, lvl) - 23,
            agi: (lvl) => 25 * Math.pow(1.066, lvl) - 23,
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.4) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 15 * lvl + 10,
        });
    }
}

module.exports = Gura;
