import { IUserModel } from '../models/schemas/user';
import BaseService from "./baseService";
import { models } from '../models';
import {PostType} from "../constants/enums/postType";

export class PostService extends BaseService {

    public static createPost(args: {url: string, type: PostType, user: IUserModel}): Promise<any> {
        const {url, type, user} = args;
        // verify the user
        return new models.Post({
            url,
            type
        }).save();
    }
}