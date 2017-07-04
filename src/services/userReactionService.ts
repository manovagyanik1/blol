import BaseService from "./baseService";
import { models } from '../models';
import {Schema} from 'mongoose';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {ReactionType} from '../constants/enums/reactionType';
import {TargetType} from '../constants/enums/targetType';

export class UserReactionService​​ extends BaseService {
    // needs to be paginated
    public static getUserReaction(
        args: {
            targetId: Schema.Types.ObjectId,
            userId: String }):
            Promise<any> {
        return new Promise((resolve, reject) => {
                const {targetId, userId} = args;
                models.UserReaction.findOne({
                    targetId,
                    userId
                }).then((data) => {
                    resolve(data);
                }).catch((error) => {
                    reject(error.message);
                });
            });
    }

    public static react(args: {
        targetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        reaction: ReactionType,
        type: TargetType}):
            Promise<any> {

        const {targetId, userId, reaction, type} = args;
        return new models.UserReaction({
            targetId,
            userId,
            reaction,
            type
        }).save();
    }
}