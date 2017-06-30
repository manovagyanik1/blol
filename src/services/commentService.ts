import BaseService from "./baseService";
import { models } from '../models';
export class CommentService extends BaseService {

    // needs to be paginated
    public static getComment(fromTimeStamp: number, numberOfItems: number): Promise<any> {
        return new Promise((resolve, reject) => {
            models.post.find({}).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}