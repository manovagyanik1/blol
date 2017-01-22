import * as AWS from 'aws-sdk';

import container from "../libs/ioc";
import {IServerConfig} from "../../configurations/interfaces";
import GlobalConstants from "../constants/globalConstants";

const config = container.get<IServerConfig>("IServerConfig");

export default class AWSUtils {

    static snsOptions = {
        accessKeyId: config.get('aws:sns:accessKeyID'),
        secretAccessKey: config.get('aws:sns:secretAccessKey'),
        region: config.get('aws:sns:region')
    };

    static s3Options = {
        accessKeyId: config.get('aws:s3:accessKeyID'),
        secretAccessKey: config.get('aws:s3:secretAccessKey'),
        region: config.get('aws:s3:region')
    };

    static sns = new AWS.SNS(AWSUtils.snsOptions);

    static s3 = new AWS.S3(AWSUtils.s3Options);

    public static sendSMS(phoneNumber: string, message: string) {
        let smsOptions = {
            Message: JSON.stringify({
                "default": JSON.stringify({
                    message: message,
                    number: phoneNumber,
                    sender:GlobalConstants.SMS_SENDER_ID
                })
            }),
            MessageStructure: "json",
            TopicArn: config.get('aws:sns:topicArn')
        };

        console.log(smsOptions);
        if(config.get('sendSMS')) {
            AWSUtils.sns.publish(smsOptions, function (err, data) {
                console.log("well." + err);
            });
        } else {
            // sending SMS is disabled in environment.
        }
    }
}
