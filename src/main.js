const { app, BrowserWindow } = require("electron");
const Game = require("./core/Game");

let game;

function createWindow() {
    game = new Game();
}

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
