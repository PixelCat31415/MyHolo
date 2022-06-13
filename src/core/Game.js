// TODO

const {ipcMain} = require("electron");
const Player = require("./Player");
const Boss = require("./BossManager");

// class Game {
//     win;
//     player;
//     cur_level;

//     constructor(obj) {
        
//     }
// }

let player = new Player();
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
    return Boss.getBossByLevel(0).dump();
})
