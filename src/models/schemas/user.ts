import { Document, Schema, Model, model} from "mongoose";
import { IUser } from "../interfaces/user";

export interface IUserModel extends IUser, Document {
}

export const UserSchema: Schema = new Schema({
    facebookId: String,
    email: String,
    fullName: String,
    nickName: String,
    profilePicUrl: String,
    isFbUser: {type:Schema.Types.Boolean, default: false},
}, { timestamps: true });
UserSchema.index({facebookId:1}, {unique: true});
UserSchema.index({isFbUser:1});




export const User: Model<IUserModel> = model<IUserModel>("User", UserSchema);