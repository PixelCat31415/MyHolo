"use strict";

let secInfo = fm.readJSON("src/section/sections.json");

function hideAllSection() {
    for (let sec of secInfo.entries) {
        $(`#s_${sec.name}`).hide();
    }
}

$(function () {
    api.ipc.on("received", function (event, arg) {
        console.log(arg);
    });

    for (let sec of secInfo.entries) {
        let $sec = $("<div/>", {
            id: `s_${sec.name}`,
            hidden: true,
        });
        $sec.append(fm.readHTML(`src/section/${sec.name}.html`));
        $("#sections").append($sec);

        $(`#b_${sec.name}`).on("click", function () {
            console.log("activated section " + sec.name);
            hideAllSection();
            $("#s_" + sec.name).show();
            api.ipc.send("activate", sec.name);
        });
    }
});
