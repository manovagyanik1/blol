import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
}

export var UserSchema: Schema = new Schema({
  email: String,
  fullName: String,
  nickName: String,
  profilePicUrl: String,
}, { timestamps: true });


export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);