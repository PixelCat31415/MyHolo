"use strict";

const {ipcMain} = require("electron");

const Points = require("./Points");
const Match = require("./Match");

let win;

function pushMessage(tp, ti, ms, wh) {
    win.webContents.send("dev-message", {
        type: tp,
        title: ti,
        message: ms,
        where: wh,
    });
}

class TestPlayer {
    #formData;
    name;
    pts;
    maxPts;

    constructor(data) {
        this.formData = data;

        this.name = this.formData.name;
        if (!this.name) {
            this.name = "I8E23A";
            pushMessage(
                "warning",
                "數值錯誤",
                "角色名稱未填寫，自動填入預設值「I8E23A」。",
                "角色名稱設定"
            );
        }

        this.maxPts = {
            hp: this.formData.hp,
            atk: this.formData.atk,
            def: this.formData.def,
            agi: this.formData.agi,
            str: this.formData.str,
            skl: this.formData.skl,
            luk: this.formData.luk,
        };
        for (let key in this.maxPts) {
            this.maxPts[key] = parseInt(this.maxPts[key]);
            if (
                typeof this.maxPts[key] !== "number" ||
                this.maxPts[key] !== this.maxPts[key]
            ) {
                pushMessage(
                    "warning",
                    "數值錯誤",
                    "能力值不是整數，自動填入預設值「0」。",
                    "角色能力值設定"
                );
                this.maxPts[key] = 0;
            }
        }
        this.pts = new Points(this.maxPts);
    }

    callForm(fname, ...args) {
        let body = this.formData[fname];
        let func;
        try {
            func = eval(`function f(self, opp, match) {${body}}; f`);
        } catch (error) {
            pushMessage(
                "error",
                "函數解析錯誤",
                `函數解析時發生錯誤。\n錯誤訊息：「${error}」`,
                `解析角色成員函數 '${fname}'`
            );
            return;
        }
        try {
            return func(...args);
        } catch (error) {
            pushMessage(
                "error",
                "函數執行錯誤",
                `函數執行時發生錯誤。\n錯誤訊息：「${error}」`,
                `執行角色成員函數 '${fname}'`
            );
        }
    }

    prepare(opp, match) {
        this.callForm("prepare", this, opp, match);
    }
    attack(opp, match) {
        match.log(`${this.name}'s turn...`);
        this.callForm("attack", this, opp, match);
    }
    isDefeated(opp, match) {
        return this.callForm("isDefeated", this, opp, match);
    }
    finish(opp, match) {
        this.callForm("finish", this, opp, match);
    }
}

function testMatch(form1, form2) {
    let p1 = new TestPlayer(form1);
    let p2 = new TestPlayer(form2);
    let mat = new Match(p1, p2, "第48763回合測試對戰");
    mat.start();
    return mat;
}

let devTool = {
    init: function (_win) {
        win = _win;
        pushMessage("info", "好耶", "成功連接核心", "MyHolo Core");
        ipcMain.handle("dev-match", async (event, f1, f2) => {
            pushMessage("info", "好耶", "成功送出請求", "MyHolo Core");
            return testMatch(f1, f2);
        });
    },
};

module.exports = devTool;
