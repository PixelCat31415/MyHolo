let player;

async function doIdle(arg) {
    // $(".my_name").text(`action ${arg}`);
    await core.send("game-do-idle", arg);
    refreshPlayer();
    initTimer();
}

async function doAddAbil(arg) {
    // $(`.my_abil_${arg}`).text(Math.floor(Math.random()*100))
    let res = await core.send("game-do-addAbil", arg);
    console.log(`addAbil replied: ${res}`);
    refreshPlayer();
}

let timer_id=-1;
async function updateTimer() {
    let rem = Math.ceil((player.next_action - Date.now())/1000);
    if (!rem || rem <= 0) {
        $(".my_stream_cd").hide();
        window.clearInterval(timer_id);
    } else {
        $(".my_stream_cd_value").text(rem);
        $(".my_stream_cd").show();
    }
}
async function initTimer() {
    timer_id = window.setInterval(updateTimer, 999);
}

function toggleDelta() {
    $(".my_abil_delta").toggle();
    $(".button_abil_add").toggle();
}

function buildMy() {
    let table = $("#my_abilities");
    for (let key of abil_entries) {
        let tr = $("<tr>");
        tr.append(
            $("<td>", {
                text: `${key[1]}`,
            })
        )
            .append(
                $("<td>", {
                    text: "lv.",
                })
                    .append(
                        $("<span>", {
                            class: `my_lvl_${key[0]}`,
                            text: 69,
                        })
                    )
                    .append(
                        $("<button>", {
                            text: " ➕ ",
                            class: `button_abil_add_${key[0]} button_abil_add`,
                            onclick: `doAddAbil(\"${key[0]}")`,
                            hidden: false,
                        })
                    )
            )
            .append(
                $("<td>", {
                    style: "text-align: right;",
                })
                .append(
                    $("<span>", {
                        style: "text-align: center;",
                        class: `my_abil_${key[0]}`,
                        text: 77749,
                    })
                )
                .append(
                    $("<span>", {
                        style: "width: auto; color: green; margin-left: 10px;",
                        class: `my_abil_${key[0]}_delta my_abil_delta`,
                        text: "(+87)",
                        hidden: false,
                    })
                )
            );
        table.append(tr);
    }
    refreshPlayer();
}

async function refreshPlayer() {
    player = await core.send("game-get-player");
    // console.log(player);

    $(".my_avatar").attr("src", `../assets/avatars/${player.avatar}`);
    $(".my_name").text(player.name);
    $(".my_level").text(player.level);
    $(".my_char").text(player.char_name);

    let $status = $(".my_status");
    if (player.status === "alive") {
        $status.text("Alive");
        $status.css("color", "green");
    } else if (player.status === "dead") {
        $status.text("Dead");
        $status.css("color", "red");
    } else {
        $status.text("Error");
        $status.css("color", "yellow");
    }

    let exp_all = player.exp_next - player.exp_prev;
    let exp_get = player.exp - player.exp_prev;
    let ratio = Math.floor((100 * exp_get) / exp_all);
    $(".my_level_progress").css("width", `${ratio}%`);
    $(".my_exp").text(Math.round(exp_get));
    $(".my_exp_next").text(Math.round(exp_all));
    $(".my_exp_ratio").text(Math.round(ratio));

    for (let key of abil_entries) {
        $(`.my_lvl_${key[0]}`).text(Math.round(player.abil_lvl[key[0]]));
        $(`.my_abil_${key[0]}`).text(Math.round(player.max_abil[key[0]]));
        if (player.abil_info[key[0]].can_add) {
            $(`.button_abil_add_${key[0]}`).css("visibility", "visible");
            $(`.my_abil_${key[0]}_delta`).text(
                `(+${Math.round(player.abil_info[key[0]].delta)})`
            );
        } else {
            $(`.button_abil_add_${key[0]}`).css("visibility", "hidden");
            $(`.my_abil_${key[0]}_delta`).text("(MAX)");
        }
    }

    $(".my_credit").text(player.abil_credit);
}

/*
return {
    name: this.name,
    char_name: this.char_name,
    avatar: this.avatar,
    level: this.level,
    max_abil: this.max_abil.dump(),
    status: this.status,
    exp: this.exp,
    exp_prev: Experience.getPrevLevel(this.exp),
    exp_next: Experience.getNextLevel(this.exp),
    abil_lvl: this.abil_lvl.dump(),
    abil_credit: this.abil_credit,
    resp_credit: this.resp_credit,
    next_action: this.next_action,
};
*/

$(async () => {
    await $("#pg_my_container").load("html/myholo.html", buildMy);
});
