import BaseService from "./baseService";
import { models } from '../models';
import container from "../libs/ioc";
import { IServerConfig } from "../../configurations/interfaces";
import {Schema, Types} from "mongoose";
import {IUserModel} from "../models/schemas/user";
import {IUser} from "../models/interfaces/user";

const FB = require("fb");
const config = container.get<IServerConfig>("IServerConfig");
const format = require('string-format');
const FB_PROFILE_PIC_URL_FORMAT = "http://graph.facebook.com/{0}/picture?type=large"

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

    public static getForIds(userIds: Array<Schema.Types.ObjectId>): Promise<IUserModel[]> {
        return models.User.aggregate([{
            $match: {
                _id: {$in: userIds}
            }
        }]).exec();
    }


    public static getOrCreateUserForFacebookId(facebookId: string, fullName: string): Promise<IUserModel> {
        return models.User.update(
            {facebookId: facebookId},
            {$setOnInsert: {
                facebookId: facebookId,
                fullName: fullName,
                nickName: UserService.getNickName(fullName),
                profilePicUrl: format(FB_PROFILE_PIC_URL_FORMAT, facebookId),
                isFbUser: true,
            } as IUserModel},
            {upsert: true}
        ).exec();

    }

    public static createUserOrUpdateIfExisting(args:{facebookId, fullName, email, profilePicUrl}): Promise<IUserModel> {
        return models.User.findOneAndUpdate({
            facebookId: args.facebookId,
            fullName: args.fullName,
            email: args.email,
            nickName: UserService.getNickName(args.fullName),
            profilePicUrl: args.profilePicUrl,
        }, {}, {upsert: true, new: true, setDefaultsOnInsert: true})
            .exec();
    }

    private static getNickName(fullName: string): string {
        return fullName.split(" ")[0];
    }
}
