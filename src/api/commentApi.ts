import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {CommentService} from "../services/commentService";

export class CommentApi extends BaseApi {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        const {params: {postId}, query: {limit, page, pagination}} = request;
        const response = CommentService.getComments({postId});
        reply(response);
    }
}