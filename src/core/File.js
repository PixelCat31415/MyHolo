// simple file IO
// path uses 'myholo/' as root

const fs = require("fs");

let dataPaths = [
    "./data/",
    "./data/players/",
    "./data/match/",
];

class FileIO{
    static checkExist(path){
        return fs.existsSync(path);
    }
    static mkdir(path){
        fs.mkdirSync(path);
    }
    static readText(path) {
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
    static init(){
        for(path of dataPaths){
            if(!this.checkExist(path)){
                this.mkdir(path);
            }
        }
    }
};

module.exports = FileIO;