import BaseService from "./baseService";
import { models } from '../models';
import {ICommentModel} from '../models/schemas/comment';
import {Schema} from 'mongoose';
import UserReactionService​​ from './userReactionService';
export class CommentService extends BaseService {

// needs to be paginated
public static getComment(args: {postId: string}): Promise<any> {
    return new Promise((resolve, reject) => {
            const {postId} = args;
            models.comment.find({
                postId
            }).then((comments: [ICommentModel]) => {
                // check if there is any comment
                // if there is then iterate through all comments and check if the user has liked it.
                for ( const index in comments) {
                    if (comments.hasOwnProperty(index)) {
                        const comment: ICommentModel = comments[index];
                        UserReactionService​​.getUserReaction({
                            'targetId': comment._id,
                            'userId': "5959157263d33e7251a7d557"
                        });
                    }
                }
                resolve(comments);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}