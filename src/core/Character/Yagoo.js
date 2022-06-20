const Character0 = require("./Character0");

class Yagoo extends Character0 {
    constructor(){
        super({
            name: "Yagoo",
            avatar: "yagoo.jpg",
            full_picture: "yagoo_full.jpg",
            motto: " ",
            skills: ["YMD(Yagoo makes damage)","底層員工的逆襲","紳士一擊","憂鬱場域","送進ICU"],
            char_name: "Yagoo",
            level: 0,
            max_abil: {},
            abil: {},
            hidden: false,
        });
    }
}

module.exports = Yagoo;
