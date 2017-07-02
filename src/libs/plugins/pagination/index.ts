import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            const opts = {
                routes: {
                    include: ['*'],  exclude: [] // Emptying include list will disable pagination
                }
            };
            server.register({
                register: require('hapi-pagination'),
                options: opts
            }, (error) => {
                if (error) {
                    console.log('error', error);
                }
            });
        },
        info: () => {
            return {
                name: "Hapi Pagination",
                version: "1.0.0"
            };
        }
    };
};