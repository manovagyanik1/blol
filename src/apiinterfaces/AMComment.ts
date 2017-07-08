import {AMUserReactionValue} from "./AMUserReactionValue";
import {ReactionType} from "../constants/enums/reactionType";
import {Schema, Types} from "mongoose";

export interface AMComment {
    _id: Types.ObjectId;
    createdAt: Schema.Types.Date;
    text: string;
    userId: string;
    displayName: string;
    reaction: AMUserReactionValue;
    currentUserReaction?: ReactionType;
}