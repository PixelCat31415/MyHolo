function toggleDimmed() {
    $("body").toggleClass("dimmed");
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
                        pop.addClass("hidden");
                    },
                })
            ).append(
                $("<button>", {
                    text: "我叫你設！",
                    click: async () => {
                        pop.addClass("hidden");
                        await core.send("game-do-resetAll");
                        await loadPages();
                    },
                })
            )
        );

    pop.toggleClass("hidden");

    // await core.send("game-do-resetAll");
}
