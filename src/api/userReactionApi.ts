import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {UserReactionService} from "../services/userReactionService";

export class UserReactionApi extends BaseApi {

    public static react(request: Hapi.Request, reply: Hapi.IReply) {
        const {targetId, userId, reaction, type} = request.query;
        // TODO: get the userId from request.headers after validation
        return reply(UserReactionService.react({targetId, userId, reaction, type}));
    }
}