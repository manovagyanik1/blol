import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import {IFbPage} from "../interfaces/iFbPage";
import FBUtils from "../utils/fbUtils";
import {IFbData} from "../interfaces/fbposts/iFbData";
import {IFbPost} from "../interfaces/fbposts/iFbPost";
import {FbPostStatus} from "../constants/enums/fbPostStatus";
import {IFbPostPullerData} from "../models/interfaces/iFbPostPullerData";
import {models} from "../models/index";
import {fn} from "sequelize";
import {FbPostPullerData, IFbPostPullerDataModel} from "../models/schemas/fbPostPullerData";
import {IFbPostImageData} from "../interfaces/fbposts/iFbPostImageData";
import {Schema} from "mongoose";
import {IFbPostComment} from "../interfaces/fbposts/iFbPostComments";
import {PostService} from "./postService";
import {PostType} from "../constants/enums/postType";
import {IPost} from "../models/interfaces/post";
import {IPostModel} from "../models/schemas/post";
import {IComment} from "../models/interfaces/comment";
import {UserService} from "./userService";
import {ICommentModel} from "../models/schemas/comment";
import {IUserModel} from "../models/schemas/user";
import {CommentService} from "./commentService";

const format = require('string-format');
const fetch = require('node-fetch');


const config = container.get<IServerConfig>("IServerConfig");
const URL_FOR_FETCHING_POSTS:string = 'https://graph.facebook.com/v2.9/{0}/posts?access_token={1}&limit=100';
const URL_FOR_FETCHING_LIKES:string = 'https://graph.facebook.com/v2.9/{0}/likes?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_ATTACHMENTS:string = 'https://graph.facebook.com/v2.9/{0}/attachments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_COMMENTS:string = 'https://graph.facebook.com/v2.9/{0}/comments?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_SHARES:string = 'https://graph.facebook.com/v2.9/{0}/sharedposts?summary=true&access_token={1}&limit=100';
const URL_FOR_FETCHING_REACTIONS:string = 'https://graph.facebook.com/v2.9/{0}/reactions?summary=true&access_token={1}&limit=100';

export class FbPostPullerService extends BaseService {

    // pulls the data from fb pages and puts it in the db.
    public static mainCron(): Promise<any>[] {
        // get the list of pages obj;
        const pages: IFbPage[] = config.get("fbPostPuller");
        const accessToken = config.get("facebook:permanentAccessToken");
        return pages.map(page => {
                const urlForListOfPosts = format(URL_FOR_FETCHING_POSTS, page.pageId, accessToken);
                return fetch(urlForListOfPosts)
                    .then(response => {
                        return response.json();
                    })
                    .then((result: IFbData) => {
                        const {data} = result;
                        return data.filter(FbPostPullerService.filterVeryRecentPosts(page.postDelayInMinutes));
                    })
                    .then((result: IFbData[]) => {
                        return Promise.all(result.map((singlePostObject) => {
                            return FbPostPullerService.getFbPostResults({singlePostObject, accessToken});
                        }));
                    })
                    .then(postResults => {
                        // List of objects {id, likes, comments ... }
                        return FbPostPullerService.saveFbPost(postResults);
                    });
            });

    }

    public static filterVeryRecentPosts(thresholdDelayInMinutes: number): (IFbPostItem) => boolean {
        return (fbPost) => {
            const curDate = new Date();
            const differenceInMinutes = (curDate.getTime() - new Date(fbPost.created_time).getTime()) / (1000 * 60);

            return differenceInMinutes > thresholdDelayInMinutes ? true : false;
        };

    }

    public static getFbPosts(args: {pageSize: number}): Promise<IFbPostPullerData[]> {
        const {pageSize} = args;
        return models.FbPostPullerData.find({
            status: FbPostStatus.PENDING
        })
            .sort({createdAt: -1})
            .limit(pageSize)
            .exec();
    }

    public static markIdsAsRejected(rejectedIds: string[]): Promise<any> {
        return models.FbPostPullerData.update({}, {$set: {status: FbPostStatus.REJECTED}})
            .where('_id').in(rejectedIds).exec();
    }

    public static markIdsAsAccepted(acceptedIds: string[]): Promise<any> {
        return models.FbPostPullerData.update({}, {$set: {status: FbPostStatus.ACCEPTED}})
            .where('_id').in(acceptedIds).exec();
    }

    public static copyFbPostPullerDataToUserFacingDataStore(ids: string[]): Promise<any> {
        return models.FbPostPullerData.find()
            .where('_id').in(ids).exec()
            .then((fbPosts: IFbPostPullerData[]) => {
            return fbPosts.map((fbPost: IFbPostPullerData) => {
                return FbPostPullerService.createOneContentFromFbPostPullerData(fbPost);
            });

        });
    }

    // TODO: make it return the Promise<Post>
    public static createOneContentFromFbPostPullerData(fbPostPullerData: IFbPostPullerData): Promise<any> {
        const fbPost = fbPostPullerData.jsonData;
        const fbPostImageData = fbPost.attachments.data[0].media.image as IFbPostImageData;
        const fbPostCommentData = fbPost.comments.data as IFbPostComment[];
        const post = {type: PostType.IMAGE, data: fbPostImageData} as IPost;
        return PostService.createPost(post)
            .then((postModel: IPostModel) => {
                return fbPostCommentData.map((fbPostComment: IFbPostComment) => {
                    const fbCommentedUser = fbPostComment.from;
                    return UserService.getOrCreateUserForFacebookId(fbCommentedUser.id, fbCommentedUser.name)
                        .then((userModel: IUserModel) => {
                            const comment = {
                                postId: postModel._id,
                                userId: userModel._id,
                                text: fbPostComment.message,
                            } as ICommentModel;
                            return CommentService.postComment(comment);
                        });

                });

            });


    }

    public static saveFbPost(posts: IFbPost[]): Promise<IFbPostPullerDataModel | any>[] {
        return posts.map(post => {
            return new models.FbPostPullerData({
                postId: post.postId,
                jsonData: post,
                postCreationTime: post.postCreationTime,
                status: FbPostStatus.PENDING
            } as IFbPostPullerData).save()
                .catch(ex => {
                    if (ex.code !== 11000) {
                        throw ex;
                    }
                });
        });
    }

    public static getFbPostResults({singlePostObject, accessToken}): Promise<IFbPost> {
        const {created_time, id} = singlePostObject;

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