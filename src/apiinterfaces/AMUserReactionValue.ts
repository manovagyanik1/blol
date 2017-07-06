export interface AMUserReactionValue {
    LOL: number;
    HAHA: number;
    CLAP: number;
    WOW: number;
    LIKE: number;
}


export function PostUserReaction(LOL: number, HAHA: number, CLAP: number, WOW: number, LIKE: number): AMUserReactionValue {
    return {
        LOL,
        HAHA,
        CLAP,
        WOW,
        LIKE
    };
}