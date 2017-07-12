import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import { fbPromisify } from 'fb_promise';
import fb_promise from 'fb_promise';
import GenUtils from "../utils/genUtils";
import {resolve, reject} from "bluebird";
import {IFbPage} from "../interfaces/iFbPage";

const config = container.get<IServerConfig>("IServerConfig");
const FB = require('fb');
const URL_FOR_FETCHING_LIST_OF_POSTS = "";

export class FbPostPullerService extends BaseService {

    public static mainCron() {
        // get the list of pages obj;
        const pages: IFbPage[] = config.get("fbPostPuller");


    }

    public static getFbAccessToken(): Promise<string> {
        return new Promise((resolve, reject) => {
            resolve("hello");
            reject("hello");
        });
    }


}