import {Schema, Types} from "mongoose";
import {PostType} from "../constants/enums/postType";
import {AMUserReactionValue} from "./AMUserReactionValue";
import {ReactionType} from "../constants/enums/reactionType";
import {AMPostContent} from "./AMPostContent";
export interface AMPost {
    _id: Types.ObjectId;
    createdAt: Schema.Types.Date;
    data: AMPostContent;
    type: PostType;
    userReactions: AMUserReactionValue;
    commentCount: number;
    currentUserReaction?: ReactionType;
}
