import {PostType} from "../../constants/enums/postType";
import {AMPostContent} from "../../apiinterfaces/AMPostContent";
import {IReactionsCount} from "../../interfaces/iReactionsCount";

export interface IPost {
    data: AMPostContent;
    type: PostType;
    reactions?: IReactionsCount;
}