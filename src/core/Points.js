// handle processing of ability points
// should contain:
//  - constructing from scratch
//  - constructing from file
//  - addition / substraction

const fio=require("./File")

class Points {
    static get entries() {
        return ["血量", "攻擊", "防禦", "敏捷", "體力", "技巧", "幸運"];
    }
    constructor(obj) {
        if (typeof obj != "object") {
            obj = {};
        }
        for (let key of Points.entries) {
            if (obj.hasOwnProperty(key)) {
                this[key] = obj[key];
            } else {
                this[key] = 0;
            }
        }
    }
    static from_file(path){
        obj=fio.readObj(path);
        return new Points(obj);
    }
    add(o) {
        let res = new Points(o);
        for (let key of Points.entries) {
            res.key += this.key;
        }
        return res;
    }
}

console.log("loaded module POINTS");

module.exports = Points;
