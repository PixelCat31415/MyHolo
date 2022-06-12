// handle battles

const fio = require("./File");
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
    record;
    summary;

    constructor(atker, defer, info) {
        this.title = info || "Yet Another Match";
        this.attacker = atker;
        this.defender = defer;
    }

    #start() {
        // both sides do preparing
        this.log(
            `Challenge from ${this.attacker.name} to ${this.defender.name}...`
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
                this.log("雙方大戰三百回合不分勝負💤");
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

    start(){
        // initialization
        this.time = Date.now();
        this.nround = 0;
        this.result = -49;
        this.record = [];
        this.summary = [];
        try{
            this.#start();
        }catch(error){
            logger.error(error);
            this.nround = 0;
            this.record = [];
            this.result = -2;
        }
    }

    log(msg) {
        this.record.push(msg);
    }
    sum(msg) {
        this.summary.push(msg);
    }

    dump(){
        let res;
        if(this.result === -1) res = "lose";
        else if(this.result === 0) res = "tie";
        else if(this.result === 1) res = "win";
        else res = "error";
        let loc_time = new Date(this.time).toLocaleString("zh-TW")
        return {
            time: loc_time,
            title: this.title,
            result: res,
            attacker: this.attacker.dump(),
            defender: this.defender.dump(),
            nround: this.nround,
            record: this.record,
            summary: this.summary,
        }
    }
}

module.exports = Match;
