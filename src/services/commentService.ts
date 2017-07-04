import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {Schema} from 'mongoose';
import {UserReactionService}​​ from './userReactionService';

export class CommentService extends BaseService {

public static getComments(args: {postId: string}): Promise<any> {
    return new Promise((resolve, reject) => {
            const {postId} = args;
            models.Comment.find({
                postId: postId
            }).then((comments: [ICommentModel]) => {
                // check if there is any comment
                // if there is then iterate through all comments and check if the user has liked it.
                if (comments && comments.length > 0) {
                    // let response = []; // comeup with schema of response also
                     return resolve(Promise.all(comments.map((comment: ICommentModel) => {
                        return UserReactionService​​.getUserReaction({
                                'targetId': comment._id,
                                'userId': "595656da98a0021cd9ee3f43" // hard-coded userId, TODO:
                            }).then((userReaction: IUserReactionModel) => {
                                return Object.assign({}, comment.toObject(), {"userReaction": userReaction.reaction});
                            }).catch((err) => {
                                console.log(err);
                            });
                    })));
                } else {
                    resolve([]); // no comment found
                }
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}