import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";
import {FbPostPullerService} from "../services/fbPostPullerService";

export class FbPostPullerApi extends BaseApi {

    // returns the list of feed
    public static getFbPosts(request: Hapi.Request, reply: Hapi.IReply) {
        const {query: {pageSize}} = request;

        const results = FbPostPullerService.getFbPosts({pageSize});
        return results.then(response => {
            return reply(response);
        });
    }

    public static updateIds(request: Hapi.Request, reply: Hapi.IReply) {
        const {payload:{accepted, rejected}} = request;
        const acceptedPromise = FbPostPullerService.markIdsAsAccepted(accepted);
        const rejectedPromise = FbPostPullerService.markIdsAsRejected(rejected);
        const anyData = FbPostPullerService.copyFbPostPullerDataToUserFacingDataStore(accepted);
        return Promise.all([acceptedPromise, rejectedPromise, anyData]).then(
            response => {
                return reply(response);
            }
        );

    }
}