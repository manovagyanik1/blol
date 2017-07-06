import {Types} from "mongoose";

export interface AMUser {
    _id: Types.ObjectId;
    nickName: string;
    fullName: string;
    profilePicUrl: string;
}