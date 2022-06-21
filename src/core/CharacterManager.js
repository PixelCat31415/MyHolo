// manages all characters, so that characters can be easily added and accessed

const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Characters");
logger.level = "all";

class CharManager {
    boss_level;
    char_names;
    char_list;

    constructor() {
        let char_files = File.getAllFiles(`${__dirname}/Character`).filter(
            (file) => file.endsWith(".js")
        );
        logger.log(`${char_files.length} character files found`);
        logger.debug(`${char_files}`);
        this.char_list = new Map();
        this.char_names = [];
        for (let char_file of char_files) {
            let char_name = char_file.replace(/\.[^/.]+$/, "");
            let char_class = require(`${__dirname}/Character/${char_name}`);
            this.char_list.set(char_name, new char_class());
            this.char_names.push(char_name);
        }

        this.boss_level = File.readObj(`${__dirname}/level/boss.json`);
        logger.log(`${this.boss_level.length} boss found`);
        logger.debug(`${this.boss_level}`);
        for (let id of this.boss_level) {
            if (!this.char_list.has(id)) {
                logger.error(`unknown boss id: ${id}`);
            }
        }
    }

    getChar(name) {
        if (!this.char_list.has(name)) {
            logger.error(`unknown char name: ${name}`);
            logger.debug(`char names should be same as their file name.`);
        } else {
            return this.char_list.get(name);
        }
    }

    getAllChars() {
        let res = Array.from(this.char_list.entries());
        res = res
            .filter((item) => !item[1].hidden)
            .map((item) => {
                item[1] = item[1].dump();
                return item;
            });
        return res;
    }

    getMaxLevel() {
        return this.boss_level.length - 1;
    }

    getBoss(level) {
        if (!this.boss_level[level]) {
            logger.error(`level range ${level} out of bound`);
            return {};
        } else {
            return this.getChar(this.boss_level[level]);
        }
    }
}

let manager = new CharManager();

module.exports = manager;
