export interface AMUserReactionValue {
    LOL: number;
    POOP: number;
}


export function UserReactionConstructor(LOL: number, POOP : number): AMUserReactionValue {
    return {
        LOL,
        POOP
    };
}