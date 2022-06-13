let boss;

async function doMatch(){
    // $("#boss_match_options").hide();
    // $("#boss_match_result_box").show();

    let match = await core.send("game-do-match");
    let head = $("#boss_match_result_heading");
    let rec = $("#boss_match_result_list");
    let sum = $("#boss_match_result_summary");

    console.log(match);

    head.empty();
    if(match.title){
        head.append(
            $("<li>", {
                style: "font-weight: bold;",
                text: match.title,
            })
        )
    }
    for(let ln of match.heading) {
        head.append(
            $("<li>", {
                text: ln,
            })
        )
    }

    rec.empty();
    for(let ln of match.record) {
        rec.append(
            $("<li>", {
                text: ln,
            })
        )
    }

    sum.empty();
    for(let ln of match.summary) {
        sum.append(
            $("<li>", {
                text: ln,
            })
        )
    }
}

function buildLevel(){
    let box = $("#boss_match_info");
    
        box.append(
            $("<tr>").append(
                $("<th>", {
                    class: "my_char",
                    text: "Nacho Neko",
                })
            ).append(
                $("<th>", {
                    class: "colored",
                    text: "角色",
                })
            ).append(
                $("<th>", {
                    class: "boss_char",
                    text: "Nacho Neko",
                })
            )
        );

    box.append(
        $("<tr>").append(
            $("<th>", {
                class: "my_level",
                text: 49,
            })
        ).append(
            $("<th>", {
                class: "colored",
                text: "等級",
            })
        ).append(
            $("<th>", {
                class: "boss_level",
                text: 69,
            })
        )
    );

    for(let key of abil_entries){
        box.append(
            $("<tr>").append(
                $("<td>", {
                    class: `my_abil_${key[0]}`,
                    text: 87,
                })
            ).append(
                $("<td>", {
                    class: "colored",
                    text: key[1],
                })
            ).append(
                $("<td>", {
                    class: `boss_abil_${key[0]}`,
                    text: 666,
                })
            )
        );
    }

    refreshBoss();
}

async function refreshBoss(){
    boss = await core.send("game-get-boss");
    console.log(boss);
    $(".boss_avatar").attr("src", `../assets/avatars/${boss.avatar}`);
    $(".boss_name").text(boss.name);
    $(".boss_char").text(boss.char_name);
    $(".boss_level").text(boss.level);
    for(let key of abil_entries) {
        $(`.boss_abil_${key[0]}`).text(boss.max_abil[key[0]]);
    }
}

$(async ()=>{
    await $("#pg_lvl_container").load("html/level.html", buildLevel);
});