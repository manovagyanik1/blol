import {PostType} from "../../constants/enums/postType";
import {AMPostContent} from "../../apiinterfaces/AMPostContent";
import {IPostReaction} from "../../interfaces/iPostReaction";

export interface IPost {
    data: AMPostContent;
    type: PostType;
}