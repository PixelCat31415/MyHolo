// TODO

const {ipcMain} = require("electron");
const Player = require("./Player");
const Boss = require("./BossManager");
const Match = require("./Match");

// class Game {
//     win;
//     player;
//     cur_level;

//     constructor(obj) {
        
//     }
// }

let player = new Player();
let boss = Boss.getBossByLevel(0);
// console.log(player);
ipcMain.handle("game-get-player", async ()=>{
    return player.dump();
});
ipcMain.handle("game-do-addAbil", async (event, type)=>{
    return player.doAddAbil(type);
})
ipcMain.handle("game-do-idle", async (event, type)=>{
    player.doIdle(type);
})
ipcMain.handle("game-get-boss", async ()=>{
    return boss.dump();
})
ipcMain.handle("game-do-match", async ()=>{
    let match = new Match(player, boss);
    match.start();
    return match.dump();
})
