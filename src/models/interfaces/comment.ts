import {Schema} from "mongoose";
export interface IComment {
  text: string;
  userId: Schema.Types.ObjectId;
  postId: Schema.Types.ObjectId;
}