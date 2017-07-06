import * as Joi from 'joi';
import {FeedApi} from "../../api/feedApi";

export = [
    {
        method: 'GET',
        path: '/feed',
        handler: FeedApi.getFeed,
        config: {
            auth: false,
            tags: ['api', 'feed'],
            description: 'get feed',
            validate: {
                  query: {
                    beforeTimeStamp: Joi.date().timestamp(),
                    afterTimeStamp: Joi.date().timestamp(),
                    pageSize: Joi.number().default(10),
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

