import * as Joi from 'joi';
import {CommentController} from "../../controllers/commentController";

export = [
    {
        method: 'GET',
        path: '/comment/{postId}',
        handler: CommentController.getComment,
        config: {
            auth: false,
            tags: ['api', 'comment'],
            description: 'get comment',
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

