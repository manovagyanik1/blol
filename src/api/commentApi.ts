import { PaginationWrapper } from '../pagination/paginationWrapper';
import { BeforeAfter } from '../constants/enums/beforeAfter';
import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {CommentService} from "../services/commentService";

export class CommentApi extends BaseApi {
    public static getComment(request: Hapi.Request, reply: Hapi.IReply) {
        const {params: {postId}, query: {beforeTimeStamp, afterTimestamp, pageSize}} = request;
        const user: IUserModel = request.auth.credentials;
        const type = (afterTimestamp) ? BeforeAfter.AFTER : BeforeAfter.BEFORE;
        let timestamp = (afterTimestamp) ? afterTimestamp : beforeTimeStamp;
        if (!timestamp) {
            timestamp = new Date();
        }
        const response = CommentService.getComments({postId, user, timestamp, type, pageSize});

        response.then((results) => {
            reply(PaginationWrapper.wrap({results, pageSize, request}));
        });
    }

    public static postComment(request: Hapi.Request, reply: Hapi.IReply){
        const {payload: {postId, text}} = request;
        const user: IUserModel = request.auth.credentials;
        reply(CommentService.postComment({postId, text, user}));
    }
}
