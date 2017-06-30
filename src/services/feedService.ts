import BaseService from "./baseService";
import { models } from '../models';
export class FeedService extends BaseService {

    public static getFeed(fromTimeStamp: number, numberOfItems: number): Promise<any> {
        return new Promise((resolve, reject) => {
            models.post.find({}).then((address) => {
                resolve(address);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}