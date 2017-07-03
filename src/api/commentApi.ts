import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {CommentService} from "../services/commentService";

export class CommentApi extends BaseApi {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        const {postId} = request.params;
        const {limit, page, pagination} = request.query;
        const response = CommentService.getComments({postId});
        reply(response);
    }
}