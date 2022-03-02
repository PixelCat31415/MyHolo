// defines properties of a player

const Characters = require("./Characters");
const fio = require("./File");
const Points = require("./Points");

// const dataPath = "./data/players/player.json";

class Player {
    name;
    pts;
    rePts;
    status;
    char;

    constructor(obj) {
        if (typeof obj === "string") {
            obj = fio.readObj(obj);
        } else if (typeof obj !== "object") {
            console.log("No player data found. Creating a new one.");
            obj = {};
        }
        this.name = obj.name || "I8E23A";
        this.rePts = new Points(obj.rePts);
        this.status = obj.status || 1;
        this.char = new Characters(obj.char);
    }

    save(path) {
        fio.writeObj(path, this);
        console.log("saved player data");
    }

    prepare(opp, match) {
        this.pts = new Points(this.char.pts);
        this.char.prepare(this, opp, match);
    }
    attack(opp, match) {
        match.addMessage(`${this.name}'s turn...`);
        this.char.attack(this, opp, match);
    }
    isDefeated(opp, match) {
        return this.char.isDefeated(this, opp, match);
    }
    finish(opp, match) {
        this.char.finish(this, opp, match);
    }
}

module.exports = Player;
