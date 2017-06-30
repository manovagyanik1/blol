import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import mongoose = require('mongoose');
import container from "../libs/ioc";
import {IUserModel, UserSchema} from "./schemas/user";
import {IUser} from "./interfaces/user";
import {IServerConfig} from "../../configurations/interfaces";
const config = container.get<IServerConfig>("IServerConfig");

let modelFiles = {};
let currentFile = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (fs.lstatSync(path.join(__dirname, file)).isFile()) && (file !== currentFile);
    })
    .forEach(function (file) {
        let hidden = /^\./.test(file);
        let fileExtension = path.extname(file);
        if (!hidden && fileExtension === '.js') {    //getting only js files
            modelFiles = _.assign(modelFiles, require(path.join(__dirname, file)));
        }
    });

// const MONGODB_CONNECTION: string = "mongodb://localhost:27017/heros";
// tslint:disable-next-line:max-line-length

const dbUrl = "mongodb://" + config.get('database:mongodb:host') + ':' + config.get('database:mongodb:port') + '/' + config.get('database:mysql:db');

export const models = {} as any;

// Use bluebird
mongoose.Promise = require('bluebird');

//connect to mongoose
let connection: mongoose.Connection = mongoose.createConnection(dbUrl);

//create models
this.models.user = connection.model<IUserModel>("User", UserSchema);

let user: IUser = {
        email: "foo@bar.com",
        firstName: "Brian",
        lastName: "Love"
      };

      //create user and return promise
 new this.models.user(user).save()
 .then(result => {
     console.log(result);
 });
// for (let item in modelFiles) {
//     if (modelFiles.hasOwnProperty(item)) { 
//         let modelName = modelFiles[item](sequelize);
//         console.log("model name = " + modelName);
//         models[item] = modelName;
//     }
// }
