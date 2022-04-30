"use strict";

let defultVal = {
    name: "I8E23A",
    hp: "0",
    atk: "0",
    def: "0",
    agi: "0",
    str: "0",
    skl: "0",
    luk: "0",
    prepare: "self.pts = new Points(self.maxPts);",
    attack: "",
    isDefeated: "return self.pts.hp < 0;",
    finish: "",
};
function resetAll(id) {
    for (let key in defultVal) {
        $(`#${key}${id}`).val(defultVal[key]);
    }
}

function getFormData(id) {
    let form = new FormData($(id)[0]);
    let res = {};
    for (let key of form) {
        res[key[0]] = key[1];
    }
    return res;
}

function makeBlock (title, body) {
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
};

function showMatch(mat) {
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
        .append(makeBlock("攻擊方", mat.attacker.name))
        .append(makeBlock("防守方", mat.defender.name))
        .append(makeBlock("獲勝者", win))
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

const BAR_WIDTH=180;
function makeBars(title, items){
    let tot=0;
    for(let k in items) tot+=items[k];

    let $bars = $("<div>", { style: "margin-top: 0px;" });
    for(let k in items){
        let ratio=items[k]/tot;
        let $bar = $("<div>", {style: "padding-left: 10px;"});
        $bar.append($("<div>", {style: `display: inline-block; margin: 3px 0px; height: 20px; width: ${BAR_WIDTH*ratio}px; background-color: #7bcaff; vertical-align: top`}));
        $bar.append($("<div>", {style: `display: inline-block; margin: 3px 0px; height: 20px; width: ${BAR_WIDTH*(1-ratio)}px; background-color: #def2ff; vertical-align: top`}));
        $bar.append($("<div>",{text: `( ${Math.round(ratio*100)}% / ${items[k]} ) ${k}`, style: "display: inline-block; margin: 3px 10px; height: 20px; vertical-align: top"}));
        $bars.append($bar);
        // console.log(`${k}: ${items[k]} = ${ratio}`);
    }
    console.log(items);
    console.log($bars);

    let res=$("#results");
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
let msgdiv = $("#dev-msg");
function showMessage(msg) {
    let msgid=msgcount;
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

async function testMatch() {
    $(".msg").remove();
    let f1 = getFormData("#form1");
    let f2 = getFormData("#form2");
    let mat = await core.send("dev-match", f1, f2);
    console.log("match completed");
    showMatch(mat);
}

async function batchMatch(nrnd){
    $(".msg").remove();
    await core.send("dev-mute", true);
    showMessage({
        type: "info",
        title: "警告訊息已移除",
        message: "在批次測試中不會顯示錯誤訊息",
        where: "MyHolo Tester",
    });
    let $res=$("#results");
    $res.empty();
    $res.append(makeBlock("OAO......",`對戰進行中 ( 0 / ${nrnd} )`));

    let wincnt={
        "雙方平手": 0,
        "攻擊方": 0,
        "防守方": 0,
        "執行錯誤": 0
    };
    let step=5;
    let end={};
    for(let i=step;i<=100;i+=step) end[`${i-step+1} - ${i}`]=0;
    for(let rnd=0;rnd<nrnd;rnd++){
        let f1 = getFormData("#form1");
        let f2 = getFormData("#form2");
        let mat = await core.send("dev-match", f1, f2);
        let win = mat.result;
        if (win === 0) win = "雙方平手";
        else if (win === 1) win = "攻擊方";
        else if (win === -1) win = "防守方";
        else win = "執行錯誤";
        wincnt[win]++;
        if(win=="執行錯誤") continue;
        let rd=mat.nround;
        rd=Math.ceil(rd/step)*step;
        end[`${rd-step+1} - ${rd}`]++;
        // console.log(`${win} => ${rd}`);
        if(rnd%10==9){
            $res.empty();
            $res.append(makeBlock("OAO......",`對戰進行中 ( ${rnd+1} / ${nrnd} )`));
        }
    }

    $res.empty();
    $res.append(makeBlock("批次對戰數", nrnd));
    makeBars("勝率統計", wincnt);
    makeBars("結束回合數統計", end);
    await core.send("dev-mute", false);
}

function saveData(id){
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
