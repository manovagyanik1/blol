import { IServerConfig } from "./interfaces";
import { injectable, inject } from "inversify";
import * as nconf from 'nconf';

@injectable()
export default class Conf implements IServerConfig {

    private conf: any;

    constructor() {
        const env = process.env.NODE_ENV || "dev";
        const configFolder = __dirname;
        const configFileName = "config." + env + ".json";

        const configFile = configFolder + "/" + configFileName;

        const conf = nconf
            .argv()
            .env({
                separator: '__' // bash doesn't like periods or colons in environment vars, they already have meaning
            })
            .file({ file: configFile });

        if (conf.get('NODE_ENV')) {
            conf.set('environment', conf.get('NODE_ENV'));
        }
        this.conf = conf;
    }

    public get (key: string){
        return this.conf.get(key);
    }
}
