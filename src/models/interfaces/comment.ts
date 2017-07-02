import {IObjectId} from './objectId';

export interface IComment extends IObjectId {
  text?: string;
  userId?: any;
  displayName?: string;
  postId?: any;
}