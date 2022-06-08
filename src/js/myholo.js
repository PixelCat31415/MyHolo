function doIdle(arg) {
    $(".my_name").text(`action ${arg}`);
}

function build_my() {
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
                    $("<span>", {
                        text: " ➕ ",
                        class: "button_abil_add",
                        hidden: false,
                    })
                )
            )
            .append(
                $("<td>", {
                    style: "width: auto; color: green",
                    id: `my_abil_${key[0]}_delta`,
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
    await $("#pg_my_container").load("html/myholo.html", build_my);
    // console.log(document.getElementById("my_abilities"));
    // build_my();
});

// tr.append($("<td>", {text: "owo",})).append($("<td>", {class: `my_owo`,text: 77749,}))
