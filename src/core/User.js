// define properties of a user
// level / exp / respawn ...etc.

const fio = require("./File");
const Player = require("./Player");
const Points = require("./Points");
const Exp = require("./Experience");

class User {
    id;
    name;
    exp;
    pts;
    respawn_pts;
    status;

    constructor(_id) {
        this.id = _id;
        // TODO
    }

    save(path) {
        fio.writeObj(path, this);
        console.log(`saved user ${this.name}`);
    }

    respawn() {}

    addExperience(exp) {
        this.exp += exp;
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
}

module.exports = User;
