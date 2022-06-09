"use strict";

let defultVal = {
    name: "I8E23A",
    lvl: "49",

    hp: "0",
    atk: "0",
    def: "0",
    agi: "0",
    str: "0",
    skl: "0",
    luk: "0",

    // hp: (lvl) => 400 * Math.pow(1.07, lvl) - 400,
    // atk: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
    // def: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
    // agi: (lvl) => 25 * Math.pow(1.06, lvl) - 23,
    // str: (lvl) => (100 * Math.log(lvl + 10)) / Math.log(1.5) - 400,
    // skl: (lvl) => 10 * lvl + 10,
    // luk: (lvl) => 10 * lvl + 10,

    f_hp: "400 * Math.pow(1.07, (lvl_all+lvl)) - 400",
    f_atk: "25 * Math.pow(1.06, (lvl_all+lvl)) - 23",
    f_def: "25 * Math.pow(1.06, (lvl_all+lvl)) - 23",
    f_agi: "25 * Math.pow(1.06, (lvl_all+lvl)) - 23",
    f_str: "(100 * Math.log((lvl_all+lvl) + 10)) / Math.log(1.5) - 400",
    f_skl: "10 * (lvl_all+lvl) + 10",
    f_luk: "10 * (lvl_all+lvl) + 10",

    prepare: "self.pts = new Points(self.pts0);",
    attack: `
let str = 0;
let harm = 0;
let luk = 0;
let dod =0;

self.pts.str = self.pts.str - 8 - 4 * Math.random();

if(self.pts.str<0){
    self.pts.str = 0;
}

str = 0.6 *  Math.log10(self.pts.str + 1);
luk = 0.1 + 0.0001 * self.pts.luk;

self.pts.atk = self.pts0.atk * str;
self.pts.agi = self.pts0.agi * str;
self.pts.def = self.pts0.def * str + 1;

harm = self.pts.atk * self.pts.atk * ( 0.8 + Math.random() *0.4 ) / ( self.pts.atk + opp.pts.def );
harm = Math.floor(harm);
dod = 0.2 * Math.pow( opp.pts.agi /self.pts.atk , 0.4)

if(dod - Math.random() > 0){
    match.log(\`\${opp.name} 躲開了 \${self.name} 的攻擊\`);
}
else{
    if(luk - Math.random() > 0){
        opp.pts.hp = opp.pts.hp - harm * 2;
        match.log(\`\${self.name} 對 \${opp.name} 造成\${harm * 2}點爆擊傷害\`);
    }
    else{
        opp.pts.hp = opp.pts.hp - harm ;
        match.log(\`\${self.name} 對 \${opp.name} 造成\${harm}點傷害\`);
    }
}
return;
    `,
    isDefeated: "return self.pts.hp < 0;",
    finish: "",
};

function resetAll(id) {
    for (let key in defultVal) {
        $(`#${key}${id}`).val(defultVal[key]);
    }
}

function makeBlock(title, body) {
    return $("<div>", { class: "res-box" })
        .append(
            $("<p>", {
                class: "res-title",
                text: title,
            })
        )
        .append(
            $("<p>", {
                class: "res-body",
                text: body,
            })
        );
}

function makePtsBlock(title, pts) {
    let b = $("<div>", { class: "res-box" }).append(
        $("<p>", {
            class: "res-title",
            text: title,
        })
    );
    for (let k in pts) {
        b.append(
            $("<p>", {
                class: "res-body",
                text: `${k} = ${(Math.round(pts[k] * 100) / 100).toFixed(2)}`,
                style: 'font-family: "Ubuntu Mono"',
            })
        );
    }
    return b;
}

async function showMatch(mat) {
    let $rec = $("<ol>", { style: "margin-top: 0px;" });
    for (let r of mat.record) {
        $rec.append($("<li>", { class: "res-body", text: r }));
    }
    let win = mat.result;
    if (win === 0) win = "雙方平手";
    else if (win === 1) win = "攻擊方";
    else if (win === -1) win = "防守方";
    else win = "執行錯誤";

    let res = $("#results");
    res.empty();

    res.append(makeBlock("標題", mat.title))
        .append(
            makeBlock("對戰時間", new Date(mat.time).toLocaleString("zh-TW"))
        )
        .append(makeBlock("回合數", mat.nround))
        .append(makeBlock("攻擊方", mat.attacker_name))
        .append(makeBlock("防守方", mat.defender_name))
        .append(makeBlock("獲勝者", win))
        .append(
            makePtsBlock("攻擊方初始能力值", await core.send("dev-get-pts", 0))
        )
        .append(
            makePtsBlock("防守方初始能力值", await core.send("dev-get-pts", 1))
        )
        .append(
            $("<div>", { class: "res-box" })
                .append(
                    $("<p>", {
                        class: "res-title",
                        text: "對戰紀錄",
                    })
                )
                .append($rec)
        );
}

