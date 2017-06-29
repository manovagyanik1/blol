import * as Hapi from "hapi";
import * as path from "path";
import * as fs from "fs";
import container from "./libs/ioc";
import { IPlugin } from "./libs/plugins/interfaces";
import { IServerConfig } from "../configurations/interfaces";

const config = container.get<IServerConfig>("IServerConfig");
const port = process.env.PORT || config.get("server:port");

//log all promise rejections
process.on('unhandledRejection', function(error, promise) {
    console.error("UNHANDLED REJECTION", error.stack);
});

const server = new Hapi.Server();

server.connection({
    port: port,
    routes: {
        cors: true
    },
    labels: ['V1', 'CRMRoutes']
});

console.log("server going to run at : " + server.info.uri);

//  Setup Hapi Plugins
const pluginsPath = __dirname + '/libs/plugins/';
const plugins = fs.readdirSync(pluginsPath).filter(file => fs.statSync(path.join(pluginsPath, file)).isDirectory());

plugins.forEach((pluginName: string) => {
    var plugin: IPlugin = (require("./libs/plugins/" + pluginName)).default();
    console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
    plugin.register(server);
});

export default server;