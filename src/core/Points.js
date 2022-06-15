/*
 handle processing of ability points
 should contain:
  - constructing from scratch
  - constructing from file
  - addition / substraction
*/

const fio = require("./File");

class Points {
    static get entries() {
        return ["hp", "atk", "def", "agi", "str", "skl", "luk"];
    }
    constructor(obj) {
        if (typeof obj !== "object") {
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
    static from_file(path) {
        obj = fio.readObj(path);
        return new Points(obj);
    }
    add(o) {
        let res = new Points(o);
        for (let key of Points.entries) {
            res[key] += this[key];
        }
        return res;
    }
    sub(o) {
        let res = new Points(this);
        for (let key of Points.entries) {
            res[key] -= o[key];
        }
        return res;
    }
    divide(x) {
        let res = new Points(this);
        for (let key of Points.entries) {
            res[key] /= x;
        }
        return res;
    }
    addAll(x) {
        let res = new Points(this);
        for (let key of Points.entries) {
            res[key] += x;
        }
        return res;
    }
    fill(value) {
        let res = new Points();
        for (let key of Points.entries) {
            res[key] = value;
        }
        return res;
    }
    map(lambda) {
        let res = new Points(this);
        for (let key in res) {
            if (lambda.hasOwnProperty(key)) {
                res[key] = lambda[key](res[key]);
            }
        }
        return res;
    }
    chmin(x) {
        let res = new Points(this);
        for (let key in res) {
            res[key] = Math.min(res[key], x);
        }
        return res;
    }
    dump() {
        return JSON.parse(JSON.stringify(this));
    }
}

module.exports = Points;
