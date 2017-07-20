import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";
import {FbPostPullerService} from "../services/fbPostPullerService";
import {IFbPostPullerDataModel} from "../models/schemas/fbPostPullerData";
import {Schema} from "mongoose";
import {FbPostStatus} from "../constants/enums/fbPostStatus";

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

    public static copyDataFromFbPostPullerToUserFacing(request: Hapi.Request, reply: Hapi.IReply) {
        const {payload: {limit}} = request;
        return FbPostPullerService.getFirstNFbPostPullerDataIdsWithStatus(limit, FbPostStatus.WAITING)
            .then((results: IFbPostPullerDataModel[]) => {
                return results.map((result: IFbPostPullerDataModel) => {
                    return result._id;
                });
            })
            .then((objectIds: Schema.Types.ObjectId[]) => {
                const stringObjectIds = objectIds.map(objectId => objectId.toString());
                FbPostPullerService.markIdsAsAccepted(stringObjectIds)
                    .then((uselessResult) => {
                        return FbPostPullerService.copyFbPostPullerDataToUserFacingDataStore(stringObjectIds);
                    });
            });
    }
}