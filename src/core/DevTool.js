/*
backend for the developer's tool
this module works independantly. it only relys on module File, Points, and Match
which means that it might look a little bit different from the actual character modules

~~probably~~ surely the most "dirty" module in this project
i should have written this in a better manner
but this module is rather less important so i'll just leave it as it is for now
*/

"use strict";

const { ipcMain } = require("electron");

const log4js = require("log4js");
let logger = log4js.getLogger("Devtool");
logger.level = "all";

const fio = require("../core/File");
const Points = require("../core/Points");
const Match = require("../core/Match");

let win;

let NO_MSG = false;
function pushMessage(tp, ti, ms, wh) {
    if (NO_MSG) return;
    win.webContents.send("dev-message", {
        type: tp,
        title: ti,
        message: ms,
        where: wh,
    });
}

function makeFunction(fname, body) {
    let func;
    try {
        func = eval(`function __F(self, opp, match) {${body}}; __F`);
    } catch (error) {
        pushMessage(
            "error",
            "函數解析錯誤",
            `函數解析時發生錯誤。\n錯誤訊息：「${error}」`,
            `解析角色成員函數 '${fname}'`
        );
        console.error(error);
        throw error;
    }
    return func;
}

function callFunction(fname, func, ...args) {
    try {
        return func(...args);
    } catch (error) {
        pushMessage(
            "error",
            "函數執行錯誤",
            `函數執行時發生錯誤。\n錯誤訊息：「${error}」`,
            `執行角色成員函數 '${fname}'`
        );
        console.error(error);
        throw error;
    }
}

function getInt(key, x) {
    x = parseInt(x);
    if (typeof x !== "number" || x !== x) {
        pushMessage(
            "warning",
            "數值錯誤",
            `數值 '${key}' 不是整數，自動填入預設值「0」。`,
            "角色數值設定"
        );
        return 0;
    }
    return x;
}

function getPoint(key, f, lall, l2) {
    l2 = getInt(`能力值 ${key} 等級`, l2);
    try {
        f = eval(`function __F(lvl_all, lvl){return ${f}}; __F`);
    } catch (error) {
        pushMessage(
            "error",
            "能力值函數解析錯誤",
            `能力值 ${key} 函數解析時發生錯誤。\n錯誤訊息：「${error}」`,
            `解析角色能力值函數 '${key}'`
        );
        console.error(error);
        throw error;
    }
    try {
        // console.log(`${lall}: ${typeof lall}, ${l2}: ${typeof l2}`)
        // console.log(`${f(lall,l2)}: ${typeof f(lall,l2)}`);
        return f(lall, l2);
    } catch (error) {
        pushMessage(
            "error",
            "能力值函數執行錯誤",
            `能力值 ${key} 函數執行時發生錯誤。\n錯誤訊息：「${error}」`,
            `執行角色能力值函數 '${key}'`
        );
        console.error(error);
        throw error;
    }
}

class TestPlayer {
    name;
    pts0;
    pts;

    fprepare;
    fattack;
    fisDefeated;
    ffinish;

    constructor() {
        this.pts0 = new Points();
        this.pts = new Points();
    }

    setName(arg) {
        if (!arg) {
            this.name = "I8E23A";
            pushMessage(
                "warning",
                "數值錯誤",
                "角色名稱未填寫，自動填入預設值「I8E23A」。",
                "角色名稱設定"
            );
        } else {
            this.name = arg;
        }
    }

    setPoint(key, func, lvl0, lvl) {
        // let owo = (x)=>{console.log(`owo ${x}: ${typeof x}`)};
        // owo(func);
        // owo(lvl0);
        // owo(lvl);
        // console.log(key, this.pts[key], this.pts0[key]);

        this.pts[key] = getPoint(key, func, lvl0, lvl);
        this.pts0[key] = this.pts[key];
    }

    setFunc(key, body) {
        this[key] = makeFunction(key, body);
    }

    prepare(opp, match) {
        this.pts = new Points(this.pts0);
        callFunction("prepare", this.fprepare, this, opp, match);
    }
    attack(opp, match) {
        match.log(`${this.name}'s turn...`);
        callFunction("attack", this.fattack, this, opp, match);
    }
    isDefeated(opp, match) {
        return callFunction("isDefeated", this.fisDefeated, this, opp, match);
    }
    finish(opp, match) {
        callFunction("finish", this.ffinish, this, opp, match);
    }
}

class DevTool {
    p;

    constructor() {
        this.p = [new TestPlayer(), new TestPlayer()];
    }

    init(_win) {
        win = _win;
        pushMessage("info", "好耶", "成功連接核心", "MyHolo Core");
        ipcMain.handle("dev-match", async (event) => {
            pushMessage("info", "好耶", "成功送出請求", "MyHolo Core");
            let mat = new Match(this.p[0], this.p[1], "第48763回合測試對戰");
            mat.start();
            // console.log(mat);
            return {
                time: mat.time,
                title: mat.title,
                attacker_name: mat.attacker.name,
                defender_name: mat.defender.name,
                nround: mat.nround,
                record: mat.record,
                result: mat.result,
            };
        });
        ipcMain.handle("dev-save", async (event, data) => {
            const reg = /[^a-zA-Z0-9]/g;
            let fname = data.name.replace(reg, "-");
            let fpath = `data/characters/${fname}.json`;
            fio.writeObj(fpath, data);
            pushMessage(
                "info",
                "已儲存",
                `已儲存角色資訊至檔案 '${fpath}'`,
                "MyHolo Core"
            );
        });
        ipcMain.handle("dev-mute", async (event, data) => {
            NO_MSG = data;
        });

        ipcMain.handle("dev-set-name", async (event, id, arg) => {
            // console.log(`SET NAME ${id}: ${arg}`);
            this.p[id].setName(arg);
        });
        ipcMain.handle(
            "dev-set-points",
            async (event, id, lvl0, funcs, lvls) => {
                // console.log(`SET POINTS ${id}:\nlvl0: ${lvl0}\nfuncs: ${JSON.stringify(funcs)}\nlvls: ${JSON.stringify(lvls)}`)
                lvl0 = getInt("level_0", lvl0);
                for (let key of Points.entries) {
                    this.p[id].setPoint(key, funcs[key], lvl0, lvls[key]);
                }
            }
        );
        ipcMain.handle("dev-set-func", async (event, id, key, body) => {
            // console.log(`SET FUNC ${id} ${key}: ${body.slice(0,15)}...`);
            this.p[id].setFunc(key, body);
        });
        ipcMain.handle("dev-get-pts", async (event, id) => {
            return this.p[id].pts0;
        });
    }
}

logger.log("loaded devtools");

module.exports = new DevTool();
