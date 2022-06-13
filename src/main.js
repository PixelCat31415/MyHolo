const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const Player = require("./core/Player");
const Game = require("./core/Game");

let win;

const createWindow = function () {
    win = new BrowserWindow({
        title: "MyHolo v1.0",
        show: false,
        webPreferences: {
            // nodeIntegration: true,
            // contextIsolation: false,
            preload: path.join(__dirname, "preload.js"),
        },
    });

    win.loadFile(path.join(__dirname, "index.html"));

    // win.openDevTools();
    // win.maximize();
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

ipcMain.handle("ping", async function (event, data) {
    console.log(`Renderer process said: ${data}`);
    return "PONG from main process";
});

ipcMain.handle("match", async function(event){
    return {"1": "qaq"};
    // let p1 = new Player({ name: "NightShade", charid: 1, });
    // let p2 = new Player({ name: "PixelCat" });
    // let mat = new Match(p1, p2, "testing battle");
    // mat.start();
    // mat.save();
    // return mat;
});

const dev = require("./core/DevTool");

ipcMain.handle("ready", async function (event) {
    console.log("App ready!");
    dev.init(win);
    await win.maximize();
});

console.log("started!");
