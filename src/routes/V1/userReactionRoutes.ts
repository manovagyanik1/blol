import * as Joi from 'joi';
import {UserReactionApi} from "../../api/userReactionApi";

export = [
    {
        method: 'POST', //todo: change to post
        path: '/user-reaction',
        handler: UserReactionApi.insertReaction,
        config: {
            validate: {
                payload: {
                    targetId: Joi.string(),
                    reaction: Joi.string().valid('LOL', 'HAHA', 'WOW', 'CLAP', 'LIKE'),
                    type: Joi.string().valid('COMMENT', 'POST')
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
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
    },
    {
        method: 'DELETE', //todo: change to post
        path: '/user-reaction',
        handler: UserReactionApi.deleteReaction,
        config: {
            validate: {
                payload: {
                    targetId: Joi.string(),
                    reaction: Joi.string().valid('LOL', 'HAHA', 'WOW', 'CLAP', 'LIKE'),
                    type: Joi.string().valid('COMMENT', 'POST')
                },
                headers: Joi.object({
                    'authorization': Joi.string().required()
                }).unknown()
            },
            tags: ['api', 'reaction', 'userReaction'],
            description: 'deletes the reaction to a post or a comment',
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

