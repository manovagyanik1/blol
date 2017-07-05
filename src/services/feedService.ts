import {IUserModel, User} from '../models/schemas/user';
import BaseService from "./baseService";
import {UserReactionService} from './userReactionService';
import { models } from '../models';
import { IPostModel } from "../models/schemas/post";
import { IUserReactionModel } from "../models/schemas/userReaction";
import { ICommentModel } from "../models/schemas/comment";
import {BeforeAfter} from "../constants/enums/beforeAfter";
import {Types} from "mongoose";

export class FeedService extends BaseService {

    public static getFeed(args: {timestamp: number, type: BeforeAfter, pageSize: number, user: IUserModel}): Promise<any> {
        const {timestamp, type, pageSize, user} = args;
        const query = type === BeforeAfter.BEFORE ? { $lt: timestamp} : {$gt: timestamp};

        return models.Post.find({
            createdAt: query
        })
            .limit(pageSize)
            .sort({'createdAt': -1})
            .then((posts: [IPostModel]) => {
                const postIds: Types.ObjectId[] = posts.map((post:IPostModel) => post._id);
                UserReactionService.getAggregatedUserReactionsForPostIds(postIds)
                    .then((postReactions) => {
                         posts, postReactions;
                return posts;
                });
    }
}



