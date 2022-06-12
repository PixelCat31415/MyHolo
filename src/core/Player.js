// class definition for Players

const Entity = require("./Entity");
const Points = require("./Points");
const Experience = require("./Experience");
const Chars = require("./CharacterManager");
const log4js = require("log4js");

let logger = log4js.getLogger("Player");
logger.level = "all";

class Player extends Entity {
    status;
    exp;
    abil_lvl;
    abil_credit;
    resp_credit;
    next_action;

    constructor(obj) {
        super({});
        if(!obj) {
            obj = {
                name: "[default player]",
                char_name: "Gura",
                status: "alive",
                exp: 0,
                level: 0,
                abil_lvl: new Points(),
                abil_credit: 0,
                resp_credit: 0,
                next_action: 0,
            }
        }
        if(typeof obj !== "object") {
            return;
        }
        this.name = obj.name;
        this.char_name = obj.char_name;
        this.avator = this.char.avator;
        this.status = obj.status;
        this.exp = obj.exp;
        this.level = obj.level;
        this.abil_lvl = new Points(obj.abil_lvl);
        this.abil_credit = obj.abil_credit;
        this.resp_credit = obj.resp_credit;
        this.next_action = obj.next_action;
        this.refresh();
    }

    get char() {
        return Chars.getChar(this.char_name);
    }

    prepare(opp, match) {
        this.char.prepare(this, opp, match);
    }
    attack(opp, match) {
        this.char.attack(this, opp, match);
    }
    isDefeated(opp, match) {
        this.char.isDefeated(this, opp, match);
    }
    finish(opp, match) {
        this.char.finish(this, opp, match);
    }

    refreshAbil(){
        this.max_abil = this.char.getAbil(this.abil_lvl);
    }

    refreshLevel(){
        let new_level = Experience.getLevel(this.exp);
        let delta_level = new_level - this.level;
        logger.info(`level up: ${this.level} + ${delta_level} -> ${new_level}`);
        this.abil_lvl.addAll(delta_level);
        this.abil_credit += delta_level;
        this.level += delta_level;
    }

    refresh(){
        this.refreshLevel();
        this.refreshAbil();
    }

    doIdle(type) {
        let delta_exp = Experience.getIdleExp(type);
        this.next_action = Date.now() + Experience.getIdleTime(type);
        this.exp += delta_exp;
        this.refresh();
    }
}

module.exports = Player;
