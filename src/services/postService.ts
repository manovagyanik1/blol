import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {PostType} from "../constants/enums/postType";
import {IPost} from "../models/interfaces/post";
import {save} from "nconf";
import {IPostModel} from "../models/schemas/post";
import {ICommentModel} from "../models/schemas/comment";

export class PostService extends BaseService {

    public static createPost(post: IPost): Promise<IPostModel> {
        return new models.Post(post).save();
    }
}