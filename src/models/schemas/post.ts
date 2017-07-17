import { Document, Schema, Model, model} from "mongoose";
import { IPost } from "../interfaces/post";

export interface IPostModel extends IPost, Document {
}

export const PostSchema: Schema = new Schema({
  data: Schema.Types.Mixed,
  type: String,
}, { timestamps: true });
PostSchema.index({createdAt:1});


export const Post: Model<IPostModel> = model<IPostModel>("Post", PostSchema);