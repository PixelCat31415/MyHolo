const Character0 = require("./Character0");

class Amellia extends Character0 {
    constructor(){
        super({
            name: "Watson Amellia",
            avatar: "ame.png",
            full_picture: "ame_full.png",
            motto: "",
            skills: ["hic","突破盲點","抽絲剝繭","時間旅行","groundpound"],
            char_name: "Watson Amellia",
            level: 45,
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
            str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 100,
            skl: (lvl) => 10 * lvl + 10,
            luk: (lvl) => 10 * lvl + 10 + 4*lvl,
        });
    }
}

module.exports = Amellia;
