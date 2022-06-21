function showMatch(container, match) {
    let head = $(`#${container}_match_result_heading`);
    let rec = $(`#${container}_match_result_list`);
    let sum = $(`#${container}_match_result_summary`);

    head.empty();
    if (match.title) {
        head.append(
            $("<li>", {
                style: "font-weight: bold;",
                text: match.title,
            })
        );
    }
    for (let ln of match.heading) {
        head.append(
            $("<li>", {
                text: ln,
            })
        );
    }

    rec.empty();
    for (let ln of match.record) {
        rec.append(
            $("<li>", {
                text: ln,
            })
        );
    }

    sum.empty();
    for (let ln of match.summary) {
        sum.append(
            $("<li>", {
                text: ln,
            })
        );
    }
}

async function doMatch() {
    $("#boss_match_result_box").show();
    let match = await core.send("game-do-match");
    if (!match) return;
    showMatch("boss", match);
    if (match.result === "win") {
        await core.send("game-do-nextLevel");
        $("#boss_next_level").show();
        $("#boss_match_options").hide();
    }
    refreshPlayer();
    buildRecList();
}

async function nextLevel() {
    $("#boss_next_level").hide();
    refreshBoss();
    resetRespAbil();
    $("#boss_match_options").show();
    $("#boss_match_result_box").hide();
}

async function resetLevel() {
    await core.send("game-do-resetLevel");
    $("#boss_cleared").hide();
    $("#boss_next_level").hide();
    refreshBoss();
    resetRespAbil();
    $("#boss_match_options").show();
    $("#boss_match_result_box").hide();
}

function buildLevel() {
    let box = $("#boss_match_info");

    box.append(
        $("<tr>")
            .append(
                $("<th>", {
                    class: "my_char",
                    text: "Nacho Neko",
                })
            )
            .append(
                $("<th>", {
                    class: "colored",
                    text: "角色",
                })
            )
            .append(
                $("<th>", {
                    class: "boss_char",
                    text: "Nacho Neko",
                })
            )
    );

    box.append(
        $("<tr>")
            .append(
                $("<th>", {
                    class: "my_level",
                    text: 49,
                })
            )
            .append(
                $("<th>", {
                    class: "colored",
                    text: "等級",
                })
            )
            .append(
                $("<th>", {
                    class: "boss_level",
                    text: 69,
                })
            )
    );

    for (let key of abil_entries) {
        box.append(
            $("<tr>")
                .append(
                    $("<td>", {
                        class: `my_abil_${key[0]}`,
                        text: 87,
                    })
                )
                .append(
                    $("<td>", {
                        class: "colored",
                        text: key[1],
                    })
                )
                .append(
                    $("<td>", {
                        class: `boss_abil_${key[0]}`,
                        text: 666,
                    })
                )
        );
    }
    refreshBoss();
}

async function refreshBoss() {
    let boss = await game.getBoss();
    if (!boss) {
        $("#boss_match").hide();
        $("#boss_cleared").show();
    } else {
        $("#boss_match").show();
        $(".boss_avatar").attr("src", `../assets/avatars/${boss.avatar}`);
        $(".boss_name").text(boss.name);
        $(".boss_char").text(boss.char_name);
        $(".boss_level").text(boss.level);
        for (let key of abil_entries) {
            $(`.boss_abil_${key[0]}`).text(Math.round(boss.max_abil[key[0]]));
        }
    }
    $(".cur_level").text((await core.send("game-get-curLevel")) + 1);
}
