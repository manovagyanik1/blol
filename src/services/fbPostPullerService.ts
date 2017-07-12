import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import { fbPromisify } from 'fb_promise';
import fb_promise from 'fb_promise';
import GenUtils from "../utils/genUtils";
import {resolve, reject} from "bluebird";
import {IFbPage} from "../interfaces/iFbPage";
import FBUtils from "../utils/fbUtils";

var format = require('string-format');

const config = container.get<IServerConfig>("IServerConfig");
const FB = require('fb');
const URL_FOR_FETCHING_POSTS:string = 'https://graph.facebook.com/v2.9/{0}/posts?access_token={1}&limit=100';
const URL_FOR_FETCHING_LIKES:string = 'https://graph.facebook.com/v2.9/{0}/likes?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_ATTACHMENTS:string = 'https://graph.facebook.com/v2.9/{0}/attachments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_COMMENTS:string = 'https://graph.facebook.com/v2.9/{0}/comments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_SHARES:string = 'https://graph.facebook.com/v2.9/{0}/shares?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_REACTIONS:string = 'https://graph.facebook.com/v2.9/{0}/reactions?summary=true&access_token={1}&limit=100';

export class FbPostPullerService extends BaseService {

    public static mainCron() {
        // get the list of pages obj;
        const pages: IFbPage[] = config.get("fbPostPuller");
        FBUtils.getAccessToken().then((accessToken: string) => {
            pages.map(page => {
                const urlForListOfPosts = format(URL_FOR_FETCHING_POSTS, page.pageId, accessToken);
                fetch(urlForListOfPosts).then(
                    (result) => {
                        const {data} = result;
                        data.map(postObject => {

                        });
                    }
                );
            });
        });

    }

    public static getFbPostResults(postObject, accessToken) {
        const {create_time, id} = postObject;

        const likePromise = FbPostPullerService.getFetchPromise(URL_FOR_FETCHING_LIKES, id, accessToken);

        const reactionsPromise = FbPostPullerService.getFetchPromise(URL_FOR_FETCHING_REACTIONS, id, accessToken);

        const commentsPromise = FbPostPullerService.getFetchPromise(URL_FOR_FETCHING_COMMENTS, id, accessToken);

        const attachmentsPromise = FbPostPullerService.getFetchPromise(URL_FOR_FETCHING_ATTACHMENTS, id, accessToken);

        const sharesUrl = FbPostPullerService.getFetchPromise(URL_FOR_FETCHING_SHARES, id, accessToken);

        return Promise.all([
            likePromise,
            reactionsPromise,
            commentsPromise,
            attachmentsPromise,
            sharesUrl,
        ]).then(values => {
            return {
                likes: values[0],
                reactions: values[1],
                comments: values[2],
                attachments: values[3],
                shares: values[4]
            };
        });


    }

    private static getFetchPromise(formatUrlString:string, postId:string, accessToken:string): Promise<Object> {
        const url = format(formatUrlString, postId, accessToken);
        return fetch(url);
    }


}