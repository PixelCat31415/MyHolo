// defines properties of a player

const fio = require("./File");
const Points = require("./Points")

const dataPath = "./data/players/player.json";

class Player {
    name; // player name (configurable)
    pts; // ability points
    rePts; // respawn points
    status; // -1 = dead, 0 = alive, 1 = uninitialized

    constructor() {
        if(!fio.checkExist(dataPath)){
            console.log("No player data found. Creating a new one.");
            fio.writeObj(
                dataPath,
                {
                    name: "New Player",
                    pts: new Points(),
                    rePts: new Points(),
                    status: 1,
                }
            )
        }
        // TODO: construct from data file
    }

    // save to file
    save() {}
}

player=new Player();

console.log("loaded module PLAYER");
