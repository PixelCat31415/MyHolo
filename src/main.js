const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

const createWindow = function () {
    const win = new BrowserWindow({
        title: "MyHolo v1.0",
        width: 800,
        height: 600,
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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

ipcMain.on("activate", function (event, arg) {
    console.log(`activated ${arg} section`);
    event.reply("received", "good");
});
