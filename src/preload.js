const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("core", {
    send: function (channel, ...data) {
        return ipcRenderer.invoke(channel, ...data);
    },
    handle: function (channel, callable) {
        ipcRenderer.on(channel, callable);
    },
});
