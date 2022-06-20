// class definition for Players

const Entity = require("./Entity");
const Points = require("./Points");
const Experience = require("./Experience");
const Chars = require("./CharacterManager");
const log4js = require("log4js");

let logger = log4js.getLogger("Player");
logger.level = "all";

class Player extends Entity {
    get is_player() {
        return true;
    }

    status;
    exp;
    abil_lvl;
    abil_credit;
    resp_abil;
    resp_credit;
    next_action;
    char;
    char_nickname;

    constructor(obj) {
        super({});
        if (!obj) {
            this.doSetName("Smol Gura");
            this.doRespawn("Gura", 0, new Points());
            return;
        }
        if (typeof obj !== "object") {
            return;
        }
        this.name = obj.name;
        this.char_name = obj.char_name;
        this.status = obj.status;
        this.exp = obj.exp;
        this.level = obj.level;
        this.abil_lvl = new Points(obj.abil_lvl);
        this.abil_credit = obj.abil_credit;
        this.resp_abil = new Points(obj.resp_abil);
        this.resp_credit = obj.resp_credit;
        this.next_action = obj.next_action;
        this.refresh();
    }

    prepare(opp, match) {
        return this.char.prepare.call(this, opp, match);
    }
    attack(opp, match) {
        return this.char.attack.call(this, opp, match);
    }
    isDefeated(opp, match) {
        return this.char.isDefeated.call(this, opp, match);
    }
    finish(opp, match) {
        return this.char.finish.call(this, opp, match);
    }

    refreshChar() {
        this.char = Chars.getChar(this.char_name);
        this.char_nickname = this.char.name;
        this.avatar = this.char.avatar;
        this.motto = this.char.motto;
        this.skills = this.char.skills;
    }
    refreshAbil() {
        this.max_abil = this.char.getAbil(this.abil_lvl.divide(10));
    }
    refreshLevel() {
        let new_level = Experience.getLevel(this.exp);
        let delta_level = new_level - this.level;
        if (delta_level === 0) return;
        logger.info(`level up: ${this.level} + ${delta_level} -> ${new_level}`);
        this.abil_lvl = this.abil_lvl
            .addAll(delta_level * 10)
            .chmin(Experience.ABIL_LVL_LIMIT);
        this.abil_credit += delta_level * Experience.CREDIT_LEVELUP;
        this.level += delta_level;
    }
    refresh() {
        this.refreshChar();
        this.refreshLevel();
        this.refreshAbil();
    }

    updateChar(new_char) {
        this.char_name = new_char;
        this.avatar = this.char.avatar;
        this.refresh();
    }

    doSetName(new_name) {
        this.name = new_name;
    }

    doAddAbil(type) {
        if (
            this.abil_lvl[type] === Experience.ABIL_LVL_LIMIT ||
            this.abil_credit <= 0
        ) {
            return false;
        }
        this.abil_lvl[type]++;
        this.abil_credit--;
        this.refreshAbil();
        return true;
    }

    doIdle(type, timestamp) {
        if (this.exp >= Experience.EXP_LIMIT) {
            return 0;
        }
        let delta_exp = Experience.getIdleExp(type);
        delta_exp = Math.min(delta_exp, Experience.EXP_LIMIT - this.exp);
        this.next_action = timestamp + Experience.getIdleTime(type) * 1000;
        this.exp += delta_exp;
        this.refresh();
        return delta_exp;
    }

    doRespawn(resp_char, resp_credit, resp_abil) {
        logger.log(
            `player respawning: char = ${resp_char}, credit remaining: ${resp_credit}, resp_abil: ${JSON.stringify(
                resp_abil
            )}`
        );
        this.char_name = resp_char;
        this.status = "alive";
        this.exp = 0;
        this.level = 1;
        this.abil_lvl = new Points().fill(10).add(resp_abil);
        this.abil_credit = 0;
        this.resp_abil = new Points(resp_abil);
        this.resp_credit = resp_credit;
        this.next_action = 0;
        this.refresh();
    }

    kill() {
        this.status = "dead";
    }

    dump() {
        let res = {
            name: this.name,
            char_name: this.char_name,
            char_nickname: this.char_nickname,
            avatar: this.avatar,
            motto: this.motto,
            level: this.level,
            max_abil: this.max_abil.dump(),
            status: this.status,
            exp: this.exp,
            abil_lvl: this.abil_lvl.dump(),
            abil_credit: this.abil_credit,
            resp_abil: this.resp_abil.dump(),
            resp_credit: this.resp_credit,
            next_action: this.next_action,
            exp_prev: Experience.getPrevLevel(this.exp),
            exp_next: Experience.getNextLevel(this.exp),
            abil_info: {},
        };
        let now_lv = this.char.getAbil(this.abil_lvl.divide(10));
        let next_lv = this.char.getAbil(this.abil_lvl.addAll(2).divide(10));
        let diff = next_lv.sub(now_lv);
        for (let key of Points.entries) {
            res.abil_info[key] = {
                can_add: this.abil_lvl[key] < Experience.ABIL_LVL_LIMIT,
                delta: diff[key],
            };
        }
        return res;
    }
}

module.exports = Player;
