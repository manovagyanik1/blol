import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {CommentService} from "../services/commentService";

export class CommentController extends BaseController {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        // Testing feed service
        reply(CommentService.getComment(1, 1));
    }
}