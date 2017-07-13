import * as Joi from 'joi';
import {FbPostPullerApi} from "../../api/fbPostPullerApi";

export = [
    {
        method: 'GET',
        path: '/fb-post-puller',
        handler: FbPostPullerApi.getFbPosts,
        config: {
            auth: false,
            tags: ['api', 'internal', 'admin', 'content', 'enableAuth'],
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
    },
    {
        method: 'PUT',
        path: '/fb-post-puller',
        handler: FbPostPullerApi.getFbPosts,
        config: {
            auth: false,
            tags: ['api', 'internal', 'admin', 'content', 'enableAuth'],
            description: 'creates content with the pushed ids and mark it accordingly in the fbpostpuller collection',
            validate : {
                payload: {
                    accepted: Joi.array().items(Joi.string()),
                    rejected: Joi.array().items(Joi.string())
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

