const Character0 = require("./Character0");

class Gura extends Character0 {
    static get avator() {
        return "gawr_gura.jpg";
    }
    static attack(self, opp, match) {
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

        skl = Math.floor((self.abil.skl - 10) / 100 + 1);

        sklq1 = 1;
        sklq2 = 1 + (1 + 0.001 * self.abil.skl);
        sklq3 =
            1 + (1 + 0.001 * self.abil.skl) + (1 + 0.001 * self.abil.skl) ** 2;
        sklq4 =
            1 +
            (1 + 0.001 * self.abil.skl) +
            (1 + 0.001 * self.abil.skl) ** 2 +
            (1 + 0.001 * self.abil.skl) ** 3;
        sklq5 =
            1 +
            (1 + 0.001 * self.abil.skl) +
            (1 + 0.001 * self.abil.skl) ** 2 +
            (1 + 0.001 * self.abil.skl) ** 3 +
            (1 + 0.001 * self.abil.skl) ** 4;

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

        self.abil.str = self.abil.str - 8 - 4 * Math.random();

        if (self.abil.str < 0) {
            self.abil.str = 0;
        }

        str = 0.6 * Math.log10(self.abil.str + 1);
        luk = 0.1 + 0.0001 * self.abil.luk;

        self.abil.atk = self.max_abil.atk * str;
        self.abil.agi = self.max_abil.agi * str;
        self.abil.def = self.max_abil.def * str + 1;

        harm =
            (self.abil.atk * self.abil.atk * (0.8 + Math.random() * 0.4) * mov) /
            (self.abil.atk + opp.abil.def);
        harm = Math.floor(harm);
        dod = 0.2 * Math.pow(opp.abil.agi / self.abil.agi, 0.4);

        if (dod - Math.random() > 0) {
            match.log(`${opp.name} 躲開了 ${self.name} 的攻擊`);
        } else {
            if (luk - Math.random() > 0) {
                if (Math.random() > 0.99) {
                    opp.abil.hp = opp.abil.hp - harm * 100;
                    match.log(
                        `${self.name} 使出 ${tri} 對 ${opp.name} 造成${
                            harm * 100
                        }點超大爆擊傷害`
                    );
                } else if (Math.random() > 0.8) {
                    opp.abil.hp = opp.abil.hp - harm * 10;
                    match.log(
                        `${self.name} 使出 ${tri} 對 ${opp.name} 造成${
                            harm * 10
                        }點爆擊傷害`
                    );
                } else {
                    opp.abil.hp = opp.abil.hp - Math.floor(harm * 1.5);
                    match.log(
                        `${self.name} 使出 ${tri} 對 ${
                            opp.name
                        } 造成${Math.floor(harm * 1.5)}點重擊傷害`
                    );
                }
            } else {
                opp.abil.hp = opp.abil.hp - harm;
                match.log(
                    `${self.name} 使出 ${tri} 對 ${opp.name} 造成${harm}點傷害`
                );
            }
        }
        return;
    }
}

module.exports = Gura;
