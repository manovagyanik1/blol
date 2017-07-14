import {Schema, Types} from "mongoose";
import {FbPostStatus} from "../../constants/enums/fbPostStatus";
import {IFbPost} from "../../interfaces/fbposts/iFbPost";
export interface IFbPostPullerData {
    postId: string;
    jsonData: IFbPost;
    postCreationTime: Schema.Types.Date;
    status: FbPostStatus;
}