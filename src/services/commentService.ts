import { BeforeAfter } from '../constants/enums/beforeAfter';
import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {UserReactionService} from './userReactionService';
import {AMComment} from "../apiinterfaces/AMComment";
import {UserService} from "./userService";
import {UserReactionConstructor, addReactionsCount} from "../apiinterfaces/AMUserReactionValue";
import {IComment} from "../models/interfaces/comment";
import {Schema} from "mongoose";
import {IPostModel} from "../models/schemas/post";

export class CommentService extends BaseService {

    public static getCommentCount(postIds: Schema.Types.ObjectId[]): Promise<any> {
       return models.Comment.aggregate([
           {
               $match: {
                   postId: {$in: postIds}
               }
           },
           {
               $group: {
                   _id: {
                       postId: "$postId",
                   },
                   "postId": {$first: "$postId"},
                   "commentCount": {$sum: 1},
               }
           }
           ]
       ).exec()
           .then((postIdAndCommentCountPairs: Object[]) => {
               return postIdAndCommentCountPairs.reduce((pre, postIdAndCommentCountPair) => {
                   pre[postIdAndCommentCountPair['postId']] = postIdAndCommentCountPair['commentCount'];
                   return pre;
                   }
                   , {});
        });
    }

    public static getComments(args: {postId: string, user: IUserModel, timestamp: number, type: BeforeAfter, pageSize: number}): Promise<AMComment[]> {
        const {user, postId, timestamp, type, pageSize} = args;
        const query = type === BeforeAfter.BEFORE ? { $lt: timestamp} : {$gt: timestamp};
        return models.Comment.find({
            postId,
            createdAt: query
        })
        .limit(pageSize)
        .sort({'createdAt': -1}) // descending sorting
        .then((comments: [ICommentModel]) => {
            if (comments && comments.length > 0) {
                const userIds = comments.map(comment => comment.userId);
                const commentIds = comments.map(comment => comment._id);
                const commentIdToThisUserReaction = UserReactionService.getThisUserReactionForTargetIds(commentIds, user);
                const commentIdToUserReactions = UserReactionService.getAggregatedUserReactionsForTargetIds(commentIds);
                const userIdToUserInfo = UserService.getForIds(userIds).then(
                    (userInfo: IUserModel[]) => {
                        return userInfo.reduce(
                            (pre, cur:IUserModel) => {
                                pre[cur._id] = cur;
                                return pre;
                                }, {});
                    }
                );
                return Promise.all([commentIdToThisUserReaction, userIdToUserInfo, commentIdToUserReactions]).then(
                    values => {
                        const tCommentIdToThisUserReaction = values[0];
                        const tUserIdToUserInfo = values[1];
                        const tCommentIdToUserReactions = values[2];
                        return comments.map((comment:ICommentModel) => {
                            const currentUserReaction = user ? {currentUserReaction: tCommentIdToThisUserReaction[comment._id]} : {};
                            return Object.assign({}, comment.toObject(),
                                currentUserReaction,
                                {userDetails: tUserIdToUserInfo[comment.userId.toString()]},
                                {userReactions:
                                    addReactionsCount(tCommentIdToUserReactions[comment._id] ?  tCommentIdToUserReactions[comment._id] : UserReactionConstructor(0, 0),
                                    comment.reactions ? comment.reactions : UserReactionConstructor(0, 0)
                                    )
                                }) as AMComment;
                        });


                    }
                );
            } else {
                return [];
            }
        });
    }

    public static postComment(comment: IComment): Promise<AMComment> {
        return new models.Comment(comment).save()
            .then((data: ICommentModel) => {
                return UserService.getForIds([data.userId])
                    .then((results: IUserModel[]) => {
                    return Object.assign({},
                        data.toObject(),
                        {userDetails: results[0]},
                        {userReactions: UserReactionConstructor(0, 0)},
                        {currentUserReaction: null}
                    ) as AMComment;
                });
            });

    }
}