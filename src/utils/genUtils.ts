import {IUserModel} from "../models/schemas/user";
import * as Boom from "boom";

const FACEBOOK_ID_SHUBHAM = '100001661976158';
const FACEBOOK_ID_RANJI = '100002826211058';

export default class GenUtils {

    // USAGE:
//     if (!GenUtils.isAdmin(request)) {
//     GenUtils.abortAdminRequest(reply);
//     return;
// }
    public static isAdmin(request) {
        const user: IUserModel = request.auth.credentials;
        if (user.facebookId === FACEBOOK_ID_SHUBHAM || user.facebookId === FACEBOOK_ID_RANJI) {
            return true;
        }
        return false;
    }

    public static abortAdminRequest(reply) {
        reply(Boom.unauthorized('Only admin users are allowed to access this endpoint'));
    }
}