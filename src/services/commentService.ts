import { BeforeAfter } from '../constants/enums/beforeAfter';
import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {Schema} from 'mongoose';
import {UserReactionService} from './userReactionService';

export class CommentService extends BaseService {

    public static getComments(args: {postId: string, user: IUserModel, timestamp: number, type: BeforeAfter, pageSize: number}): Promise<any> {
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
                return Promise.all(comments.map((comment: ICommentModel) => {
                    return UserReactionService.getUserReaction({
                        targetId: comment._id,
                        user
                    }).then((userReaction: IUserReactionModel) => {
                        const commentReaction = userReaction && userReaction.reaction ? userReaction.reaction : null;
                        return Object.assign({}, comment.toObject(), {"userReaction": commentReaction});
                    });
                }));
            } else {
                return []; // no comment found
            }
        });
    }
}