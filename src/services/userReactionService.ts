import BaseService from "./baseService";
import { models } from '../models';
import {Schema} from 'mongoose';

export class UserReactionService​​ extends BaseService {
// needs to be paginated
    public static getUserReaction(
        args: {
            targetId: Schema.Types.ObjectId,
            userId: String }):
            Promise<any> {
        return new Promise((resolve, reject) => {
                const {targetId, userId} = args;
                models.userReaction.findOne({
                    targetId,
                    userId
                }).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error.message);
                });
            });
    }

    public static react(
        targetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        reaction: models.userReaction.reaction,
        type: IUserReaction.Type):
            Promise<any> {

        var UserReaction = models.userReaction;
        var newUserReaction = UserReaction(
            targetId,
            userId,
            reaction,
            type

        );
        newUserReaction.save();
    }
}