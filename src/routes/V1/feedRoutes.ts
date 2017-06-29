import * as Joi from 'joi';
import {FeedController} from "../../controllers/feedController";

export = [
    {
        method: 'GET',
        path: '/feed',
        handler: FeedController.getFeed,
        config: {
            auth: false,
            tags: ['api', 'feed'],
            description: 'get feed',
            validate: {
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

