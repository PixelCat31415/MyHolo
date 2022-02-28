// defines properties of a player

const Characters = require("./Characters");
const fio = require("./File");
const Points = require("./Points");

// const dataPath = "./data/players/player.json";

class Player {
    name;
    rePts;
    status;
    char;

    constructor(obj) {
        // read from file if path is given
        // give default value if nothing given
        if (typeof obj === "string") {
            obj = fio.readObj(obj);
        } else if (!obj) {
            console.log("No player data found. Creating a new one.");
            obj = {
                name: "I8E23A",
                rePts: new Points(),
                status: 1,
                char: new Characters(0),
            };
        }
        // construct from obj
        this.name = obj.name;
        this.rePts = new Points(obj.rePts);
        this.status = obj.status;
        this.char = obj.char;
    }

    // save to file
    save(path) {
        fio.writeObj(path, this);
        console.log("saved player data");
    }
}

module.exports = Player;
