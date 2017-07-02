import BaseService from "./baseService";
import { models } from '../models';
import {Schema} from 'mongoose';
export default class UserReactionService​​ extends BaseService {

// needs to be paginated
public static getUserReaction(args: {
        targetId: Schema.Types.ObjectId,
        userId: String }): Promise<any> {
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
}