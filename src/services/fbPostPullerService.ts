import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import {IFbPage} from "../interfaces/iFbPage";
import FBUtils from "../utils/fbUtils";
import {IFbData} from "../interfaces/iFbData";
import {IFbPost} from "../models/interfaces/iFbPost";
import {FbPostStatus} from "../constants/enums/fbPostStatus";
import {IFbPostPullerData} from "../models/interfaces/iFbPostPullerData";
import {models} from "../models/index";

const format = require('string-format');
const fetch = require('node-fetch');


const config = container.get<IServerConfig>("IServerConfig");
const FB = require('fb');
const URL_FOR_FETCHING_POSTS:string = 'https://graph.facebook.com/v2.9/{0}/posts?access_token={1}&limit=100';
const URL_FOR_FETCHING_LIKES:string = 'https://graph.facebook.com/v2.9/{0}/likes?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_ATTACHMENTS:string = 'https://graph.facebook.com/v2.9/{0}/attachments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_COMMENTS:string = 'https://graph.facebook.com/v2.9/{0}/comments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_SHARES:string = 'https://graph.facebook.com/v2.9/{0}/sharedposts?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_REACTIONS:string = 'https://graph.facebook.com/v2.9/{0}/reactions?summary=true&access_token={1}&limit=100';

export class FbPostPullerService extends BaseService {

    public static mainCron(): Promise<any> {
        // get the list of pages obj;
        const pages: IFbPage[] = config.get("fbPostPuller");
        return FBUtils.getAccessToken().then((accessToken: string) => {
            return pages.map(page => {
                const urlForListOfPosts = format(URL_FOR_FETCHING_POSTS, page.pageId, accessToken);
                return fetch(urlForListOfPosts)
                    .then(response => {
                        return response.json();
                    })
                    .then((result: IFbData) => {
                        const {data} = result;
                        return Promise.all(data.map(postObject => FbPostPullerService.getFbPostResults({postObject, accessToken})));
                    })
                    .then(postResults => {
                        // List of objects {id, likes, comments ... }
                        FbPostPullerService.saveFbPost(postResults);
                    });
            });
        });

    }

    public static saveFbPost(posts: IFbPost[]) {
        posts.map(post => {
            return new models.FbPostPullerData({
                postId: post.postId,
                jsonData: JSON.stringify(post),
                postCreationTime: post.postCreationTime,
                status: FbPostStatus.PENDING
            } as IFbPostPullerData).save();
        });
    }

    public static getFbPostResults({postObject, accessToken}) {
        const {created_time, id} = postObject;

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
        ])
        .then(values => values.map(value => value.json()))
        .then(values => Promise.all(values))
        .then((values) => {
            return {
                postId: id,
                likes: values[0],
                reactions: values[1],
                comments: values[2],
                attachments: values[3],
                shares: values[4],
                postCreationTime: created_time,
            };
        });


    }

    private static getFetchPromise(formatUrlString:string, postId:string, accessToken:string): Promise<Response> {
        const url = format(formatUrlString, postId, accessToken);
        return fetch(url);
    }


}