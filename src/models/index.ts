import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import {Model} from 'mongoose';
import mongoose = require('mongoose');
import container from "../libs/ioc";

import {IUserModel, UserSchema} from "./schemas/user";
import {IPostModel, PostSchema} from "./schemas/post";
import {ICommentModel, CommentSchema} from "./schemas/comment";
import {IUserReactionModel, UserReactionSchema} from "./schemas/userReaction";

import {IPost} from "./interfaces/post";
import {IUser} from "./interfaces/user";
import {IComment} from "./interfaces/comment";
import {IUserReaction} from "./interfaces/UserReaction";

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

// tslint:disable-next-line:max-line-length
const dbUrl = "mongodb://" + config.get('database:mongodb:host') + ':' + config.get('database:mongodb:port') + '/' + config.get('database:mysql:db');

mongoose.Promise = require('bluebird');
const connection: mongoose.Connection = mongoose.createConnection(dbUrl);

interface IModel {
    User: Model<IUserModel>;
    Post: Model<IPostModel>;
    Comment: Model<ICommentModel>;
    UserReaction: Model<IUserReactionModel>;
};

//create models
export const models: IModel = {
    User: connection.model<IUserModel>("User", UserSchema),
    Post: connection.model<IPostModel>("Post", PostSchema),
    Comment: connection.model<ICommentModel>("Comment", CommentSchema),
    UserReaction: connection.model<IUserReactionModel>("UserReaction", UserReactionSchema)
};
