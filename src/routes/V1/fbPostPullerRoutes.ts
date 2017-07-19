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
        method: 'POST',
        path: '/fb-post-puller/copy-data-to-user-facing',
        handler: FbPostPullerApi.copyDataFromFbPostPullerToUserFacing,
        config: {
            auth: false,
            tags: ['api', 'internal', 'admin', 'content', 'enableAuth'],
            description: 'creates content with the first [limit] entries in fbPostPullerData',
            validate : {
                payload: {
                    limit: Joi.number().integer().positive()
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
        handler: FbPostPullerApi.copyDataFromFbPostPullerToUserFacing,
        config: {
            auth: false,
            tags: ['api', 'internal', 'admin', 'content', 'enableAuth'],
            description: 'creates content with the ids passed in [accepted] array and rejects the ids passed in [rejected] and marks them accordingly',
            validate : {
                query: {
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
    },
];

