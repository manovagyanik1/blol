export interface AMUserReactionValue {
    LOL: number;
    HAHA: number;
    CLAP: number;
    WOW: number;
    LIKE: number;
}


export function UserReactionConstructor(LOL: number, HAHA: number, CLAP: number, WOW: number, LIKE: number): AMUserReactionValue {
    return {
        LOL,
        HAHA,
        CLAP,
        WOW,
        LIKE
    };
}