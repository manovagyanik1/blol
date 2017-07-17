import {IUserModel} from '../models/schemas/user';
import BaseService from "./baseService";
import {UserReactionService} from './userReactionService';
import { models } from '../models';
import { IPostModel } from "../models/schemas/post";
import {UserReactionConstructor} from "../apiinterfaces/AMUserReactionValue";
import {BeforeAfter} from "../constants/enums/beforeAfter";
import {Schema, Types} from "mongoose";
import {AMPost} from "../apiinterfaces/AMPost";
import {CommentService} from "./commentService";

export class FeedService extends BaseService {

    public static getFeed(args: { timestamp: number, type: BeforeAfter, pageSize: number, user: IUserModel }): Promise<AMPost[]> {
        const {timestamp, type, pageSize, user} = args;
        const query = type === BeforeAfter.BEFORE ? {$lt: timestamp} : {$gt: timestamp};

        return models.Post.find({
                createdAt: query
            })
            .limit(pageSize)
            .sort({'createdAt': -1})
            .then((posts: [IPostModel]) => {
                const postIds: Schema.Types.ObjectId[] = posts.map((post: IPostModel) => post._id);
                const currentUserReactionsPromise = UserReactionService.getThisUserReactionForTargetIds(postIds, user);
                const commentCountsPromise = CommentService.getCommentCount(postIds);
                const aggregatedUserReactionsPromise =  UserReactionService.getAggregatedUserReactionsForTargetIds(postIds);
                return Promise.all([currentUserReactionsPromise, commentCountsPromise, aggregatedUserReactionsPromise])
                    .then(values => {
                        //TODO: this values array could be an interfaced array.
                        const currentUserReactions = values[0];
                        const commentCounts = values[1];
                        const postReactions = values[2];
                        return posts.map((post: IPostModel) => {
                                return Object.assign({},
                                    post.toObject(),
                                    {userReaction: postReactions[post._id] ? postReactions[post._id] : UserReactionConstructor(0, 0, 0, 0, 0)},
                                    {currentUserReaction: currentUserReactions[post._id] ? currentUserReactions[post._id] : null},
                                    {commentCount: commentCounts[post._id]}
                                ) as AMPost;
                            }
                        );
                    });
            });
    }
}



