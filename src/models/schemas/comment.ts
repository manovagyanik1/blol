import { Document, Schema, Model, model} from "mongoose";
import { IComment } from "../interfaces/comment";

export interface ICommentModel extends IComment, Document {
}

export var CommentSchema: Schema = new Schema({
  text: String,
  userId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
}, { timestamps: true });


export const User: Model<ICommentModel> = model<ICommentModel>("Comment", CommentSchema);