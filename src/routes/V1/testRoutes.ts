import * as Joi from 'joi';
import {FeedApi} from "../../api/feedApi";
import {TestApi} from "../../api/testApi";

export = [
    {
        method: 'GET',
        path: '/test',
        handler: TestApi.runFacebookPostPullerCron,
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
        path: '/testImage',
        handler: TestApi.testImage,
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
    }
];

