import { ActionType } from '../constants/enums/actionType';
import { IUserModel } from './../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {Schema, Types} from 'mongoose';
import {IUserReactionModel} from '../models/schemas/userReaction';
import {ReactionType} from '../constants/enums/reactionType';
import {TargetType} from '../constants/enums/targetType';
import { IPostReaction } from "../interfaces/iPostReaction";

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

    public static getAggregatedUserReactionsForPostIds(postIds: Types.ObjectId[]): Promise<any> {
            return models.UserReaction.aggregate([
                {
                    $match: {
                        targetId: {$in: postIds}
                    }
                },
                {
                    $group: {
                        _id: "targetId",

                    }
                }
            ]).exec();
    }

//
//     var getBalance = function(accountId) {
//     AccountModel.aggregate([
//         { $match: {
//             _id: accountId
//         }},
//         { $unwind: "$records" },
//         { $group: {
//             _id: "$_id",
//             balance: { $sum: "$records.amount"  }
//         }}
//     ], function (err, result) {
//         if (err) {
//             console.log(err);
//             return;
//         }
//         console.log(result);
//     });
// }


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