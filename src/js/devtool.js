"use strict";

let defultVal = {
    name: "",
    hp: "",
    atk: "",
    def: "",
    agi: "",
    str: "",
    skl: "",
    luk: "",
    prepare: "self.pts = new Points(self.maxPts);",
    attack: "",
    isDefeated: "return self.pts.hp < 0;",
    finish: "",
};
function resetAll(id) {
    for (let key in defultVal) {
        $(`#${key}${id}`).val(defultVal[key]);
    }
}

function getFormData(id) {
    let form = new FormData($(id)[0]);
    let res = {};
    for (let key of form) {
        res[key[0]] = key[1];
    }
    return res;
}

async function testMatch() {
    let f1 = getFormData("#form1");
    let f2 = getFormData("#form2");
    let mat = await core.send("dev-match", f1, f2);
    console.log("match completed");
    console.log(mat);
}

function initDev() {
    resetAll(1);
    resetAll(2);

    core.handle("dev-message", async (event, data) => {
        console.log(`dev message from main process:`);
        console.log(data);
    });
}
