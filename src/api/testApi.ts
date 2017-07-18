import * as Hapi from 'hapi';
import BaseApi from "./baseApi";
import {FbPostPullerService} from "../services/fbPostPullerService";

export class TestApi extends BaseApi {


    public static populateCommentsInFbPostPullerData(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all([FbPostPullerService.fetchAllCommentsFromSarcasmAndUpdateFbPostPullerData()]).then((data) => reply(data));
    }

    public static populateFbPostPullerData(request: Hapi.Request, reply: Hapi.IReply) {
        Promise.all([FbPostPullerService.fetchAllPostsFromFbPage()]).then((data) => reply(data));
    }

}