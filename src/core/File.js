// simple file IO
// path uses 'myholo/' as root

const fs = require("fs");

let root_path = `${__dirname}/../..`;
let dataPaths = [
    `${root_path}/data/`,
    `${root_path}/data/record/`,
    `${root_path}/data/game/`
];

class FileIO {
    static checkExist(path) {
        return fs.existsSync(path);
    }
    static mkdir(path) {
        fs.mkdirSync(path, {recursive: true});
    }
    static readText(path) {
        if(!this.checkExist(path)) throw `reading non-existing file ${path}`;
        return fs.readFileSync(path, { encoding: "utf-8" });
    }
    static readObj(path) {
        return JSON.parse(this.readText(path));
    }
    static writeText(path, data) {
        fs.writeFileSync(path, data, { encoding: "utf-8" });
    }
    static writeObj(path, obj) {
        this.writeText(path, JSON.stringify(obj));
    }
    static getAllFiles(path) {
        return fs.readdirSync(path);
    }
    static init() {
        for (let path of dataPaths) {
            if (!this.checkExist(path)) {
                this.mkdir(path);
            }
        }
    }
}

FileIO.init();

module.exports = FileIO;
