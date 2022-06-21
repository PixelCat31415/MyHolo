async function showPopup(){
    $("#popup").removeClass("hidden");
    $("#popup_block").css("visibility", "visible");
}

async function hidePopup(){
    $("#popup").addClass("hidden");
    $("#popup_block").css("visibility", "hidden");
}

async function doResetAll() {
    let pop = $("#popup");
    pop.empty();

    pop.append(
        $("<h2>", {
            text: "重設所有遊戲進度？",
        })
    )
        .append(
            $("<p>", {
                text: "所有玩家等級、通關進度、對戰紀錄將會被重置",
            })
        )
        .append(
            $("<p>", {
                class: "motto",
                text: "「...騙人的吧？」 —桐ヶ谷和人，2012",
            })
        )
        .append(
            $("<div>").append(
                $("<button>", {
                    text: "先不要",
                    click: async () => {
                        hidePopup();
                    },
                })
            ).append(
                $("<button>", {
                    text: "我叫你設！",
                    click: async () => {
                        await hidePopup();
                        await core.send("game-do-resetAll");
                        await loadPages();
                    },
                })
            )
        );

    showPopup();
}

async function doSetName(){
    let pop = $("#popup");
    pop.empty();

    pop.append(
        $("<h2>", {
            text: "修改玩家暱稱",
        })
    )
        .append(
            $("<p>", {
                text: "和現實不一樣，在這裡你可以無限次改名，要改成鮭魚也可以喔",
            })
        )
        .append(
            $("<p>", {
                class: "motto",
                text: "「好想吃鮭魚壽司啊！」 —本遊戲的某個開發者，2022",
            })
        )
        .append(
            $("<p>", {
                text: `你現在的暱稱是：${game.getPlayer().name}`,
                style: "margin-bottom: 0;",
            })
        )
        .append(
            $("<input>", {
                id: "new_player_name",
                type: "text",
                style: "margin: 10px auto;",
                placeholder: "例：張鮭魚之夢",
            })
        )
        .append(
            $("<div>").append(
                $("<button>", {
                    text: "先不要",
                    click: async () => {
                        hidePopup();
                    },
                })
            ).append(
                $("<button>", {
                    text: "我叫你設！",
                    click: async () => {
                        await hidePopup();
                        await core.send("game-do-setPlayerName", $("#new_player_name").val());
                        await loadPages();
                    },
                })
            )
        );

    showPopup();
}
