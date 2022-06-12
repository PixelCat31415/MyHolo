// this a virtual (parent) class
// Player/Boss classes inherit from this class

const Points = require("./Points");
const log4js = require("log4js");

let logger = log4js.getLogger("Entity");
logger.level = "all";

class Entity {
    name;
    avator;
    char_name;
    level;
    max_abil;
    abil;

    constructor(obj) {
        // if(typeof obj !== "Object") return;
        this.name = obj.name;
        this.avator = obj.avator;
        this.char_name = obj.char_name;
        this.level = obj.level;
        this.max_abil = new Points(obj.max_abil);
        this.abil = new Points(obj.abil);
    }

    prepare(opp, match) {
        logger.debug("Entity::prepare() should be overridden, but using default");
        this.abil = new Points(this.max_abil);
    }

    attack(opp, match) {
        logger.debug("Entity::attack() should be overridden, but using default");
    }

    isDefeated(opp, match) {
        logger.debug("Entity::isDefeated() should be overridden, but using default");
        return this.abil.hp < 0;
    }

    finish(opp, match) {
        logger.debug("Entity::finish() should be overridden, but using default");
    }

    dump(){
        return {
            name: this.name,
            avator: this.avator,
            char_name: this.char_name,
            level: this.level,
            max_abil: this.max_abil.dump(),
            abil: this.abil.dump(),
        }
    }
}

module.exports = Entity;
