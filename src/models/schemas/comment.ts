import { Document, Schema, Model, model} from "mongoose";
import { IComment } from "../interfaces/comment";

export interface ICommentModel extends IComment, Document {
}

export const CommentSchema: Schema = new Schema({
  text: String,
  userId: Schema.Types.ObjectId,
  postId: Schema.Types.ObjectId,
  numberOfLikes: Schema.Types.Number,
}, { timestamps: true });

CommentSchema.index({postId:1, createdAt:1});

export const Comment: Model<ICommentModel> = model<ICommentModel>("Comment", CommentSchema);