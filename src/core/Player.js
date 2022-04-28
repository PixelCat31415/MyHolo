// defines properties of a player

const Characters = require("./Characters");
const fio = require("./File");
const Points = require("./Points");

class Player {
    name;
    pts;
    charid;

    #char;

    constructor(_name, _charid, _pts) {
        console.log("constructing player");
        this.name = _name;
        this.charid = _charid;
        this.pts = new Points(_pts);
        this.#char = Characters.getCharacter(this.charid);
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
    getChar(){
        return this.#char;
    }
}

module.exports = Player;
