import { Document, Schema, Model, model} from "mongoose";
import { IPost } from "../interfaces/post";

export interface IPostModel extends IPost, Document {
}

export var PostSchema: Schema = new Schema({
  url: String,
  type: String,
}, { timestamps: true });


export const User: Model<IPostModel> = model<IPostModel>("Post", PostSchema);