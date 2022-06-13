// manages all characters, so that characters can be easily added and accessed

const File = require("./File");
const log4js = require("log4js");

let logger = log4js.getLogger("Characters");
logger.level = "all";

class CharManager {
    char_names;
    char_list;
    
    constructor() {
        let char_files = File.getAllFiles("src/core/Character");
        logger.log(`${char_files.length} character files found: ${char_files}`);
        this.char_list = new Map();
        this.char_names = [];
        for(let char_file of char_files){
            let char_name = char_file.replace(/\.[^/.]+$/, "");
            this.char_list.set(char_name, require(`./Character/${char_name}`));
            this.char_names.push(char_name);
        }
    }

    getChar(name) {
        if(!this.char_list.has(name)){
            logger.error(`unknown char name: ${name}`);
            logger.debug(`char names should be same as their file name.`);
        } else {
            return this.char_list.get(name);
        }
    }

    getAllChars() {
        return this.char_names;
    }
}

let manager = new CharManager();

module.exports = manager;
