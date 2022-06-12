// manages 

const Entity = require("./Entity");
const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Boss");
logger.level = "all";

class BossManager {
    boss_list;
    
    constructor() {
        let boss_files = File.getAllFiles("src/core/Boss");
        logger.log(`${boss_files.length} boss files found: ${boss_files}`);
        this.boss_list = new Map();
        for(let boss_file of boss_files){
            let boss_name = boss_file.replace(/\.[^/.]+$/, "");
            this.boss_list.set(boss_name, require(`./Boss/${boss_name}`));
        }
    }

    getBoss(name) {
        if(!this.boss_list.has(name)){
            logger.error(`unknown boss name: ${name}`);
            logger.debug(`boss names should be same as their file name.`);
        } else {
            return new (this.boss_list.get(name))();
        }
    }
}

module.exports = manager;
