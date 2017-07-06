import {Types} from "mongoose";
import {AMUserReactionValue} from "./AMUserReactionValue";
import {IUser} from "../models/interfaces/user";
import {ReactionType} from "../constants/enums/reactionType";

export interface AMComment {
    _id: Types.ObjectId;
    text: string;
    user: IUser;
    reaction: AMUserReactionValue;
    currentUserReaction?: ReactionType;
}