import { PaginationWrapper } from './../pagination/paginationWrapper';
import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";

export class FeedApi extends BaseApi {

    // returns the list of feed
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {
        const {params: {postId}, query: {beforeTimeStamp, afterTimestamp, pageSize = 10}} = request;
        const user: IUserModel = request.auth.credentials;
        const response = FeedService.getFeed({user});

        response.then((results) => {
            reply(PaginationWrapper.wrap({results, pageSize, request}));
        });
    }
}