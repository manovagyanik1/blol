import { PaginationWrapper } from './../pagination/paginationWrapper';
import { IUserModel } from '../models/schemas/user';
import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FeedService} from "../services/feedService";
import {BeforeAfter} from "../constants/enums/beforeAfter";
import {FbPostPullerService} from "../services/fbPostPullerService";
import FBUtils from "../utils/fbUtils";
import ImageUtils from "../utils/imageUtils";

export class TestApi extends BaseApi {


    public static runFacebookPostPullerCron(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all(FbPostPullerService.mainCron()).then((data) => reply(data));
    }

    public static testImage(request: Hapi.Request, reply: Hapi.IReply) {
        ImageUtils.test();
    }
}