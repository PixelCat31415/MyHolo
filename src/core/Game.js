const { app, BrowserWindow, ipcMain } = require("electron");
const log4js = require("log4js");

let logger = log4js.getLogger("Game");
logger.level = "all";

logger.info("loading modules");
const File = require("./File");
const Player = require("./Player");
const Boss = require("./BossManager");
const Chars = require("./CharacterManager");
const Match = require("./Match");
const Dev = require("./DevTool");

const path_gamedata = "./data/game/game.json";

class Game {
    win;
    player;
    cur_level;
    cur_boss;

    constructor() {
        if (!File.checkExist(path_gamedata)) {
            logger.info("no game data found. creating a new game");
            this.player = new Player();
            this.cur_level = 0;
        } else {
            logger.info(`game data found at ${path_gamedata}`);
            let obj = File.readObj(path_gamedata);
            this.player = new Player(obj.player);
            this.cur_level = obj.cur_level;
        }
        this.updateBoss();
        this.cur_boss = Boss.getBossAtLevel(this.cur_level);

        this.createWindow();
        this.initipc();

        Dev.init(this.win);
    }

    createWindow() {
        logger.info("creating game window");
        this.win = new BrowserWindow({
            title: "MyHolo v1.0",
            show: false,
            webPreferences: {
                preload: `${__dirname}/../preload.js`,
            },
        });
        this.win.loadFile(`${__dirname}/../index.html`);
        this.win.maximize();
        // this.win.openDevTools();
    }

    initipc() {
        logger.info("establishing connection between frontend and backend");

        // get info
        ipcMain.handle("game-get-player", async () => {
            return this.player.dump();
        });
        ipcMain.handle("game-get-boss", async () => {
            if (this.cur_boss) return this.cur_boss.dump();
            return null;
        });
        ipcMain.handle("game-get-characters", async () => {});

        // do action
        ipcMain.handle("game-do-addAbil", async (event, type) => {
            return this.player.doAddAbil(type);
        });
        ipcMain.handle("game-do-idle", async (event, type) => {
            this.player.doIdle(type);
        });
        ipcMain.handle("game-do-match", async () => {
            let match = new Match(this.player, this.cur_boss);
            match.start();
            return match.dump();
        });
        ipcMain.handle("game-do-nextLevel", async () => {
            this.cur_level++;
            this.updateBoss();
        });

        // misc
        ipcMain.handle("ready", async () => {
            logger.info("game window ready");
        });
    }

    updateBoss() {
        if (this.cur_level <= Boss.getMaxLevel()) {
            this.cur_boss = Boss.getBossAtLevel(this.cur_level);
        } else {
            this.cur_boss = null;
        }
    }
}

module.exports = Game;
