const Character0 = require("./Character0");

class Gura extends Character0 {
    constructor(){
        super({
            name: "Nacho Neko",
            avatar: "nacho.jpg",
            full_picture: "nacho.jpg",
            motto: "",
            skills: ["耳膜穿刺", "健康作息", "超耐久配信", "*WINK*", "にゃ"],
            char_name: "Nacho Neko",
            level: 87,
            max_abil: {},
            abil: {},
            hidden: true,
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
