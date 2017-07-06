import {Schema, Types} from "mongoose";
import {PostType} from "../constants/enums/postType";
import {IPostUserReaction} from "./iPostUserReaction";
export interface IPost {
    _id: Types.ObjectId;
    createdAt: Schema.Types.Date;
    url: String;
    type: PostType;
    userReaction: IPostUserReaction;
}
