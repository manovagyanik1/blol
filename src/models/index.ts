import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
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
export const models = {} as any;
mongoose.Promise = require('bluebird');
const connection: mongoose.Connection = mongoose.createConnection(dbUrl);

//create models
this.models.user = connection.model<IUserModel>("User", UserSchema);
this.models.post = connection.model<IPostModel>("Post", PostSchema);
this.models.comment = connection.model<ICommentModel>("Post", CommentSchema);
this.models.userReaction = connection.model<IUserReactionModel>("Post", UserReactionSchema);

let comment: IComment = {
    text: "sample comment",
    userId: "123",
    displayName: "tom",
    postId: "789",
};

//create comment and return promise
 new this.models.comment(comment).save()
 .then(result => {
     console.log(result);
 });

 let userReactionPost: IUserReaction = {
     targetId: "123",
     userId: "123",
     reaction: "LOL",
     type: "POST"
 };
//create userReaction and return promise
 new this.models.UserReaction(userReactionPost).save()
 .then(result => {
     console.log(result);
 });


let userReactionComment: IUserReaction = {
    targetId: "234",
    userId: "123",
    reaction: "LIKE",
    type: "COMMENT",
};
//create userReaction and return promise
 new this.models.UserReaction(userReactionComment).save()
 .then(result => {
     console.log(result);
 });
