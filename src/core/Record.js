const log4js = require("log4js");
let logger = log4js.getLogger("Record");
logger.level = "all";

const File = require("./File");

const record_data_path = `${__dirname}/../../data/record/`;

class Record {
    record_id;
    records;

    constructor() {
        if(File.checkExist(record_data_path)){
            this.record_id = File.getAllFiles(record_data_path);
        }else {
            this.record_id = [];
        }
        this.records = new Map();
        for (let rec of this.record_id) {
            let match = File.readObj(`${record_data_path}${rec}`);
            this.records.set(rec, match);
        }
        logger.log(`${this.record_id.length} match records found`);
        logger.debug(`match id: ${this.record_id}`);
    }

    fetchMatchList() {
        return this.record_id;
    }

    fetchMatch(id) {
        id = `${id}`;
        if (!this.records.has(id)) {
            logger.error(`match id ${id} not found`);
            return;
        }
        return this.records.get(id);
    }

    saveMatch(match) {
        let id = `${match.time}`;
        File.writeObj(`${record_data_path}${id}`, match);
        this.record_id.push(id);
        this.records.set(id, match);
    }
}

let records = new Record();

module.exports = records;
