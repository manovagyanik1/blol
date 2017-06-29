import Server from "./server";

import {Crons} from "../crons/index";

import container from "./libs/ioc";
import { IServerConfig } from "../configurations/interfaces";

const config = container.get<IServerConfig>("IServerConfig");

console.log(`Running enviroment ${process.env.NODE_ENV || "dev"}`);

//Starting Application Server
Server.start(() => {
    
    if (config.get('cron:startCron')) {
        new Crons();
    }
    console.log('Server running at:', Server.info.uri);
});
