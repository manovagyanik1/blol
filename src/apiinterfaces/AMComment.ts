import {AMUserReactionValue} from "./AMUserReactionValue";
import {ReactionType} from "../constants/enums/reactionType";
import {Schema, Types} from "mongoose";
import {AMUser} from "./AMUser";

export interface AMComment {
    _id: Types.ObjectId;
    createdAt: Schema.Types.Date;
    text: string;
    userDetails: AMUser;
    reactions: AMUserReactionValue;
    currentUserReaction?: ReactionType;
}