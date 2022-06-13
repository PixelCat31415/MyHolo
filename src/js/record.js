function getRecList(){
    return [
        {
            time: "3:14:00",
            result: "win",
            self: {
                name: "Nacho Neko",
                char: "nachoneko",
                level: 69,
                abil: {
                    hp: 666,
                    atk: 666,
                    def: 666,
                    agi: 666,
                    str: 666,
                    skl: 666,
                    luk: 666,
                }
            },
            opp: {
                name: "Nacho Neko",
                char: "nachoneko",
                level: 69,
                abil: {
                    hp: 666,
                    atk: 666,
                    def: 666,
                    agi: 666,
                    str: 666,
                    skl: 666,
                    luk: 666,
                }
            },
            rec: [
                "owo",
                "owowo",
            ],
            summary: [
                "owowowo"
            ],
        }
    ];
}

/*
match hierachy
{
    time: str,
    title: str,
    result: "win" | "lose" | "tie" | "error",
    attacker: {
        name: str,
        avatar: str,
        char_name: str,
        level: int,
        max_abil: (same as abil),
        abil: {hp, atk, def, agi, str, skl, luk} int each
    },
    defender: (same as attacker),
    nround: int,
    record: str[],
    summary: str[]
},
*/
function showEntry(match){
    // TODO
}

let now_selected = -1;
function doSelectEntry(index){
    if(now_selected != -1){
        $(`#rec_row_${now_selected}`).removeClass("rec_row_active");
    }
    $(`#rec_row_${index}`).addClass("rec_row_active");
    now_selected = index;
}

function build_rec(){
    let recs = getRecList();
    let list = $("#rec_list");
    for(let i=0; i<recs.length; i++){
        let rec = recs[i];
        list.append(
            $("<tr>", {
                class: `rec_data rec_row_${rec.result}`,
                id: `rec_row_${i}`,
                onclick: `doSelectEntry(${i})`,
            }).append(
                $("<td>", {
                    class: "rec_list_time",
                    text: rec.time,
                })
            ).append(
                $("<td>", {
                    class: "rec_list_opp",
                    text: rec.opp.name,
                })
            )
        )
    }
    showEntry(getRecList[0]);
}

// function rec_owo(){
//     $(".rec_my_avatar").attr("src", "../assets/avatars/gawr_gura.jpg");
// }

$(()=>{
    $("#pg_rec_container").load("html/record.html", build_rec);
})