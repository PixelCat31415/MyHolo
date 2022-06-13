// manages all boss, so that boss can be easily added and accessed

const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Boss");
logger.level = "all";

class BossManager {
    boss_level;
    boss_list;

    constructor() {
        let boss_files = File.getAllFiles("src/core/Boss").filter((file) =>
            file.endsWith(".js")
        );
        logger.log(`${boss_files.length} boss files found: ${boss_files}`);
        this.boss_list = new Map();
        for (let boss_file of boss_files) {
            let boss_name = boss_file.replace(/\.[^/.]+$/, "");
            this.boss_list.set(boss_name, require(`./Boss/${boss_name}`));
        }

        this.boss_level = File.readObj("./src/core/Boss/boss_level.json");
    }

    getBoss(name) {
        if (!this.boss_list.has(name)) {
            logger.error(`unknown boss name: ${name}`);
            logger.debug(`boss names should be same as their file name.`);
            return {};
        } else {
            return new (this.boss_list.get(name))();
        }
    }

    getMaxLevel() {
        return this.boss_level.length - 1;
    }

    getBossAtLevel(level) {
        if (!this.boss_level[level]) {
            logger.error(`level range ${level} out of bound`);
            return {};
        } else {
            return this.getBoss(this.boss_level[level]);
        }
    }
}

let manager = new BossManager();

module.exports = manager;
