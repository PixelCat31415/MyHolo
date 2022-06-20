const Character0 = require("./Character0");
const Player = require("../Player");

class Gura extends Character0 {
    static get hidden() {
        return false;
    }

    constructor() {
        super({
            name: "Gawr Gura",
            avatar: "gawr_gura.jpg",
            full_picture: "gawr_gura_full.jpg",
            motto: "owowowo",
            skills: ["張嘴一咬", "水龍捲", "槌頭鯊頭槌", "神鯊擺尾", "三叉戟穿刺"],
            char_name: "Gawr Gura",
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
}

module.exports = Gura;
