import {IPlugin, IPluginInfo} from "../interfaces";
import * as Hapi from "hapi";
import * as moment from 'moment';

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {

            let addTimeToResponsePlugin: { register(server, options, next): void };

            addTimeToResponsePlugin = (() => {
                let _register : any = function (server, options, next) {

                    server.ext('onPreResponse',(request, reply) => {

                        let meta = {
                            ts: moment()
                        };

                        if (request.response.isBoom) {

                            if (request.response.output.payload.meta){
                                request.response.output.payload.meta.ts = meta.ts;
                            } else {
                                request.response.output.payload.meta = meta;
                            }

                        } else {

                            if (!request.response.source) {
                                request.response.source = {};
                            }

                            if (request.response.source.meta) {
                                request.response.source.meta.ts = meta.ts;
                            } else {
                                request.response.source.meta = meta;
                            }
                        }

                        return reply.continue();
                    });

                    next();
                };
                _register.attributes = {
                    name: 'addTimeToResponse Plugin',
                    version: '1.0.0'
                };
                return _register;
            })();

            server.register({ register: addTimeToResponsePlugin }, (err) => {

                if (err) {
                    throw err;
                }
            });
        },
        info: () => {
            return {
                name: "addTimeToResponse",
                version: "0.0.1"
            };
        }
    };
};