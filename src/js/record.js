let rec_list;
let now_selected;

function showCharInfo(side, char) {
    $(`.rec_${side}_name`).text(char.name);
    $(`.rec_${side}_char`).text(char.char_name);
    $(`.rec_${side}_level`).text(char.level);
    $(`.rec_${side}_avatar`).attr("src", `../assets/avatars/${char.avatar}`);
    for (let key of abil_entries) {
        $(`.rec_${side}_${key[0]}`).text(Math.round(char.max_abil[key[0]]));
    }
}

async function showMatchRecord() {
    if(now_selected == 48763) {
        console.log("motto hayaku!");
        return;
    }

    $("#match_container").show();

    let mat = await core.send("game-get-matchRecord", now_selected);

    $(".rec_match_time").text(new Date(mat.time).toLocaleString("zh-TW"));
    let $res = $(".rec_match_result");
    if (mat.result === "lose") {
        $res.css("color", "red");
        $res.text("戰敗");
    } else if (mat.result === "tie") {
        $res.css("color", "blue");
        $res.text("平手");
    } else if (mat.result === "win") {
        $res.css("color", "green");
        $res.text("戰勝");
    } else {
        $res.css("color", "yellow");
        $res.text("錯誤");
    }

    showCharInfo("atk", mat.attacker);
    showCharInfo("def", mat.defender);

    showMatch("rec", mat);
}

function doSelectMatchRecord(index) {
    if (now_selected != -1) {
        $(`#rec_row_${now_selected}`).removeClass("rec_row_active");
    }
    $(`#rec_row_${index}`).addClass("rec_row_active");
    now_selected = index;
    showMatchRecord();
}

function getDateString(date){
    let year = `${date.getFullYear()}`.padStart(4,"0");
    let month = `${date.getMonth()}`.padStart(2,"0");
    let day = `${date.getDate()}`.padStart(2,"0");
    let hour = `${date.getHours()}`.padStart(2,"0");
    let min = `${date.getMinutes()}`.padStart(2,"0");
    return `${year}/${month}/${day}-${hour}:${min}`;
    // return date.toLocaleString("zh-TW");
}

async function buildRecList() {
    $(".rec_match_entry").remove();
    rec_list = await core.send("game-get-matchList");
    let list = $("#rec_list");
    for(let id of rec_list){
        let rec = await core.send("game-get-matchRecord", id);
        list.append(
            $("<tr>", {
                class: `rec_data rec_row_${rec.result} rec_match_entry`,
                id: `rec_row_${id}`,
                onclick: `doSelectMatchRecord(${id})`,
            })
                .append(
                    $("<td>", {
                        class: "rec_list_time",
                        text: getDateString(new Date(rec.time)),
                    })
                )
                .append(
                    $("<td>", {
                        class: "rec_list_opp",
                        text: rec.defender.name,
                    })
                )
        );
    }
    doSelectMatchRecord(48763);
}

async function buildRecordArea() {
    let info = $("#rec_match_info");
    for (let key of abil_entries) {
        info.append(
            $("<tr>")
                .append(
                    $("<td>", {
                        class: `rec_atk_${key[0]}`,
                    })
                )
                .append(
                    $("<td>", {
                        class: `colored`,
                        text: key[1],
                    })
                )
                .append(
                    $("<td>", {
                        class: `rec_def_${key[0]}`,
                    })
                )
        );
    }
}
