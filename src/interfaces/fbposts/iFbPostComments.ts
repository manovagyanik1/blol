import {IFbPostCommentedUser} from "./iFbPostCommentedUser";

export interface IFbPostComment {
    from: IFbPostCommentedUser;
    message: string;
}