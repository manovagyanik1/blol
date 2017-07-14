import {PostType} from "../../constants/enums/postType";
import {AMPostContent} from "../../apiinterfaces/AMPostContent";

export interface IPost {
    data: AMPostContent;
    type: PostType;
}