import { ActionType } from '../constants/enums/actionType';
import { IUserModel } from './../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {Schema} from 'mongoose';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {ReactionType} from '../constants/enums/reactionType';
import {TargetType} from '../constants/enums/targetType';
import { IPostReactions } from "../interfaces/iPostReaction";

export class UserReactionService extends BaseService {
    // needs to be paginated
    public static getUserReaction( args: {
            targetId: Schema.Types.ObjectId,
            user: IUserModel }) : Promise<any> {
                const {targetId, user} = args;
                const query = user ? {
                    targetId,
                    userId: user._id
                } : { targetId}
                return models.UserReaction.findOne(query).exec();
            }

    public static getAggregatedUserReactionsForPostId: IPostReaction {

    }

    public static insertReaction(args: {
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

    public static deleteReaction(args: {
        targetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        reaction: ReactionType,
        type: TargetType}):
            Promise<any> {

        const {targetId, userId, reaction, type} = args;
        return models.UserReaction.findOne({
            targetId,
            userId,
            reaction,
            type
        })
        .remove()
        .exec();
    }
}