import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";

export class FeedApi extends BaseApi {

    // returns the list of feed
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {
        reply(FeedService.getFeed());
    }
}