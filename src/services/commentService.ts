import BaseService from "./baseService";
import { models } from '../models';
export class CommentService extends BaseService {

    // needs to be paginated
    public static getComment(postId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            models.comment.find({
                postId
            }).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}