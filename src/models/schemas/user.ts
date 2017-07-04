import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
}

export const UserSchema: Schema = new Schema({
  facebookId: Number,
  email: String,
  fullName: String,
  nickName: String,
  profilePicUrl: String,
}, { timestamps: true });


export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);