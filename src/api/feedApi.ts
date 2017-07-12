import { PaginationWrapper } from './../pagination/paginationWrapper';
import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";
import {BeforeAfter} from "../constants/enums/beforeAfter";
import {FbPostPullerService} from "../services/fbPostPullerService";
import FBUtils from "../utils/fbUtils";

export class FeedApi extends BaseApi {

    // returns the list of feed
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {

        const {params: {postId}, query: {beforeTimeStamp, afterTimestamp, pageSize}} = request;
        const user: IUserModel = request.auth.credentials;
        const type = (afterTimestamp) ? BeforeAfter.AFTER : BeforeAfter.BEFORE;
        let timestamp = (afterTimestamp) ? afterTimestamp : beforeTimeStamp;
        if (!timestamp) {
            timestamp = new Date();
        }

        const response = FeedService.getFeed({timestamp, pageSize, type, user});
        FBUtils.getAccessToken().then(token => {
            console.log(token);
            }
        );

        response.then((results) => {
            reply(PaginationWrapper.wrap({results, pageSize, request}));
        });
    }
}