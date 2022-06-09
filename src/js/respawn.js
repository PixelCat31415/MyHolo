// nacho neko's are for temporary demo OAO
function getChars(){
    return [
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        },
        {
            avator: "https://bit.ly/3aPVuST",
            name: "Nacho Neko",
        }
    ];
}

function selectChar(index){
    $(".resp_level").text(index);
}

function doAddResp(key, delta){
    // console.log(key, delta);
    $(`.resp_abil_add_${key}`).text(delta);
}

function buildRespAbils(){
    let table = $("#resp_abilities");
    for(let key of abil_entries){
        table.append(
            $("<tr>").append(
                $("<td>", {
                    text: key[1],
                })
            ).append(
                $("<td>").append(
                    $("<button>", {
                        class: "button_abil_add",
                        text: "➖",
                        onclick: `doAddResp(\"${key[0]}\", -1)`
                    })
                ).append(
                    $("<span>", {
                        class: `resp_abil_add_${key[0]}`,
                        text: 87,
                    })
                ).append(
                    $("<button>", {
                        class: "button_abil_add",
                        text: "➕",
                        onclick: `doAddResp(\"${key[0]}\", 1)`
                    })
                )
            ).append(
                $("<td>", {
                    class: `resp_abil_${key[0]}`,
                    text: 48763,
                })
            )
        )
    }
}

function buildCharList(){
    let chars = getChars();
    let list = $("#resp_chars_list");
    for(let i=0; i<chars.length; i++){
        let char = chars[i];
        list.append(
            $("<div>", {
                class: "candidate_char",
                onclick: `selectChar(${i})`,
            }).append(
                $("<img>", {
                    src: char.avator,
                    class: "Avators"
                })
            ).append(
                $("<p>", {
                    class: "centered",
                    text: char.name,
                })
            )
        )
    }
}

function buildResp(){
    buildRespAbils();
    buildCharList();
}

$(async function(){
    $("#pg_resp_container").load("html/respawn.html", buildResp);
})