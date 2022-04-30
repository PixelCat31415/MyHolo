// simple file IO
// path uses 'myholo/' as root

const fs = require("fs");

let dataPaths = [
    "./data/",
    "./data/players/",
    "./data/match/",
    "./data/characters/",
    "./data/users/",
];

class FileIO {
    static checkExist(path) {
        return fs.existsSync(path);
    }
    static mkdir(path) {
        fs.mkdirSync(path, {recursive: true});
    }
    static readText(path) {
        if(!this.checkExist(path)) throw `reading not existing file ${path}`;
        return fs.readFileSync(path, { encoding: "utf-8" });
    }
    static readObj(path) {
        return JSON.parse(this.readText(path));
    }
    static readObj2(path, target){
        obj = readObj(path);
        mergeObj(target, obj);
    }
    static mergeObjOver(target, src){
        for(let k in src){
            target[k] = src[k];
        }
    }
    static mergeObjAdd(target, src){
        for(let k in src){
            if(!target.hasOwnProperty(k)){
                target[k] = src[k];
            }
        }
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
