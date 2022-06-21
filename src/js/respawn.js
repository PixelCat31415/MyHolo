let resp_char;
let resp_credit = 0;
let resp_abil = {};

async function refreshRespCandidate(charid) {
    resp_char = charid;
    $(".candidate_selected").removeClass("candidate_selected");
    $(`#candidate_char_${charid}`).addClass("candidate_selected");
    let char = await core.send("game-get-char", charid);
    $(".resp_char").text(char.char_name);
    $(".resp_avatar").attr("src", `../assets/avatars/${char.avatar}`);
    $(".resp_motto").text(char.motto);
    for(let i=0;i<5;i++){
        $(`.resp_skill${i}`).text(char.skills[i]);
    }
    refreshRespAbil();
}

async function refreshRespAbil() {
    let player = await game.getPlayer();
    $(".resp_credit").text(player.resp_credit);
    let abil = await core.send("game-get-respAbil", resp_char, resp_abil);
    for (let key of abil_entries) {
        $(`.resp_abil_add_${key[0]}`).text(`+${(resp_abil[key[0]] / 10).toFixed(1)}`);
        $(`.resp_abil_${key[0]}`).text(Math.round(abil[key[0]]));
    }
    $(".resp_credit").text(resp_credit);
}

async function resetRespAbil() {
    let player = await game.getPlayer();
    resp_credit = player.resp_credit;
    resp_abil = { ...player.resp_abil };
    refreshRespAbil();
}

async function doAddResp(key, delta) {
    let new_credit = resp_credit - delta;
    let new_abil = resp_abil[key] + delta;
    if (
        new_credit > (await game.getPlayer()).resp_credit ||
        new_credit < 0 ||
        new_abil < 0
    ) {
        return;
    }
    resp_credit = new_credit;
    resp_abil[key] = new_abil;
    refreshRespAbil();
}

async function doResp() {
    await core.send("game-do-respawn", resp_char, resp_credit, resp_abil);
    resetRespAbil();
    refreshPlayer();
    redirectPage("my");
}

async function buildRespAbils() {
    let table = $("#resp_abilities");
    for (let key of abil_entries) {
        table.append(
            $("<tr>")
                .append(
                    $("<td>", {
                        text: key[1],
                    })
                )
                .append(
                    $("<td>", {
                        style: "padding: 0;",
                    })
                        .append(
                            $("<span>", {
                                text: "Lv 1 ",
                            })
                        )
                        .append(
                            $("<button>", {
                                class: "button_abil_add",
                                text: "➖",
                                onclick: `doAddResp(\"${key[0]}\", -1)`,
                            })
                        )
                        .append(
                            $("<span>", {
                                style: "color: green; width: 50px; display: inline-block; text-align: right;",
                                class: `resp_abil_add_${key[0]}`,
                                text: 87,
                            })
                        )
                        .append(
                            $("<button>", {
                                class: "button_abil_add",
                                text: "➕",
                                onclick: `doAddResp(\"${key[0]}\", 1)`,
                            })
                        )
                )
                .append(
                    $("<td>", {
                        style: "text-align: right; margin-right: 20px;",
                        class: `resp_abil_${key[0]}`,
                        text: 48763,
                    })
                )
        );
    }
    let skl = $("#resp_skills");
    for(let i=0;i<5;i++){
        skl.append(
            $("<tr>", {
                style: "height: 30px;"
            }).append(
                $("<td>", {
                    class: `resp_skill${i}`,
                })
            )
        )
    }
}

async function buildCharList() {
    let chars = await core.send("game-get-allChars");
    let list = $("#resp_chars_list");
    list.empty();
    for (let it of chars) {
        let charid = it[0];
        let char = it[1];
        list.append(
            $("<div>", {
                class: "candidate_char",
                id: `candidate_char_${charid}`,
                onclick: `refreshRespCandidate(\"${charid}\")`,
            })
                .append(
                    $("<img>", {
                        src: `../assets/avatars/${char.avatar}`,
                        class: "Avatars",
                    })
                )
                .append(
                    $("<p>", {
                        class: "centered",
                        text: char.name,
                    })
                )
        );
    }
    let default_name = chars[0][0];
    refreshRespCandidate(default_name);
}

function buildResp() {
    buildRespAbils();
    buildCharList();
    resetRespAbil();
    refreshRespAbil();
}
