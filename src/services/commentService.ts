import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {Schema} from 'mongoose';
import {UserReactionService}​​ from './userReactionService';

export class CommentService extends BaseService {

public static getComments(args: {postId: string}): Promise<any> {
    return models.Comment.find({
        postId: args.postId
    }).then((comments: [ICommentModel]) => {
        if (comments && comments.length > 0) {
            return Promise.all(comments.map((comment: ICommentModel) => {
                return UserReactionService​​.getUserReaction({
                    'targetId': comment._id,
                    'userId': "595656da98a0021cd9ee3f43" // hard-coded userId, TODO:
                }).then((userReaction: IUserReactionModel) => {
                    const commentReaction = userReaction && userReaction.reaction ? userReaction.reaction : null;
                    return Object.assign({}, comment.toObject(), {"userReaction": commentReaction});
                }).catch((err) => {
                    console.log(err);
                });
            }));
        } else {
            return []; // no comment found
        }
    });
}
}