import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";
import container from "../../ioc";
import { IServerConfig } from "../../../../configurations/interfaces";
const config = container.get<IServerConfig>("IServerConfig");

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            server.register({
                register: require('hapi-raven-boom'),
                options: {
                    dsn: config.get('sentry:DSN'),
                    settings: {
                        captureUnhandledRejections: true,
                        sampleRate: 1.0,
                        sendTimeout: 5,
                    },
                    tags: ['sentry-errors']
                }
            }, (error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: () => {
            return {
                name: "Hapi-auth-jwt2 Auth",
                version: "1.0.0"
            };
        }
    };
};