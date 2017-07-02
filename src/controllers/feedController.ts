import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {FeedService} from "../services/feedService";

export class FeedController extends BaseController{
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {
        // Testing feed service
        reply(FeedService.getFeed(1, 1));
    }
}