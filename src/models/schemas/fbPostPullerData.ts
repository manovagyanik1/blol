import {Document, Schema, Model, model, Types} from "mongoose";
import { IFbPostPullerData } from "../interfaces/iFbPostPullerData";

export interface IFbPostPullerDataModel extends IFbPostPullerData, Document {
}

export var FbPostPullerSchema: Schema = new Schema({
    postId: String,
    jsonData: Schema.Types.Mixed,
    postCreationTime: Schema.Types.Date,
    status: String,
}, { timestamps: true });

FbPostPullerSchema.index({postId:1}, {unique: true});
FbPostPullerSchema.index({createdAt:1});

export const FbPostPullerData: Model<IFbPostPullerDataModel> = model<IFbPostPullerDataModel>("FbPostPullerData", FbPostPullerSchema);