const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
    ipc: {
        on: function (channel, callback) {
            ipcRenderer.on(channel, callback);
        },
        send: function (channel, ...args) {
            ipcRenderer.send(channel, ...args);
        },
    },
    fs: {
        readFile: function (path, opt, callback) {
            //return fs.readFileSync(path, { encoding: enc });
            fs.readFile(path, opt, callback);
        },
        readFileSync: function (path, opt) {
            return fs.readFileSync(path, opt);
        },
        writeFile: function (path, data, opt) {
            fs.writeFile(path, data, opt);
        },
        writeFileSync: function (path, data, opt) {
            fs.writeFileSync(path, data, opt);
        },
    },
});
