import {IPlugin, IPluginInfo} from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {

            let routePlugin: { register(server, options, next): void };

            routePlugin = (() => {
                let _register : any = function (server, options, next) {
                    server.route(require('../../../routes/V1'));
                    next();
                };
                _register.attributes = {
                    name: 'myPlugin',
                    version: '1.0.0'
                };
                return _register;
            })();

            server.register({ register: routePlugin }, {
                select : "V1",
                routes: {
                    prefix: '/v1'
                }
            }, (err) => {

                if (err) {
                    throw err;
                }
            });
        },
        info: () => {
            return {
                name: "routes",
                version: "1.0.0"
            };
        }
    };
};