const { app } = require("electron");
const Game = require("./core/Game");

let game;

function createGame() {
    game = new Game();
}

function endGame() {
    game.end();
    app.quit();
}

app.on("ready", createGame);
app.on("window-all-closed", endGame);
