// manages all boss, so that boss can be easily added and accessed

const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Boss");
logger.level = "all";

let level_config = [
    "Gura",
]

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

    getBossByName(name) {
        if(!this.boss_list.has(name)){
            logger.error(`unknown boss name: ${name}`);
            logger.debug(`boss names should be same as their file name.`);
        } else {
            return new (this.boss_list.get(name))();
        }
    }

    getBossByLevel(level) {
        if(level >= level_config.length){
            return 0;
        }
        return this.getBossByName(level_config[level]);
    }
}

let manager = new BossManager();

module.exports = manager;
