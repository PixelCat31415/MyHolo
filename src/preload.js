const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("core", {
    require: function (path) {
        return ipcRenderer.sendSync("require", path);
    },
    save: function (path, data) {
        ipcRenderer.sendSync("save", path, data);
    },
});
