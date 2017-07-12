import * as fs from 'fs';
import * as path from 'path';
var CronJob = require('cron').CronJob;

export class Crons {
    public static CronJob = CronJob;
    constructor() {
        let currentFile = path.basename(__filename);

        fs.readdirSync(__dirname)
            .filter(function (file) {
                return (fs.lstatSync(path.join(__dirname, file)).isFile()) && (file !== currentFile);
            })
            .forEach(function (file) {
                let hidden = /^\./.test(file);
                let fileExtension = path.extname(file);
                if (!hidden && fileExtension === '.js') {    //getting only js files
                    let cron = require(path.join(__dirname, file)).default;
                    new cron();
                }
            });
    }
}