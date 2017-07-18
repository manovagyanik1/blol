export default class RandomUtils {
    public static getXRandomNumbersThatSumToN(x:number, n:number): number[] {
        const temp = [];
        temp.push(0);
        temp.push(n);
        const ret = [];
        for ( let i = 0; i < x - 1; i++) {
            temp.push( RandomUtils.getRandomIntegerInclusive(0, n));
        }
        temp.sort();
        for ( let i = 1; i < temp.length; i ++) {
            ret.push(temp[i] - temp[i - 1]);
        }
        return ret;
    }

    public static getRandomIntegerInclusive(lo: number, hi: number): number {
        return Math.round(Math.random() * (hi - lo)) + lo;
    }
}