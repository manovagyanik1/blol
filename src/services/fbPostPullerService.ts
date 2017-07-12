import BaseService from "./baseService";
import container from "../libs/ioc/index";
import {IServerConfig} from "../../configurations/interfaces";
import { fbPromisify } from 'fb_promise';
import fb_promise from 'fb_promise';
import GenUtils from "../utils/genUtils";

const config = container.get<IServerConfig>("IServerConfig");
const FB = require('fb');
FB.setAccessToken("EAAEw28ggKzcBACdJBBZCsls5Xa2j3tl87WZCaOXruXgZAZBhAaj9qbXDoqTyEqjkiODsjw9RcCKQ2peXGR8ra5XAjvz1FRUgQcLMtV8vVbdWZCwOD6j8MZBOms90rUedoiSQmsA2cyrmY5ZCFymAzvtBzVdTphFGEYhFQ0fPktKWwZDZD");

export class FbPostPullerService extends BaseService {

    public static mainCron() {
        // get the list of pages to crawl
        fbPromisify(FB.api)('/me').then(val => console.log(val));
    }



}