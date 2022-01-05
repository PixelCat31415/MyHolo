"use strict";

let sectionName = ["home", "my", "level", "respawn", "advance", "record"];
const fs = window.api.getFS();

function hideAllSection() {
    sectionName.forEach(function (nam) {
        $(`#s_${nam}`).hide();
    });
}

$(function () {
    sectionName.forEach(function (nam) {
        fs.readFile(`src/section/${nam}.html`, "utf-8", function (err, data) {
            console.log(`read data ${data} with err ${err}`);
            let $sec = $("<div/>", {
                id: `s_${nam}`,
                hidden: true,
            });
            $sec.append($(data));
            $("#sections").append($sec);
        });

        $(`#b_${nam}`).on("click", function () {
            console.log("activated section " + nam);
            hideAllSection();
            $("#s_" + nam).show();
        });
    });
});
