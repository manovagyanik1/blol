import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {CommentService} from "../services/commentService";

export class CommentController extends BaseController {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        const {postId} = request.params;
        const {limit, page, pagination} = request.query;
        const response = CommentService.getComment({postId});
        reply(response);
    }

    // public static getUserReaction(request: Hapi.Request, reply: Hapi.IReply){
    //     const {commentId, userId} = request.query;
    //     reply()
    // }
}