// store some constants including
//  - exp for each level
//  - idle experience reward

const log4js = require("log4js");
let logger = log4js.getLogger("Experience");
logger.level = "all";

class ExperienceHandler {
    // some constants
    get ABIL_LVL_LIMIT(){
        return 49;
    }
    get EXP_LIMIT(){
        return this.exp_table[48];
    }

    constructor() {
        this.initExpTable();
        this.initIdleExpTable();
    }

    // maximum experience for each level (exclusive)
    // e(x) = sum( 0.4 * 1.3^k | for all 1<=k<=x )
    exp_table;
    initExpTable() {
        this.exp_table = { 0: 0 };
        for (let i = 1; i <= 48; i++) {
            this.exp_table[i] =
                this.exp_table[i - 1] + 1000 * Math.pow(Math.log10(i + 1), 2);
        }
        this.exp_table[49] = Infinity;
    }
    getLevel(exp) {
        for (let i = 1; i <= 49; i++) {
            if (exp < this.exp_table[i]) {
                return i;
            }
        }
    }
    getPrevLevel(exp) {
        for (let i = 1; i <= 49; i++) {
            if (exp < this.exp_table[i]) {
                return this.exp_table[i-1];
            }
        }
    }
    getNextLevel(exp) {
        for (let i = 1; i <= 49; i++) {
            if (exp < this.exp_table[i]) {
                return this.exp_table[i];
            }
        }
    }

    // idle time required for each idle type
    // in seconds
    idle_time_table = {
        1: 28800,
        2: 14400,
        3: 7200,
        4: 3600,
        5: 1800,
        6: 600,
        7: 300,
        8: 180,
        9: 120,
        10: 60,
    };
    getIdleTime(op) {
        if (op < 1 || op > 10) {
            console.log("WARNING: invalid idle type");
            return 0;
        }
        return this.idle_time_table[op];
    }

    // idle experience for each idle type
    idle_exp_table;
    initIdleExpTable() {
        this.idle_exp_table = {};
        for (let i = 1; i <= 10; i++) {
            let eff = 0.4 * Math.pow(1.3, i);
            this.idle_exp_table[i] = this.idle_time_table[i] * eff;
        }
    }
    getIdleExp(op) {
        if (op < 1 || op > 10) {
            logger.error("invalid idle type");
            return 0;
        }
        return this.idle_exp_table[op];
    }
}

let exp = new ExperienceHandler();

module.exports = exp;
