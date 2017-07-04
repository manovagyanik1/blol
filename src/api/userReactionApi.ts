import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {UserReactionService} from "../services/userReactionService";

export class UserReactionApi extends BaseApi {

    public static deleteReaction(request: Hapi.Request, reply: Hapi.IReply) {
        const user: IUserModel = request.auth.credentials;
        const {targetId, reaction, type} = request.payload;

        return reply(UserReactionService.deleteReaction({targetId, userId: user._id, reaction, type}));
    }

    public static insertReaction(request: Hapi.Request, reply: Hapi.IReply) {
        const user: IUserModel = request.auth.credentials;
        const {targetId, reaction, type} = request.payload;

        return reply(UserReactionService.insertReaction({targetId, userId: user._id, reaction, type}));
    }
}