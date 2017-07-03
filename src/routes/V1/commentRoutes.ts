import * as Joi from 'joi';
import {CommentApi} from "../../api/commentApi";

export = [
    {
        method: 'GET',
        path: '/comment/{postId}',
        handler: CommentApi.getComment,
        config: {
            auth: false,
            tags: ['api', 'comment'],
            description: 'get comment',
            validate: {
                  query: {
                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean(),
                }
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

