import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {PostService} from "../services/postService";

export class PostApi extends BaseApi {

    public static createPost(request: Hapi.Request, reply: Hapi.IReply) {
        const {payload: {url, type}} = request;
        const user: IUserModel = request.auth.credentials;
    }
}
