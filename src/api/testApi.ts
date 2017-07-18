import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FbPostPullerService} from "../services/fbPostPullerService";
import GenUtils from "../utils/genUtils";

export class TestApi extends BaseApi {
    public static runFacebookPostPullerCron(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all(FbPostPullerService.fetchAllPostsFromFbPage()).then((data) => reply(data));
    }
}