const BAR_WIDTH = 180;
function makeBars(title, items) {
    let tot = 0;
    for (let k in items) tot += items[k];

    let $bars = $("<div>", { style: "margin-top: 0px;" });
    for (let k in items) {
        let ratio = items[k] / tot;
        let $bar = $("<div>", { style: "padding-left: 10px;" });
        $bar.append(
            $("<div>", {
                style: `display: inline-block; margin: 3px 0px; height: 20px; width: ${
                    BAR_WIDTH * ratio
                }px; background-color: #7bcaff; vertical-align: top`,
            })
        );
        $bar.append(
            $("<div>", {
                style: `display: inline-block; margin: 3px 0px; height: 20px; width: ${
                    BAR_WIDTH * (1 - ratio)
                }px; background-color: #def2ff; vertical-align: top`,
            })
        );
        $bar.append(
            $("<div>", {
                text: `( ${Math.round(ratio * 100)}% / ${items[k]} ) ${k}`,
                style: "display: inline-block; margin: 3px 10px; height: 20px; vertical-align: top",
            })
        );
        $bars.append($bar);
        // console.log(`${k}: ${items[k]} = ${ratio}`);
    }
    console.log(items);
    console.log($bars);

    let res = $("#results");
    res.append(
        $("<div>", { class: "res-box" })
            .append(
                $("<p>", {
                    class: "res-title",
                    text: title,
                })
            )
            .append($bars)
    );
}

let msgcount = 0;
let msgdiv = $("#devmsg");
function showMessage(msg) {
    console.log("message received");
    let msgid = msgcount;
    msgcount++;
    msgdiv.append(
        $("<div>", {
            class: `msg msg-${msg.type}`,
            id: `msg${msgid}`,
        })
            .append(
                $("<div>", {
                    text: msg.title + "！",
                    style: "display: inline-block; font-weight: bold;",
                })
            )
            .append(
                $("<div>", {
                    text: msg.message,
                    style: "display: inline-block; flex-grow: 1;",
                })
            )
            .append(
                $("<div>", {
                    text: "來源： " + msg.where,
                    style: "display: inline-block; color: #333333;",
                })
            )
            .append(
                $("<button>", {
                    text: "OK",
                    onclick: `$('#msg${msgid}').remove()`,
                    style: "width: 50px; margin: 0px 10px;",
                })
            )
    );
    // if (msg.type === "info") {
    //     setTimeout(() => {
    //         $(`#msg${msgid}`).remove();
    //     }, 3000);
    // }
}

let pts_entries = ["hp", "atk", "def", "agi", "str", "skl", "luk"];

async function init_player(id) {
    let form = new FormData($(`#form${id}`)[0]);
    id--;
    let data = {};
    for (let key of form) {
        data[key[0]] = key[1];
    }

    let pms = [];

    pms.push(core.send("dev-set-name", id, data["name"]));

    let pts_lvl = {};
    let pts_f = {};
    for (let k of pts_entries) {
        pts_lvl[k] = data[k];
        pts_f[k] = data[`f_${k}`];
    }
    pms.push(core.send("dev-set-points", id, data["lvl"], pts_f, pts_lvl));

    pms.push(core.send("dev-set-func", id, "fprepare", data["prepare"]));
    pms.push(core.send("dev-set-func", id, "fattack", data["attack"]));
    pms.push(core.send("dev-set-func", id, "fisDefeated", data["isDefeated"]));
    pms.push(core.send("dev-set-func", id, "ffinish", data["finish"]));

    for (let p of pms) {
        await p;
    }
}

async function testMatch() {
    $(".msg").remove();
    await init_player(1);
    await init_player(2);
    let mat = await core.send("dev-match");
    console.log("match completed");
    console.log(mat);
    showMatch(mat);
}

async function batchMatch(nrnd) {
    $(".msg").remove();
    await core.send("dev-mute", true);
    showMessage({
        type: "info",
        title: "警告訊息已移除",
        message: "在批次測試中不會顯示錯誤訊息",
        where: "MyHolo Tester",
    });
    let $res = $("#results");
    $res.empty();
    $res.append(makeBlock("OAO......", `對戰進行中 ( 0 / ${nrnd} )`));

    let wincnt = {
        雙方平手: 0,
        攻擊方勝: 0,
        防守方勝: 0,
        執行錯誤: 0,
    };
    let step = 5;
    let end = {};
    for (let i = step; i <= 100; i += step) end[`${i - step + 1} - ${i}`] = 0;

    await init_player(1);
    await init_player(2);
    for (let rnd = 0; rnd < nrnd; rnd++) {
        let mat = await core.send("dev-match");
        let win = mat.result;
        if (win === 0) win = "雙方平手";
        else if (win === 1) win = "攻擊方勝";
        else if (win === -1) win = "防守方勝";
        else win = "執行錯誤";
        wincnt[win]++;
        if (win == "執行錯誤") continue;
        let rd = mat.nround;
        rd = Math.ceil(rd / step) * step;
        end[`${rd - step + 1} - ${rd}`]++;
        // console.log(`${win} => ${rd}`);
        if (rnd % 10 == 9) {
            $res.empty();
            $res.append(
                makeBlock("OAO......", `對戰進行中 ( ${rnd + 1} / ${nrnd} )`)
            );
        }
    }

    $res.empty();
    $res.append(makeBlock("批次對戰數", nrnd))
        .append(
            makePtsBlock("攻擊方初始能力值", await core.send("dev-get-pts", 0))
        )
        .append(
            makePtsBlock("防守方初始能力值", await core.send("dev-get-pts", 1))
        );
    makeBars("勝率統計", wincnt);
    makeBars("結束回合數統計", end);
    await core.send("dev-mute", false);
}

function saveData(id) {
    let form = getFormData(`#form${id}`);
    core.send("dev-save", form);
}

function initDev() {
    resetAll(1);
    resetAll(2);

    core.handle("dev-message", async (event, data) => {
        console.log(`dev message from main process:`);
        console.log(data);
        showMessage(data);
    });
}

$(()=>{
    $("#pg_dev_container").load("html/devtool.html", initDev);
})
