"use strict";

$(function () {
    // api.ipc.on("received", function (event, arg) {
    //     console.log(arg);
    // });
    const settings = {
        margins: true,
        enableFocus: true,
        setOnClick: true,
    };
    const element = $("#navList")[0];
    const navbar = new Lavalamp(element, settings);
    // const navbar = new Lavalamp(element);
    let active = $("#nav_home")[0];
    navbar.activeElement = active;
    navbar.reposition(active);

    let names = ["home", "my", "lvl", "resp", "adv", "rec"];
    for (let name of names) {
        let entry = $(`#nav_${name}`);
        entry.on("click", function () {
            $(".page").hide();
            $(`#pg_${name}`).show();
        });
    }
    $("#pg_home").show();
});
