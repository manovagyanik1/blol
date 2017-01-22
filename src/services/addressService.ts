import BaseService from "./baseService";
import { sequelize as ORM, models } from '../models';
export class AddressService extends BaseService {

    public static getAddressByID(addressID): Promise<any> {
        return new Promise((resolve, reject) => {
            models.address.find({
                where: {
                    id: addressID,
                },
                attributes: ["id", "addressLine1", "addressLine2", "locality", ["cityID", "city"], "state", "pinCode", "latitude", "longitude"],
                raw: true
            }).then((address) => {
                resolve(address);
            }).catch((error) => {
                reject(error.message);
            });
        });
    }
}