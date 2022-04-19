// defines properties of a player

const Characters = require("./Characters");
const fio = require("./File");
const Points = require("./Points");

// const dataPath = "./data/players/player.json";

class Player {
    name;
    pts;
    maxPts;
    status;
    charid;
    #char;

    constructor(obj) {
        if (typeof obj === "string") {
            if (fio.checkExist(obj)){
                obj = fio.readObj(obj);
            }else{
                console.log("No player data found. Creating a new one.");
                obj = {};
            }
        } else if (typeof obj !== "object") {
            console.log("Constructing player with unknown type. Creating a new one.");
            obj = {};
        }
        this.name = obj.name || "I8E23A";
        this.pts = new Points(obj.pts);
        this.maxPts = new Points(obj.maxPts);
        this.rePts = new Points(obj.rePts);
        this.status = obj.status || 1;
        this.charid = obj.charid || 0;
        this.#char = Characters.getCharacter(this.charid);
    }

    save(path) {
        fio.writeObj(path, this);
        console.log("saved player data");
    }

    prepare(opp, match) {
        this.#char.prepare(this, opp, match);
    }
    attack(opp, match) {
        match.log(`${this.name}'s turn...`);
        this.#char.attack(this, opp, match);
    }
    isDefeated(opp, match) {
        return this.#char.isDefeated(this, opp, match);
    }
    finish(opp, match) {
        this.#char.finish(this, opp, match);
    }
}

module.exports = Player;
