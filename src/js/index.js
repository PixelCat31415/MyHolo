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

let navbar;

function init_ipc() {
    core.handle("pong", async (event, data) => {
        console.log(`main process said: ${data}`);
    });
    core.handle("log", function (event, data) {
        console.log(data);
    });
}

function redirectPage(page) {
    let active = $(`#nav_${page}`)[0];
    navbar.activeElement = active;
    navbar.reposition(active);
    $(".Page").hide();
    $(`#pg_${page}`).show();
}

function build_navlist() {
    const settings = {
        margins: true,
        enableFocus: true,
        setOnClick: true,
        initActiveQuery: ".ActiveLavalamp",
    };
    navbar = new Lavalamp($("#navList")[0], settings);

    let page_names = ["home", "my", "lvl", "resp", "adv", "rec", "dev"];
    for (let name of page_names) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            redirectPage(name);
        });
    }
}

let debug_count = 0;
let debug_on = false;
function tryDebugMode() {
    debug_count++;
    if (debug_count === 5) {
        onDebugMode();
    }
}
function onDebugMode() {
    if (debug_on) return;
    debug_on = true;
    $(".debug").show();
    core.send("debug");
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
    $(".debug").hide();
    setTimeout(() => {
        redirectPage("my");
    }, 1000);
    // onDebugMode();
    await core.send("ready");
});
