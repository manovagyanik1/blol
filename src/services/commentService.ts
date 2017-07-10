import { BeforeAfter } from '../constants/enums/beforeAfter';
import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {UserReactionService} from './userReactionService';
import {AMComment} from "../apiinterfaces/AMComment";
import {UserService} from "./userService";
import {UserReactionConstructor} from "../apiinterfaces/AMUserReactionValue";

export class CommentService extends BaseService {

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
                            return Object.assign({}, comment.toObject(),
                                user ? {currentUserReaction: tCommentIdToThisUserReaction[user._id]} : {},
                                {userDetails: tUserIdToUserInfo[comment.userId]},
                                {reaction: tCommentIdToUserReactions[comment._id] ?  tCommentIdToUserReactions[comment._id] : UserReactionConstructor(0, 0, 0, 0, 0)}) as AMComment;
                        });


                    }
                );
            } else {
                return [];
            }
        });
    }

    public static postComment(args: {postId: string, text: string, user: IUserModel}): Promise<any> {
        const {postId, text, user} = args;
        return new models.Comment({
            text,
            postId,
            userId: user._id,
            displayName: user.fullName // TODO: change to nickname
        }).save();
    }
}