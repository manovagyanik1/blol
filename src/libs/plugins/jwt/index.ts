import { IPlugin } from "../interfaces";
import * as Hapi from "hapi";
import GlobalConstants from '../../../constants/globalConstants';
import { authenticateUser } from '../../../auth/validator';
import container from "../../ioc";
import { IServerConfig } from "../../../../configurations/interfaces";
const config = container.get<IServerConfig>("IServerConfig");

export default (): IPlugin => {
    return {
        register: (server: Hapi.Server) => {

            server.register({
                register: require('hapi-auth-jwt2')
            }, (error) => {
                if (error) {
                    console.log('error', error);
                }else {
                    server.auth.strategy('jwt', 'jwt',Boolean(config.get("auth:enabled")),
                        {
                            key: config.get('key:privateKey'),
                            validateFunc: authenticateUser,
                            verifyOptions: { algorithms: [ 'HS256' ] },
                            urlKey: GlobalConstants.AUTH_URL_QUERY_KEY,
                            cookieKey: GlobalConstants.AUTH_COOKIE_KEY
                        }
                    );
                    var cache = require('./../../../utils/cache-utils').cache;
                    cache.on('connect',(err) =>{
                        if (err){
                            console.log('error', "error while starting redis cache::: ", err);
                            throw err;
                        }else{
                            console.log("Redis connected.")
                        }
                    });
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