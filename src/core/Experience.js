// store some constants including
//  - exp for each level
//  - idle experience reward

class ExperienceHandler {
    constructor() {
        this.initExpTable();
        this.initIdleExpTable();
    }

    // maximum experience for each level (exclusive)
    // e(x) = sum( 0.4 * 1.3^k | for all 1<=k<=x )
    exp_table;
    initExpTable() {
        this.exp_table = [0];
        for (let i = 1; i <= 48; i++) {
            this.exp_table.push(
                this.exp_table[i - 1] + 1000 * Math.pow(Math.log10(i + 1), 2)
            );
        }
        this.exp_table.push(Infinity);
    }
    getLevel(exp) {
        for (let i = 0; i <= 49; i++) {
            if (exp < this.exp_table[i]) {
                return i;
            }
        }
    }

    // idle time required for each idle type
    // in seconds
    idle_time_table = [28800, 14400, 7200, 3600, 1800, 600, 300, 180, 120, 60];
    getIdleTime(op) {
        if (op < 1 || op > 10) {
            console.log("WARNING: invalid idle type");
            return 0;
        }
        return this.idle_time_table[op - 1];
    }

    // idle experience for each idle type
    idle_exp_table;
    initIdleExpTable() {
        this.idle_exp_table = [];
        for (let i = 1; i <= 10; i++) {
            let eff = 0.4 * Math.pow(1.3, i);
            this.idle_exp_table.push(this.idle_time_table[i - 1] * eff);
        }
    }
    getIdleExp(op) {
        if (op < 1 || op > 10) {
            console.log("WARNING: invalid idle type");
            return 0;
        }
        return this.idle_exp_table[op - 1];
    }
}

let exp = new ExperienceHandler();

module.exports = exp;
