const { BrowserWindow, ipcMain } = require("electron");
const log4js = require("log4js");

let logger = log4js.getLogger("Game");
logger.level = "all";

logger.info("loading modules");
const File = require("./File");
const Points = require("./Points");
const Player = require("./Player");
const Chars = require("./CharacterManager");
const Match = require("./Match");
const Record = require("./Record");
let Dev;

const gamedata_path = "./data/game/game.json";

class Game {
    win;
    player;
    cur_level;
    cur_boss;
    in_debug;

    constructor() {
        if (!File.checkExist(gamedata_path)) {
            logger.info("no game data found. creating a new game");
            this.player = new Player();
            this.cur_level = 0;
        } else {
            logger.info(`game data found at ${gamedata_path}`);
            let obj = File.readObj(gamedata_path);
            this.player = new Player(obj.player);
            this.cur_level = obj.cur_level;
        }
        this.updateBoss();

        this.createWindow();
        this.initipc();
        this.in_debug = false;
    }

    createWindow() {
        logger.info("creating game window");
        this.win = new BrowserWindow({
            title: "MyHolo v1.0",
            icon: `${__dirname}/../../assets/facicon.ico`,
            show: false,
            webPreferences: {
                preload: `${__dirname}/../preload.js`,
            },
        });
        this.win.loadFile(`${__dirname}/../index.html`);
        this.win.maximize();
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
        ipcMain.handle("game-get-allChars", async () => {
            return Chars.getAllChars();
        });
        ipcMain.handle(
            "game-get-respAbil",
            async (event, char_name, abil_lvl) => {
                abil_lvl = new Points(abil_lvl).add(new Points().fill(10)).divide(10);
                return Chars.getChar(char_name).getAbil(abil_lvl);
            }
        );
        ipcMain.handle("game-get-char", async (event, charid)=>{
            return Chars.getChar(charid);
        });
        ipcMain.handle("game-get-matchList", async ()=>{
            return Record.fetchMatchList();
        });
        ipcMain.handle("game-get-matchRecord", async (event, id) => {
            return Record.fetchMatch(id);
        });

        // do action
        ipcMain.handle("game-do-addAbil", async (event, type) => {
            if(this.player.status !== "alive") return;
            this.player.doAddAbil(type);
        });
        ipcMain.handle("game-do-idle", async (event, type, time) => {
            if(this.player.status !== "alive") return;
            if(!this.in_debug && this.player.next_action > time) return;
            this.player.doIdle(type, time);
        });
        ipcMain.handle("game-do-match", async () => {
            return this.doMatch();
        });
        ipcMain.handle("game-do-nextLevel", async () => {
            this.updateBoss(this.cur_level+1);
            this.player.resp_credit += 7;
        });
        ipcMain.handle("game-do-respawn", async (event, resp_char, resp_credit, resp_abil)=>{
            logger.log(`respawning: char = ${resp_char}, credit remaining: ${resp_credit}, resp_abil: ${JSON.stringify(resp_abil)}`);
            this.player.doRespawn(resp_char, resp_credit, resp_abil);
        })
        ipcMain.handle("game-do-resetLevel", async ()=>{
            logger.log("game progress reset!");
            this.updateBoss(0);
        })

        // misc
        ipcMain.handle("ready", async () => {
            logger.info("game window ready");
        });
        ipcMain.handle("debug", async()=>{
            this.onDebugMode();
        });
    }

    doMatch(){
        if(this.player.status !== "alive") return;
        let match = new Match(this.player, this.cur_boss);
        match.start();
        match = match.dump();
        Record.saveMatch(match);
        return match;
    }

    updateBoss(level) {
        this.cur_level = level;
        logger.info(`level up: lv.${this.cur_level}`);
        if (this.cur_level <= Chars.getMaxLevel()) {
            this.cur_boss = Chars.getBoss(this.cur_level);
        } else {
            logger.info("highest level reached");
            this.cur_boss = null;
        }
    }

    onDebugMode() {
        Dev = require("./DevTool");
        Dev.init(this.win);
        this.win.openDevTools();
        this.in_debug = true;
        logger.debug("debug mode activated");
    }

    dump() {
        return {
            cur_level: this.cur_level,
            player: this.player.dump(),
        }
    }

    end() {
        File.writeObj(gamedata_path, this.dump());
        logger.log("all game data saved");
    }
}

module.exports = Game;
