import {IPlugin, IPluginInfo} from "../interfaces";
import * as Hapi from "hapi";

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {
            server.register([
                require('inert'),
                require('vision'),
                {
                    register: require('hapi-swagger'),
                    options: {
                        info: {
                            title: 'Lolmenow Api Documentation',
                            description: 'API for lolmenow web & mobile apps.',
                            version: '1.0'
                        },
                        securityDefinitions: {
                            'Bearer': {
                                'type': 'apiKey',
                                'name': 'Authorization',
                                'in': 'header'
                            }
                        },
                        tags: [
                            {
                                'name': 'lolmenow',
                                'description': 'lolmenow App  - Api'
                            }
                        ],
                        documentationPath: '/',
                        pathPrefixSize: 2,
                        sortTags: 'name'
                    }
                }
            ]
                , (error) => {
                    if (error) {
                        console.log('error', error);
                    }
                });
        },
        info: () => {
            return {
                name: "Swagger Documentation",
                version: "1.0.0"
            };
        }
    };
};