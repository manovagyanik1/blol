import * as moment from "moment";
import GlobalConstants from "../constants/globalConstants";
export default class InvoiceUitls{
    public static generateInvoiceString(orderID:number):Promise<any>{
        return new Promise((resolve,reject)=>{
            let pre = "R/CF01";
            let currentMoment = moment().utcOffset(GlobalConstants.INDIA_TIMEZONE);
            let currentYear = currentMoment.format("YYYY");
            let currunteDate = currentMoment.format("DD");
            let currentMonth = currentMoment.format("MMM");
            let invoiceNumber = pre+"/"+currentYear+"/"+currunteDate+"/"+currentMonth+"/"+orderID;
            resolve( invoiceNumber);
        })
    }
}