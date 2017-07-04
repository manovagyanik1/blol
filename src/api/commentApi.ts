import { BeforeAfter } from '../constants/enums/beforeAfter';
import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {CommentService} from "../services/commentService";

export class CommentApi extends BaseApi {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        const {params: {postId}, query: {beforeTimeStamp, afterTimestamp, pageSize = 10}} = request;
        const user: IUserModel = request.auth.credentials;
        const type = (beforeTimeStamp) ? BeforeAfter.BEFORE : BeforeAfter.AFTER;
        const timestamp = (beforeTimeStamp) ? beforeTimeStamp : afterTimestamp;
        const response = CommentService.getComments({postId, user, timestamp, type, pageSize});
        reply(response);
    }
}