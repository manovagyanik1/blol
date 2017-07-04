import { ITokenData } from '../auth/iTokenData';
import JWTUtils from '../utils/JWTUtils';
import BaseService from "./baseService";
import { models } from '../models';
import container from "../libs/ioc";
import { IServerConfig } from "../../configurations/interfaces";

const FB = require("fb");
const config = container.get<IServerConfig>("IServerConfig");

export class UserLoginService extends BaseService {

    // return the login token if the user already exists in the db,
    // create a new user if the user is not there in the db.
    public static getLoginToken(code: String): Promise<any> {
        return new Promise((resolve, reject) => {
            FB.api('oauth/access_token', {
                client_id: config.get('facebook:appId'),
                client_secret: config.get('facebook:appSecret'),
                redirect_uri: config.get('facebook:redirectUri'),
                code
            }, (res) => {
                if (res && res.error) {
                    reject(res.error);
                }

                var accessToken = res.access_token;
                var expires = res.expires ? res.expires : 0;
                FB.options({accessToken});

                FB.api('/me', {fields: 'id, name, email, picture.type(large)'}, (res) => {
                    if (res && res.error) {
                        reject(res.error);
                    } else {
                        const {id, name, email, picture: {data: {url}}} = res;
                        models.User.findOneAndUpdate({
                            facebookId: id,
                            fullName: name,
                            email,
                            profilePicUrl: url,
                        }, {}, {upsert: true, new: true, setDefaultsOnInsert: true})
                        .then((data) => {
                            // get JWT token and insert into request/response
                            const jwtToken: string = JWTUtils.signJWTToken(data.toObject());
                            resolve({token: jwtToken});
                        });
                    }
                });
            });
        });
    }

    public static isNewUser(): boolean {
        return true;
    }

}