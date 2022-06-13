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
                name: "Smol Gura",
                char_name: "Gura",
                status: "alive",
                exp: 0,
                level: 1,
                abil_lvl: (new Points()).fill(1),
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
        this.avatar = this.char.avatar;
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
        return this.char.prepare(this, opp, match);
    }
    attack(opp, match) {
        return this.char.attack(this, opp, match);
    }
    isDefeated(opp, match) {
        return this.char.isDefeated(this, opp, match);
    }
    finish(opp, match) {
        return this.char.finish(this, opp, match);
    }

    refreshAvatar(){
        this.avatar = this.char.avatar;
    }
    refreshAbil(){
        this.max_abil = this.char.getAbil(this.abil_lvl);
    }
    refreshLevel(){
        let new_level = Experience.getLevel(this.exp);
        let delta_level = new_level - this.level;
        if(delta_level === 0) return;
        logger.info(`level up: ${this.level} + ${delta_level} -> ${new_level}`);
        this.abil_lvl = this.abil_lvl.addAll(delta_level).chmin(Experience.ABIL_LVL_LIMIT);
        this.abil_credit += delta_level;
        this.level += delta_level;
    }
    refresh(){
        this.refreshLevel();
        this.refreshAbil();
        this.refreshAvatar();
    }

    updateChar(new_char) {
        this.char_name = new_char;
        this.avatar = this.char.avatar;
        this.refresh();
    }

    doAddAbil(type) {
        if(this.abil_lvl[type] === Experience.ABIL_LVL_LIMIT ||
           this.abil_credit <= 0){
            return false;
        }
        this.abil_lvl[type]++;
        this.abil_credit--;
        this.refreshAbil();
        return true;
    }

    doIdle(type) {
        if(this.exp >= Experience.EXP_LIMIT){
            return 0;
        }
        let delta_exp = Experience.getIdleExp(type);
        delta_exp = Math.min(delta_exp, Experience.EXP_LIMIT - this.exp);
        this.next_action = Date.now() + Experience.getIdleTime(type)*1000;
        this.exp += delta_exp;
        this.refresh();
        return delta_exp;
    }

    dump(){
        let res = {
            name: this.name,
            char_name: this.char_name,
            avatar: this.avatar,
            level: this.level,
            max_abil: this.max_abil.dump(),
            status: this.status,
            exp: this.exp,
            abil_lvl: this.abil_lvl.dump(),
            abil_credit: this.abil_credit,
            resp_credit: this.resp_credit,
            next_action: this.next_action,
            exp_prev: Experience.getPrevLevel(this.exp),
            exp_next: Experience.getNextLevel(this.exp),
            abil_info: {},
        };
        let now_lv = this.char.getAbil(this.abil_lvl);
        let next_lv = this.char.getAbil(this.abil_lvl.addAll(1));
        let diff = next_lv.sub(now_lv);
        for(let key of Points.entries){
            res.abil_info[key] = {
                can_add: (this.abil_lvl[key] < Experience.ABIL_LVL_LIMIT),
                delta: diff[key],
            };
        }
        return res;
    }
}

module.exports = Player;
