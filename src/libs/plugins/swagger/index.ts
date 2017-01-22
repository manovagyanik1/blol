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
                            title: 'Cult Api Documentation',
                            description: 'API for cult web & mobile apps.',
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
                                'name': 'cult',
                                'description': 'Cult App  - Api'
                            }
                        ],
                        documentationPath: '/docs',
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