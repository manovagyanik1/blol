import * as Joi from 'joi';
import {UserReactionApi} from "../../api/userReactionApi";

export = [
    {
        method: 'GET', //todo: change to post
        path: '/user-reaction',
        handler: UserReactionApi.react,
        config: {
            auth: false,
            validate: {
                  query: {
                    targetId: Joi.string(),
                    userId: Joi.string(),
                    reaction: Joi.string(),
                    type: Joi.string()
                }
            },
            tags: ['api', 'reaction', 'userReaction'],
            description: 'react to a post or a comment',
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

