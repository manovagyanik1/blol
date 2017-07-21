import JWTUtils from '../utils/JWTUtils';
import BaseService from "./baseService";
import { models } from '../models';
import container from "../libs/ioc";
import { IServerConfig } from "../../configurations/interfaces";
import {UserService} from "./userService";

const FB = require("fb");
const config = container.get<IServerConfig>("IServerConfig");

export class UserLoginService extends BaseService {

    public static getLoginTokenFromAccessToken(accessToken: String) : Promise<any> {
        return new Promise((resolve, reject) => {
            FB.setAccessToken(accessToken);
            FB.api('/me', {fields: 'id, name, email, picture.type(large)'}, (res) => {
                if (res && res.error) {
                    reject(res.error);
                } else {

                    const {id, name, email, picture: {data: {url}}} = res;
                    UserService.createUserOrUpdateIfExisting({
                        facebookId: id,
                        fullName: name,
                        email: email,
                        profilePicUrl: url,
                    })
                        .then((data) => {
                            // get JWT token and insert into request/response
                            const jwtToken: string = JWTUtils.signJWTToken(data.toObject());
                            resolve({token: jwtToken, userId: data._id});
                        });
                }
            });
        });
    }

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

                const accessToken = res.access_token;
                const expires = res.expires ? res.expires : 0;
                UserLoginService.getLoginTokenFromAccessToken(accessToken)
                    .then(data => resolve(data))
                    .catch(err => reject(err));
            });
        });
    }


}