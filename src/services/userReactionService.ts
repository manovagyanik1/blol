import { ActionType } from '../constants/enums/actionType';
import { IUserModel } from './../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {Schema, Types} from 'mongoose';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {ReactionType} from '../constants/enums/reactionType';
import {TargetType} from '../constants/enums/targetType';
import { IPostReaction } from "../interfaces/iPostReaction";
import {IUser} from "../models/interfaces/user";

export class UserReactionService extends BaseService {

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

    public static getThisUserReactionForTargetIds(targetIds: Types.ObjectId[], user:IUserModel): Promise<any> {
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
                return userReactions.reduce((targetIdToUserReaction, userReaction: IUserReactionModel) => {
                    return targetIdToUserReaction[userReaction['targetId']] = userReaction;
                }, {});
            }) : {};
    }

    public static getAggregatedUserReactionsForTargetIds(targetIds: Types.ObjectId[]): Promise<any> {
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
                        "HAHA": {
                            $sum: {
                                $cond : { if: { $eq: [ '$reaction', 'HAHA' ] }, then: '$reactionCount', else: 0 }
                            }
                        },
                        "CLAP": {
                            $sum: {
                                $cond : { if: { $eq: [ '$reaction', 'CLAP' ] }, then: '$reactionCount', else: 0 }
                            }
                        },
                        "WOW": {
                            $sum: {
                                $cond : { if: { $eq: [ '$reaction', 'WOW' ] }, then: '$reactionCount', else: 0 }
                            }
                        },
                        "LIKE": {
                            $sum: {
                                $cond : { if: { $eq: [ '$reaction', 'LIKE' ] }, then: '$reactionCount', else: 0 }
                            }
                        }
                    }
                },
            ])
            .exec()
            .then((userReactions: Object[] ) =>
                userReactions.reduce((pre, userReaction:IPostReaction) => {
                    const {CLAP, WOW, HAHA, LOL} = userReaction;
                    pre[userReaction['targetId']] = {CLAP, WOW, HAHA, LOL};
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