import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {Schema} from 'mongoose';
import UserReactionService​​ from './userReactionService';
export class CommentService extends BaseService {

// needs to be paginated
public static getComment(args: {postId: string}): Promise<any> {
    return new Promise((resolve, reject) => {
            const {postId} = args;
            models.comment.find({
                postId: postId
            }).then((comments: [ICommentModel]) => {
                // check if there is any comment
                // if there is then iterate through all comments and check if the user has liked it.
                for ( const index in comments) {
                    if (comments.hasOwnProperty(index)) {
                        const comment: ICommentModel = comments[index];
                        UserReactionService​​.getUserReaction({
                            'targetId': comment._id,
                            'userId': "595656da98a0021cd9ee3f43"
                        }).then((userReaction: IUserReactionModel) => {
                            let response = comment;
                            response["serReaction"] = userReaction.reaction;
                            let r = [response];
                            resolve(r);
                        });
                    }
                }
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}