import {Schema} from "mongoose";
import {IReactionsCount} from "../../interfaces/iReactionsCount";
export interface IComment {
    text: string;
    userId: Schema.Types.ObjectId;
    postId: Schema.Types.ObjectId;
    reactions?: IReactionsCount;
}