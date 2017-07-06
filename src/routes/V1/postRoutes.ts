import * as Joi from 'joi';
import {PostApi} from "../../api/postApi";

export = [
    {
        method: 'POST',
        path: '/post',
        handler: PostApi.createPost,
        config: {
            tags: ['api', 'comment', 'post comment'],
            description: 'create a post',
            validate: {
                payload: {
                    url: Joi.string(),
                    type: Joi.string(),
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

