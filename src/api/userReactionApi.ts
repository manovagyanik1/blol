import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {UserReactionService} from "../services/userReactionService";

export class UserReactionApi extends BaseApi {

    public static react(request: Hapi.Request, reply: Hapi.IReply) {
        const user: IUserModel = request.auth.credentials;
        const {targetId, reaction, type} = request.query;

        return reply(UserReactionService.react({targetId, userId: user._id, reaction, type}));
    }
}