import * as JWT from "jsonwebtoken";
import container from "../libs/ioc";
import {IServerConfig} from "../../configurations/interfaces";

const config = container.get<IServerConfig>("IServerConfig");

export default class JWTUtils {

    /**
     * Signs JWT token with key and set issuer as project name.
     *
     * @param tokenData: data to be passed in JWT token.
     * @returns {string} JWT String containing the token.
     */
    public static signJWTToken(tokenData: any) : string {

        // token data is object
        return JWT.sign(tokenData, config.get('key:privateKey'), {issuer: config.get('project:name')});
    }

    /**
     * If callback is not provided, will run synchronously.
     * ** Note ** If needed, later callback can be provided.
     *
     * @param token: JWT token that is supplied.
     * @returns {any}: returns the payload object which contains all the data.
     */
    public static verifyJWTToken(token: string): any {
        // returns a object that contains data
        return JWT.verify(token, config.get('key:privateKey'));
    }
}