import * as Joi from 'joi';
import {FacebookLoginApi} from '../../api/facebookLoginApi';

export = [
    {
        method: 'GET', // TODO: change it to post, let it be 'GET' for test
        path: '/login/callback',
        handler: FacebookLoginApi.getLoginTokenFromCode,
        config: {
            auth: false,
            tags: ['api', 'login', 'facebook' ],
            description: 'api to get the login token and the cookie',
            validate: {
                query: {
                    code: Joi.string(),
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
    },
    {
        method: 'POST',
        path: '/login/fb-access-token',
        handler: FacebookLoginApi.getLoginTokenFromAccessToken,
        config: {
            auth: false,
            tags: ['api', 'login', 'facebook', 'facebook access token' ],
            description: 'api to get the login token from facebook access token',
            validate: {
                payload: {
                    accessToken: Joi.string(),
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

