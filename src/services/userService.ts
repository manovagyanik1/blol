import BaseService from "./baseService";
import { models } from '../models';
import container from "../libs/ioc";
import { IServerConfig } from "../../configurations/interfaces";

const FB = require("fb");
const config = container.get<IServerConfig>("IServerConfig");

export class UserService extends BaseService {

    // return the login token if the user already exists in the db,
    // create a new user if the user is not there in the db.
    public static getLoginToken(code: String): Promise<any> {
        return FB.api('oauth/access_token', {
            client_id: config.get('facebook:appId'),
            client_secret: config.get('facebook:appSecret'),
            redirect_uri: config.get('facebook:redirectUri'),
            code
        }, function (res) {
            if (!res || res.error) {
                console.log(!res ? 'error occurred' : res.error);
                return;
            }

        var accessToken = res.access_token;
        var expires = res.expires ? res.expires : 0;
        FB.options({accessToken});

        FB.api('/me', function (res) {
            if (res && res.error) {
                if (res.error.code === 'ETIMEDOUT') {
                    console.log('request timeout');
                } else {
                    console.log('error', res.error);
                }
            }else {
                const {id, name} = res;
            }
        });
    });
    }

}