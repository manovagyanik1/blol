import * as Joi from 'joi';
import {FeedController} from "../../controllers/feedController";

export = [
    {
        method: 'GET',
        path: '/feed',
        handler: FeedController.getFeed,
        config: {
            auth: 'jwt',
            tags: ['api', 'feed'],
            description: 'get feed',
            validate: {
                  query: {
                    // Your other parameters ...
                    limit: Joi.number().integer(),
                    page: Joi.number().integer(),
                    pagination: Joi.boolean()
                }
            },
            plugins: {
                'hapi-swagger': {
                    responses: {
                        '400': {description: 'Bad Request'}
                    }
                },
                'pagination': {
                    enabled: true
                }
            }
        }
    }
];

