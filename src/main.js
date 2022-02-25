const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

const fio = require("./core/File");
const Points = require("./core/Points");
require("./core/Player");

let win;

const createWindow = function () {
    win = new BrowserWindow({
        title: "MyHolo v1.0",
        width: 1400,
        height: 800,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "index.html"));
    
    win.openDevTools();
};

app.on("ready", createWindow);

// make maxOS happy
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});
app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

ipcMain.handle("ping", async function(event, data){
    console.log(`Renderer process said: ${data}`);
    win.webContents.send("pong", "message from main process");
})
