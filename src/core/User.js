// define properties of a user
// level / exp / respawn ...etc.

const fio = require("./File");
const Player = require("./Player");
const Chars = require("./Characters");
const Points = require("./Points");
const Exp = require("./Experience");

class User {
    id;
    name;
    exp;
    pts;
    respawn_pts;
    status;
    charid;
    #char;

    constructor(_id) {
        fio.readObj2(`data/users/user-${id}`, this);
        this.pts = new Points(this.pts);
        this.respawn_pts = new Points(this.respawn_pts);
        this.#char = Chars.getCharacter(this.charid);
        if (this.id !== _id) {
            throw "user id doesn't match file name.";
        }
    }

    save(path) {
        fio.writeObj(path, this);
        console.log(`saved user ${this.name}`);
    }

    respawn() {}

    addExperience(exp) {
        let lvl0 = Exp.getLevel(this.exp);
        this.exp += exp;
        let lvl1 = Exp.getLevel(this.exp);
        let delta = this.#char.points(lvl1).sub(this.#char.points(lvl0));
        this.pts += delta;
        return delta;
    }

    addRespawnPoint(pt) {
        this.respawn_pts = this.respawn_pts.add(pt);
    }

    isAlive() {
        return this.status == 1;
    }

    getRespawnPoint() {
        return this.respawn_pts;
    }
    getExperience() {
        return this.exp;
    }
    getLevel() {
        return Exp.getLevel(this.exp);
    }
    getPts() {
        return this.pts;
    }
}

module.exports = User;
