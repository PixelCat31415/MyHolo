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

    let makeBlock = function (title, body) {
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

let msgcount = 0;
let msgdiv = $("#dev-msg");
function showMessage(msg) {
    let msgid=msgcount;
    msgcount++;
    msgdiv.append(
        $("<div>", {
            class: `msg msg-${msg.type}`,
            id: `msg${msgid}`,
            style: "display: flex; align-items: center;",
        })
            .append(
                $("<button>", {
                    text: "OK",
                    onclick: `$('#msg${msgid}').remove()`,
                    style: "width: 50px; margin-right: 30px",
                })
            )
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
    );
    if (msg.type === "info") {
        setTimeout(() => {
            $(`#msg${msgid}`).remove();
        }, 3000);
    }
}

async function testMatch() {
    $(".msg").remove();
    let f1 = getFormData("#form1");
    let f2 = getFormData("#form2");
    let mat = await core.send("dev-match", f1, f2);
    console.log("match completed");
    showMatch(mat);
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
