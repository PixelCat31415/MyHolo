// handle battles

const fio = require("./File");

const MAX_ROUNDS = 100;

class Match {
    time;
    title;
    attacker;
    defender;
    nround;
    record;
    result;

    constructor(atker, defer, info) {
        this.title = info || "Yet Another Match";
        this.attacker = atker;
        this.defender = defer;
    }

    #start() {
        this.time = Date.now();
        this.nround = 0;
        this.record = [];
        this.result = -49;

        this.log(
            `Challenge from ${this.attacker.name} to ${this.defender.name}...`
        );

        this.attacker.prepare(this.defender, this);
        this.defender.prepare(this.attacker, this);

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

        this.attacker.finish(this.defender, this);
        this.defender.finish(this.attacker, this);

        let win;
        if (this.result == -1) win = `${this.defender.name}獲勝`;
        else if (this.result == 0) win = `雙方不分軒輊`;
        else if (this.result == 1) win = `${this.attacker.name}獲勝`;
        this.log(`對戰結束! ${win}`);
    }

    start(){
        try{
            this.#start();
        }catch(error){
            this.nround = 0;
            this.record = [];
            this.result = -2;
        }
    }

    log(msg) {
        this.record.push(msg);
    }

    save() {
        fio.writeObj(`./data/match/match_${this.time}.json`, this);
    }
}

module.exports = Match;
