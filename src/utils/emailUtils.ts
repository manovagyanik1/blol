import * as nodeMailer  from 'nodemailer';
import * as sesTransport from 'nodemailer-direct-transport';

import container from "../libs/ioc";
import {IServerConfig} from "../../configurations/interfaces";
import {AttachmentObject} from "nodemailer";
import GlobalConstants from "../constants/globalConstants";

const config = container.get<IServerConfig>("IServerConfig");

export default class EmailUtils {

    private static SES_OPTIONS = {
        name: "Lolmenow", // TODO: add proper host name
        accessKeyId: config.get('aws:ses:accessKeyID'),
        secretAccessKey: config.get('aws:ses:secretAccessKey'),
        region: config.get('aws:ses:region')
    };

    static transporter = nodeMailer.createTransport(sesTransport(EmailUtils.SES_OPTIONS));

    // tslint:disable-next-line:max-line-length
    public static sendMail_HTML(fromEmail: string, toEmails: Array<string>, subject: string, body: string , attachments?: AttachmentObject[]){

        console.log("Sending email+++++++++++++++++++++++++++++++");
        if (!fromEmail) {
            fromEmail = GlobalConstants.VERIFICATION_EMAIL_FROM_MAIL;
        }

        var mailOptions = {
            from: fromEmail,
            to: toEmails,
            subject: subject,
            html: body,
            attachments: attachments,
            replyTo: GlobalConstants.EMAIL_REPLY_TO_HEADER
        };

        if(config.get('sendEmail')) {
            EmailUtils.transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        } else {
            // sending mail is disabled for environment.
        }
    };

    // send mail with defined transport object
    public static sendMail_TEXT(fromEmail, toEmails, subject, body) {

        if(!fromEmail) {
            fromEmail = "noreply@opinioapp.com";
        }

        var mailOptions = {
            from: fromEmail,
            to: toEmails,
            subject: subject,
            text: body
        };

        if (config.get('sendEmail')) {
            EmailUtils.transporter.sendMail(mailOptions, function(error, info){
                if (error){
                    console.log(error);
                }else{
                    console.log('Message sent: ' + info.response);
                }
            });
        } else {
            // sending mail is disabled for environment.
        }
    };
}