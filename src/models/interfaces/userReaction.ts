import {ReactionType} from '../../constants/enums/reactionType';

export interface IUserReaction {
  targetId: any;
  userId: any;
  reaction: ReactionType;
  type: ReactionType;
}