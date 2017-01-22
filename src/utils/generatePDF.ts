
import EmailUtils from "./emailUtils";

var fs = require('fs');
var pdf = require('html-pdf');
import {AttachmentObject} from "nodemailer";
import * as OS from "os";

export default class generatePDF {

    /**
     * This method
     * a) takes html string and pdfName(to be created) as input
     * b) creates and  saves pdf of the html to /pdfs
     *
     *
     * @param html
     * @returns {Promise<T>}
     */
    public static generatePDFFromHTML(html: string, pdfName: string): Promise<any>{

        return new Promise((resolve,reject)=>{
            let tmpLocation = OS.tmpdir();
            let options = {
                "directory": "/tmp/lamo",
                "format": "A4",
                "orientation": "portrait",
                "type": "pdf"
            };
            let pdfPath = `${tmpLocation}/pdfs/${pdfName}.pdf`;
            pdf.create(html, options).toFile(pdfPath, function(err, res) {
                if (err){
                    console.log(err);
                    reject(err);
                } else{
                    console.log(res);
                    resolve(pdfPath);
                }
            });

        })

    }

}