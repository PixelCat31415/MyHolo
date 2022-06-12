// nightshade was here :D
"use strict";

let abil_entries = [
    ["hp", "生命值"],
    ["atk", "攻擊力"],
    ["def", "防禦力"],
    ["agi", "敏捷度"],
    ["str", "體力值"],
    ["skl", "技巧值"],
    ["luk", "幸運值"],
];

async function ping() {
    let msg = await core.send("ping", "PING from renderer process");
    console.log(`Main process replied: ${msg}`);
}

async function match() {
    let mat = await core.send("match");
    mat.time = new Date(mat.time).toLocaleString("zh-TW");
    console.log(mat);
}

function owo() {
    console.log("owo!\n");
}

function getTime() {
    console.log(new Date(Date.now()).toLocaleString("zh-TW"));
}

function init_ipc() {
    core.handle("pong", async (event, data) => {
        console.log(`main process said: ${data}`);
    });
    core.handle("log", function (event, data) {
        console.log(data);
    });
}

function build_navlist() {
    const settings = {
        margins: true,
        enableFocus: true,
        setOnClick: true,
        initActiveQuery: ".ActiveLavalamp",
    };
    const navbar = new Lavalamp($("#navList")[0], settings);

    let active_page = "dev";
    let active = $(`#nav_${active_page}`)[0];
    navbar.activeElement = active;
    navbar.reposition(active);
    $(`#pg_${active_page}`).show();

    let page_names = ["home", "my", "lvl", "resp", "adv", "rec", "dev"];
    for (let name of page_names) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            $(".Page").hide();
            $(`#pg_${name}`).show();
        });
    }
}

$(async function () {
    // check if app is not started by electron
    // (frontend-only mode)
    if (typeof core === "undefined") {
        window.core = {
            send: function () {},
            handle: function () {},
        };
    }

    init_ipc();
    build_navlist();
    await core.send("ready");
});
