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
let page_ids = ["home", "my", "lvl", "resp", "adv", "rec", "dev"];

let navbar;

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

    for (let name of page_ids) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            redirectPage(name);
        });
    }
}

function loadPages(){
    return Promise.all([
        $("#pg_home_container").load("html/home.html"),
        $("#pg_my_container").load("html/myholo.html", buildMy),
        $("#pg_lvl_container").load("html/level.html", buildLevel),
        $("#pg_rec_container").load("html/record.html", async () => {
            buildRecordArea();
            buildRecList();
        }),
        $("#pg_resp_container").load("html/respawn.html", buildResp),
    ]);
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

    build_navlist();
    $(".debug").hide();
    setTimeout(() => {
        redirectPage("home");
    }, 1000);
    // onDebugMode();

    // load pages
    await loadPages();

    core.send("ready");
    doResetAll();
});
