export interface IUserReaction {
  targetId: any;
  userId: any;
  reaction: "LOL"| "HAHA"| "WOW"| "CLAP"| "LIKE";
  type: "COMMENT"| "POST";
}