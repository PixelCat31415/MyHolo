function doMatch(){
    $("#boss_match_options").hide();
    $("#boss_match_result_box").show();
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
}

$(async ()=>{
    await $("#pg_lvl_container").load("html/level.html", buildLevel);
});