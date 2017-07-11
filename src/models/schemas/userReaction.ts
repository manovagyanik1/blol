import { Document, Schema, Model, model} from "mongoose";
import { IUserReaction } from "../interfaces/userReaction";

export interface IUserReactionModel extends IUserReaction, Document {
}

export var UserReactionSchema: Schema = new Schema({
  targetId: Schema.Types.ObjectId,
  userId: Schema.Types.ObjectId,
  reaction: String,
  type: String,
}, { timestamps: true });
UserReactionSchema.index({targetId:1, reaction:1});
UserReactionSchema.index({targetId:1, UserId:1}, {unique:true});



export const UserReaction: Model<IUserReactionModel> = model<IUserReactionModel>("UserReaction", UserReactionSchema);