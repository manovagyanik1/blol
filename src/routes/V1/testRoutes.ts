import * as Joi from 'joi';
import {FeedApi} from "../../api/feedApi";
import {TestApi} from "../../api/testApi";

export = [
    {
        method: 'GET',
        path: '/test/populate-posts',
        handler: TestApi.populateFbPostPullerData,
        config: {
            auth: false,
            tags: ['api', 'test', 'facebook run'],
            description: 'run the facebook cron to pull pages data and dump',
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
        method: 'GET',
        path: '/test/populate-comments',
        handler: TestApi.populateCommentsInFbPostPullerData,
        config: {
            auth: false,
            tags: ['api', 'test', 'facebook run'],
            description: 'run the facebook cron to pull pages data and dump',
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

