import {Types} from 'mongoose';

export interface IPostReaction {
    postId: Types.ObjectId;
    lol: number;
    haha: number;
    wow: number;
    clap: number;
}