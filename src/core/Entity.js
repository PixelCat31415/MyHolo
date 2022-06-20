// this a virtual (parent) class
// Player/Boss classes inherit from this class

const Points = require("./Points");
const log4js = require("log4js");

let logger = log4js.getLogger("Entity");
logger.level = "all";

class Entity {
    name;
    char_name;
    avatar;
    full_picture;
    motto;
    skills;
    level;
    max_abil;
    abil;

    constructor(obj) {
        if(!obj) return;
        if(typeof obj !== "object"){
            logger.error("not constructing with an object");
            return;
        }
        this.name = obj.name;
        this.avatar = obj.avatar;
        this.full_picture = obj.full_picture;
        this.motto = obj.motto;
        this.skills = obj.skills;
        this.char_name = obj.char_name;
        this.level = obj.level;
        this.max_abil = new Points(obj.max_abil);
    }

    prepare(opp, match) {
        logger.debug("Entity::prepare() should be overridden");
    }

    attack(opp, match) {
        logger.debug("Entity::attack() should be overridden");
    }

    isDefeated(opp, match) {
        logger.debug("Entity::isDefeated() should be overridden");
    }

    finish(opp, match) {
        logger.debug("Entity::finish() should be overridden");
    }

    dump(){
        logger.debug("Entity::dump() should be overridden")
        return {}
    }
}

module.exports = Entity;
