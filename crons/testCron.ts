import {Crons} from "./index";
import sequelize = require("sequelize");
export default class testCron {
    constructor(){
        new Crons.CronJob({
            cronTime: '1 * * * * *',
            onTick: function() {
                console.log("cron called.");
            },
            start: false,
            timeZone: 'America/Los_Angeles'
        }).start();
    }
}