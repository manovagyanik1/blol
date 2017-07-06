import {Schema, Types} from "mongoose";
import {PostType} from "../constants/enums/postType";
import {AMUserReactionValue} from "./AMUserReactionValue";
import {ReactionType} from "../constants/enums/reactionType";
export interface AMPost {
    _id: Types.ObjectId;
    createdAt: Schema.Types.Date;
    url: String;
    type: PostType;
    userReaction: AMUserReactionValue;
    currentUserReaction?: ReactionType;
}
