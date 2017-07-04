import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import {UserReactionService} from './userReactionService';
import { models } from '../models';
import { IPostModel } from "../models/schemas/post";
import { IUserReactionModel } from "../models/schemas/userReaction";
import { ICommentModel } from "../models/schemas/comment";
export class FeedService extends BaseService {

    public static getFeed(args: {user: IUserModel}): Promise<any> {
        const {user} = args;
        return models.Post.find({}).
        then((feeds: [IPostModel]) => {
            if (feeds && feeds.length > 0) {
                return Promise.all(feeds.map((feed: IPostModel) => {
                    return UserReactionService.getUserReaction({
                        'targetId': feed._id,
                        'userId': user._id,
                    }).then((userReaction: IUserReactionModel) => {
                        const postReaction = userReaction && userReaction.reaction ? userReaction.reaction : null;
                        return Object.assign({}, feed.toObject(), {"userReaction": postReaction});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }));
            } else {
                return [];
            }
        });
    }
}