import * as Joi from 'joi';
import {TestController} from "../../controllers/testController";

export = [
    {
        method: 'GET',
        path: '/addresses/{id}',
        handler: TestController.getAddressByID,
        config:{
            auth: false,
            tags: ['api', 'address'],
            description: 'get address by ID',
            validate: {
                params: {
                    id: Joi.number().integer(),
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

