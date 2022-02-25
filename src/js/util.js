// DEPRECATED.
// 'core' api should be sufficient

// file manager
// wraps file related stuff
fm = {
    readText: function (path) {
        return core.require(path);
    },
    readJSON: function (path) {
        return JSON.parse(this.readText(path));
    },
    readHTML: function (path) {
        return $(this.readText(path));
    },
    writeText: function (path, data) {
        core.save(path, data);
    },
    writeJSON: function (path, obj) {
        this.writeText(path, JSON.stringify(obj));
    },
    // remove: function (path) {
    //     api.fs.remove(path, {}, function (err) {
    //         if (err) console.log(`Error when removing file ${path}!\n${err}`);
    //     });
    // },
};
