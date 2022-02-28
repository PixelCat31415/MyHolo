"use strict";

async function ping() {
    let msg = await core.send("ping", "PING from renderer process");
    console.log(msg);
}

function init() {
    core.handle("pong", async (event, data) => {
        console.log(`main process said: ${data}`);
    });
    core.handle("log", function (event, data) {
        console.log(data);
    });
}

$(function () {
    const settings = {
        margins: true,
        enableFocus: true,
        setOnClick: true,
        initActiveQuery: ".ActiveLavalamp",
    };
    const element = $("#navList")[0];
    const navbar = new Lavalamp(element, settings);
    let active = $("#nav_home")[0];
    navbar.activeElement = active;
    navbar.reposition(active);

    let names = ["home", "my", "lvl", "resp", "adv", "rec"];
    for (let name of names) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            $(".Page").hide();
            $(`#pg_${name}`).show();
        });
    }
    $("#pg_home").show();

    init();
    core.send("ready");
});
