import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {PostType} from "../constants/enums/postType";
import {IPost} from "../models/interfaces/post";
import {save} from "nconf";

export class PostService extends BaseService {

    public static createPost(post: IPost): Promise<any> {
        return new models.Post({
            data:post.data,
            type:post.type,
        }).save();
    }
}