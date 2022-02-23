// simple file IO
// path uses 'myholo/' as root

const fs = require("fs");

fio = {
    checkExist: function (path){
        return fs.existsSync(path);
    },
    readText: function (path) {
        return fs.readFileSync(path, { encoding: "utf-8" });
    },
    readObj: function (path) {
        return JSON.parse(this.readText(path));
    },
    writeText: function (path, data) {
        fs.writeFileSync(path, data, { encoding: "utf-8" });
    },
    writeObj: function (path, obj) {
        this.writeText(path, JSON.stringify(obj));
    },
    getAllFiles: function (path) {
        return fs.readdirSync(path);
    },
};

console.log("loaded module FILE");

module.exports = fio;