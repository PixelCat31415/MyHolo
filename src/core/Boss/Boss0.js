// basic template
// shows minimum interface of a boss
// other boss should inherit from this class

const Points = require("../Points");
const Entity = require("../Entity");

class Boss0 extends Entity {
    constructor(obj) {
        super(obj);
    }

    prepare(opp, match) {
        this.abil = new Points(this.max_abil);
    }

    attack(opp, match) {}

    isDefeated(opp, match) {
        return this.abil.hp < 0;
    }

    finish(opp, match) {}

    dump(){
        return {
            name: this.name,
            avator: this.avator,
            char_name: this.char_name,
            level: this.level,
            max_abil: this.max_abil.dump(),
        }
    }
}

module.exports = Boss0;
