import * as Joi from 'joi';
import {FacebookLoginApi} from '../../api/facebookLoginApi';

export = [
    {
        method: 'GET',
        path: '/login/callback',
        handler: FacebookLoginApi.getLoginToken,
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
    }
];
