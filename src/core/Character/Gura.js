const Character0 = require("./Character0");
const Player = require("../Player");

class Gura extends Character0 {
    static get hidden (){
        return false;
    }

    constructor(){
        super({
            name: "Gawr Gura",
            avatar: "gawr_gura.jpg",
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

    attack(opp, match) {
        let str = 0;
        let harm = 0;
        let luk = 0;
        let dod = 0;
        let skl = 0;
        let sklq1 = 0;
        let sklq2 = 0;
        let sklq3 = 0;
        let sklq4 = 0;
        let sklq5 = 0;
        let sklp = 0;
        let mov = 0;
        let tri = 0;

        skl = Math.floor((this.abil.skl - 10) / 100 + 1);

        sklq1 = 1;
        sklq2 = 1 + (1 + 0.001 * this.abil.skl);
        sklq3 =
            1 + (1 + 0.001 * this.abil.skl) + (1 + 0.001 * this.abil.skl) ** 2;
        sklq4 =
            1 +
            (1 + 0.001 * this.abil.skl) +
            (1 + 0.001 * this.abil.skl) ** 2 +
            (1 + 0.001 * this.abil.skl) ** 3;
        sklq5 =
            1 +
            (1 + 0.001 * this.abil.skl) +
            (1 + 0.001 * this.abil.skl) ** 2 +
            (1 + 0.001 * this.abil.skl) ** 3 +
            (1 + 0.001 * this.abil.skl) ** 4;

        if (skl <= 1) {
            sklp = sklq1;
        } else if (skl <= 2) {
            sklp = sklq2;
        } else if (skl <= 3) {
            sklp = sklq3;
        } else if (skl <= 4) {
            sklp = sklq4;
        } else {
            sklp = sklq5;
        }

        if (Math.random() <= sklq1 / sklp) {
            mov = 0.5;
            tri = "技能1";
        } else if (Math.random() <= sklq2 / sklp) {
            mov = 0.8;
            tri = "技能2";
        } else if (Math.random() <= sklq3 / sklp) {
            mov = 1;
            tri = "技能3";
        } else if (Math.random() <= sklq4 / sklp) {
            mov = 1.2;
            tri = "技能4";
        } else {
            mov = 1.5;
            tri = "技能5";
        }

        this.abil.str = this.abil.str - 8 - 4 * Math.random();

        if (this.abil.str < 0) {
            this.abil.str = 0;
        }

        str = 0.6 * Math.log10(this.abil.str + 1);
        luk = 0.1 + 0.0001 * this.abil.luk;

        this.abil.atk = this.max_abil.atk * str;
        this.abil.agi = this.max_abil.agi * str;
        this.abil.def = this.max_abil.def * str + 1;

        harm =
            (this.abil.atk * this.abil.atk * (0.8 + Math.random() * 0.4) * mov) /
            (this.abil.atk + opp.abil.def);
        harm = Math.floor(harm);
        dod = 0.2 * Math.pow(opp.abil.agi / this.abil.agi, 0.4);

        if (dod - Math.random() > 0) {
            match.log(`${opp.name} 躲開了 ${this.name} 的攻擊`);
        } else {
            if (luk - Math.random() > 0) {
                if (Math.random() > 0.99) {
                    opp.abil.hp = opp.abil.hp - harm * 100;
                    match.log(
                        `${this.name} 使出 ${tri} 對 ${opp.name} 造成${
                            harm * 100
                        }點超大爆擊傷害`
                    );
                } else if (Math.random() > 0.8) {
                    opp.abil.hp = opp.abil.hp - harm * 10;
                    match.log(
                        `${this.name} 使出 ${tri} 對 ${opp.name} 造成${
                            harm * 10
                        }點爆擊傷害`
                    );
                } else {
                    opp.abil.hp = opp.abil.hp - Math.floor(harm * 1.5);
                    match.log(
                        `${this.name} 使出 ${tri} 對 ${
                            opp.name
                        } 造成${Math.floor(harm * 1.5)}點重擊傷害`
                    );
                }
            } else {
                opp.abil.hp = opp.abil.hp - harm;
                match.log(
                    `${this.name} 使出 ${tri} 對 ${opp.name} 造成${harm}點傷害`
                );
            }
        }
        return;
    }

    finish(opp, match) {
        if(match.result < 0 && opp.is_player){
            opp.kill();
        }
    }
}

module.exports = Gura;
