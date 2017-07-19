import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FbPostPullerService} from "../services/fbPostPullerService";
import GenUtils from "../utils/genUtils";

export class TestApi extends BaseApi {


    public static populateCommentsInFbPostPullerData(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all([FbPostPullerService.fetchNCommentsFromSarcasmAndUpdateFbPostPullerData(2500)]).then((data) => reply(data));
    }

    public static populateFbPostPullerData(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all([FbPostPullerService.fetchAllPostsFromFbPages()]).then((data) => reply(data));
    }

}