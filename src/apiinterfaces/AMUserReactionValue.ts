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

export function addReactionsCount(a: AMUserReactionValue, b: AMUserReactionValue): AMUserReactionValue {
    return UserReactionConstructor(a.LOL + b.LOL, a.POOP + b.POOP);
}