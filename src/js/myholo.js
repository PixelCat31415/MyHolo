function doIdle(arg) {
    $(".my_name").text(`action ${arg}`);
}

function doAddAbil(arg){
    $(`.my_abil_${arg}`).text(Math.floor(Math.random()*100))
}

function toggleDelta(){
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
                        class: "button_abil_add",
                        onclick: `doAddAbil(\"${key[0]}")`,
                        hidden: false,
                    })
                )
            )
            .append(
                $("<td>", {
                    style: "width: auto; color: green",
                    class: `my_abil_${key[0]}_delta my_abil_delta`,
                    text: "+87",
                    hidden: false,
                })
            )
            .append(
                $("<td>", {
                    class: `my_abil_${key[0]}`,
                    text: 77749,
                })
            );
        table.append(tr);
    }
}

$(async () => {
    await $("#pg_my_container").load("html/myholo.html", buildMy);
});
