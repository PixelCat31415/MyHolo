// handle battles

const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Match");
logger.level = "all";

const MAX_ROUNDS = 100;

class Match {
    time;
    title;
    attacker;
    defender;
    nround;
    result;
    heading;
    record;
    summary;

    constructor(atker, defer, info) {
        this.title = info;
        this.attacker = atker;
        this.defender = defer;
    }

    #start() {
        // both sides do preparing
        this.head(
            `${this.attacker.name} 向 ${this.defender.name} 發起挑戰！`
        );
        this.attacker.prepare(this.defender, this);
        this.defender.prepare(this.attacker, this);

        // take turns attacking each other
        let next = this.attacker;
        let prev = this.defender;
        while (this.result < -1 || this.result > 1) {
            if (this.attacker.isDefeated(this.defender, this)) {
                this.result = -1;
            } else if (this.defender.isDefeated(this.attacker, this)) {
                this.result = 1;
            } else if (this.nround >= MAX_ROUNDS) {
                this.sum("雙方大戰三百回合不分勝負💤");
                this.result = 0;
            } else {
                this.nround++;
                next.attack(prev, this);
                let tmp = next;
                next = prev;
                prev = tmp;
            }
        }

        // both sides finish up
        this.attacker.finish(this.defender, this);
        this.defender.finish(this.attacker, this);

        // determine the result
        let win;
        if (this.result == -1) win = `${this.defender.name}獲勝`;
        else if (this.result == 0) win = `雙方不分軒輊`;
        else if (this.result == 1) win = `${this.attacker.name}獲勝`;
        this.sum(`對戰結束! ${win}`);
    }

    start() {
        // initialization
        this.time = Date.now();
        this.nround = 0;
        this.result = -49;
        this.heading = [];
        this.record = [];
        this.summary = [];
        try {
            this.#start();
        } catch (error) {
            logger.error(error);
            this.nround = 0;
            this.record = [];
            this.result = -2;
        }
    }

    head(msg) {
        this.heading.push(msg);
    }
    log(msg) {
        this.record.push(msg);
    }
    sum(msg) {
        this.summary.push(msg);
    }

    dump() {
        let res;
        if (this.result === -1) res = "lose";
        else if (this.result === 0) res = "tie";
        else if (this.result === 1) res = "win";
        else res = "error";
        // new Date(this.time).toLocaleString("zh-TW");
        return {
            time: this.time,
            title: this.title,
            result: res,
            attacker: this.attacker.dump(),
            defender: this.defender.dump(),
            nround: this.nround,
            heading: this.heading,
            record: this.record,
            summary: this.summary,
        };
    }

    save() {
        let file_name = `match_${this.time}.json`;
        let path = `./data/match/${file_name}`;
        File.writeObj(path, this.dump());
        logger.log(`match written to '${path}'`);
        return file_name;
    }
}

module.exports = Match;
