import BaseService from "./baseService";
import { models } from '../models';
export class FeedService extends BaseService {

    public static getFeed(): Promise<any> {
        return new Promise((resolve, reject) => {
            models.Post.find({}).then((data) => {
                resolve(data);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}