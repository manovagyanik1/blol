import { ActionType } from '../constants/enums/actionType';
import { IUserModel } from './../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {Schema, Types} from 'mongoose';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {ReactionType} from '../constants/enums/reactionType';
import {TargetType} from '../constants/enums/targetType';
import { IReactionsCount } from "../interfaces/iReactionsCount";
import {IUser} from "../models/interfaces/user";

export class UserReactionService extends BaseService {

    public static getUserReaction( args: {
            targetId: Schema.Types.ObjectId,
            user: IUserModel }) : Promise<any> {
                const {targetId, user} = args;
                const query = user ? {
                    targetId,
                    userId: user._id
                } : { targetId};
                return models.UserReaction.findOne(query).exec();
            }

    public static getThisUserReactionForTargetIds(targetIds: Schema.Types.ObjectId[], user:IUserModel): Promise<any> {
        return user ?
        models.UserReaction.aggregate([
            {
                $match: {
                    targetId: {$in: targetIds},
                    userId: user._id
                }
            },
        ]).exec()
            .then((userReactions: Object[]) => {
                const targetIdToThisUserReaction = targetIds.reduce((accumulator, targetId:Schema.Types.ObjectId) => {
                    accumulator[targetId.toString()] = null;
                    return accumulator;
                }, {});
                return userReactions.reduce((targetIdToUserReaction, userReaction: IUserReactionModel) => {
                    targetIdToUserReaction[userReaction['targetId'].toString()] = userReaction.reaction;
                    return targetIdToUserReaction;
                }, targetIdToThisUserReaction);
            }) : {};
    }

    public static getAggregatedUserReactionsForTargetIds(targetIds: Schema.Types.ObjectId[]): Promise<any> {
        return models.UserReaction.aggregate([
                {
                    $match: {
                        targetId: {$in: targetIds}
                    }
                },
                {
                    $group: {
                        _id: {
                            targetId: "$targetId",
                            "reaction": "$reaction",
                        },
                        "reactionCount" : { $sum: 1 },
                        "targetId": {$first: "$targetId" },
                        "reaction": {$first: "$reaction" },
                    }
                },
                {
                    $group: {
                        _id: {
                            "targetId": "$targetId",
                        },
                        "targetId": {$first: "$targetId"},
                        "LOL": {
                                $sum: {
                                    $cond : { if: { $eq: [ '$reaction', 'LOL' ] }, then: '$reactionCount', else: 0 }
                                }
                        },
                        "POOP": {
                            $sum: {
                                $cond: {if: {$eq: ['$reaction', 'POOP']}, then: '$reactionCount', else: 0}
                            }
                        }
                    }
                },
            ])
            .exec()
            .then((userReactions: Object[] ) =>
                userReactions.reduce((pre, userReaction:IReactionsCount) => {
                    const {LOL, POOP} = userReaction;
                    pre[userReaction['targetId']] = {LOL, POOP};
                    return pre;
                }, {})
            );
    }

    public static insertReaction(args: {
        targetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId,
        reaction: ReactionType,
        type: TargetType}):
            Promise<any> {

        const {targetId, userId, reaction, type} = args;
        return Promise.all([UserReactionService.deleteReaction(args)])
            .then(
                () => {
                    return new models.UserReaction({
                        targetId,
                        userId,
                        reaction,
                        type
                    }).save();
                }
            );
    }

    public static deleteReaction(args: {
        targetId: Schema.Types.ObjectId,
        userId: Schema.Types.ObjectId}):
            Promise<any> {

        const {targetId, userId} = args;
        return models.UserReaction.findOne({
            targetId,
            userId
        })
        .remove()
        .exec();
    }
}