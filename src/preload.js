const { contextBridge, ipcRenderer } = require("electron");
const fs = require("fs");

contextBridge.exposeInMainWorld("api", {
    getFS: function () {
        return fs;
    },
});
