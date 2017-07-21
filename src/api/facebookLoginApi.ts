import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {UserLoginService} from "../services/userLoginService";

export class FacebookLoginApi extends BaseApi {

    // returns the list of feed
    public static getLoginTokenFromCode(request: Hapi.Request, reply: Hapi.IReply) {
        const {code} = request.query;
        reply(UserLoginService.getLoginToken(code));
    }

    public static getLoginTokenFromAccessToken(request: Hapi.Request, reply: Hapi.IReply) {
        const {accessToken} = request.payload;
        reply(UserLoginService.getLoginTokenFromAccessToken(accessToken));
    }
}