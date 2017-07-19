import {Schema} from "mongoose";
import {IReaction} from "../../interfaces/iReaction";
export interface IComment {
    text: string;
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    reactions?: IReaction;
}