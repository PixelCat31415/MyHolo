// file manager
// wraps file related stuff
fm = {
    readText: function (path) {
        return api.fs.readFileSync(path, { encoding: "utf-8" });
    },
    readJSON: function (path) {
        return JSON.parse(this.readText(path));
    },
    readHTML: function (path) {
        return $(this.readText(path));
    },
    saveText: function (path, data) {
        api.fs.writeFile(path, data, { encoding: "utf-8" });
    },
    saveJSON: function (path, obj) {
        this.saveText(path, JSON.stringify(obj));
    },
};
