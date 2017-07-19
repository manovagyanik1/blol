import {PostType} from "../../constants/enums/postType";
import {AMPostContent} from "../../apiinterfaces/AMPostContent";
import {IReaction} from "../../interfaces/iReaction";

export interface IPost {
    data: AMPostContent;
    type: PostType;
    reactions?: IReaction;
}