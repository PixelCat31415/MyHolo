//nightshade was here :D
"use strict";

let core = {
    send: function(){},
    handle: function(){}
};

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

function init() {
    core.handle("pong", async (event, data) => {
        console.log(`main process said: ${data}`);
    });
    core.handle("log", function (event, data) {
        console.log(data);
    });
}

$(async function () {
    initDev();
    init();
    await core.send("ready");
    
    const settings = {
        margins: true,
        enableFocus: true,
        setOnClick: true,
        initActiveQuery: ".ActiveLavalamp",
    };
    const navbar = new Lavalamp($("#navList")[0], settings);

    let active_page = "my";
    let active = $(`#nav_${active_page}`)[0];
    navbar.activeElement = active;
    navbar.reposition(active);
    $(`#pg_${active_page}`).show();

    let names = ["home", "my", "lvl", "resp", "adv", "rec", "dev"];
    for (let name of names) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            $(".Page").hide();
            $(`#pg_${name}`).show();
        });
    }
});
