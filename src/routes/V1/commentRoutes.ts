import * as Joi from 'joi';
import {CommentApi} from "../../api/commentApi";

export = [
    {
        method: 'GET',
        path: '/comments/{postId}',
        handler: CommentApi.getComment,
        config: {
            tags: ['api', 'comment'],
            description: 'get comment',
            validate: {
                query: {
                    beforeTimeStamp: Joi.date().timestamp(),
                    afterTimeStamp: Joi.date().timestamp(),
                    pageSize: Joi.number()
                },
                params: {
                    postId: Joi.string(),
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                }
            }
        }
    },
    {
        method: 'POST',
        path: '/comment',
        handler: CommentApi.postComment,
        config: {
            tags: ['api', 'comment', 'post comment'],
            description: 'post comment',
            validate: {
                payload: {
                    postId: Joi.string(),
                    text: Joi.string(),
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },

            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                }
            }
        }
    }
];

