const { ipcMain } = require("electron");

ipcMain.on("require", function (event, path) {
    event.returnValue = fio.readText(path);
});

ipcMain.on("save", function (event, path, data) {
    fio.writeText(path, data);
});

console.log("loaded module COMMUNICATION");
