import * as Hapi from 'hapi';
import BaseController from "./baseController";
import {AddressService} from "../services/addressService";
export class FeedController extends BaseController{
    public static getFeed(request: Hapi.Request, reply: Hapi.IReply) {
        AddressService.getAddressByID(request.params['id']).then((address)=> {
            reply({
                address: address
            });
        }).catch((err)=> {
            reply(err);
        });
    }
}