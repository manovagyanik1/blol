import * as Joi from 'joi';
import {FeedApi} from "../../api/feedApi";
import {FbPostPullerApi} from "../../api/fbPostPullerApi";

export = [
    {
        method: 'GET',
        path: '/fb-post-puller',
        handler: FbPostPullerApi.getFbPosts,
        config: {
            auth: false,
            tags: ['api', 'internal', 'admin', 'content'],
            description: 'get posts from fb',
            validate: {
                query: {
                    pageSize: Joi.number().default(10),
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                },
            }
        }
    }
];

