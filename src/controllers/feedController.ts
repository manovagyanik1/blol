import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {FeedService} from "../services/feedService";

export class FeedController extends BaseController {

    // returns the list of feed
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {
        
        reply(FeedService.getFeed());
    }
}