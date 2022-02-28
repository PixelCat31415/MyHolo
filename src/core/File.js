// simple file IO
// path uses 'myholo/' as root

const fs = require("fs");

class FileIO{
    static checkExist(path){
        return fs.existsSync(path);
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
};

module.exports = FileIO;