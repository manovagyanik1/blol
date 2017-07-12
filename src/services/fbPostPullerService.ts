import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import { fbPromisify } from 'fb_promise';
import fb_promise from 'fb_promise';
import GenUtils from "../utils/genUtils";
import {resolve, reject} from "bluebird";
import {IFbPage} from "../interfaces/iFbPage";
import FBUtils from "../utils/fbUtils";

var format = require('string-format')

const config = container.get<IServerConfig>("IServerConfig");
const FB = require('fb');
const URL_FOR_FETCHING_POST:string = 'https://graph.facebook.com/{0}?access_token={1}';

export class FbPostPullerService extends BaseService {

    public static mainCron() {
        // get the list of pages obj;
        const pages: IFbPage[] = config.get("fbPostPuller");
        FBUtils.getAccessToken().then((accessToken: string) => {
            pages.map(page => {
                const urlForListOfPosts = format(URL_FOR_FETCHING_POST, page.pageId, accessToken);
                fetch(urlForListOfPosts).then(
                    () => {

                    }
                );
            });
        });

    }



}