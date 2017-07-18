export default class RandomUtils {
    public static getXRandomNumbersThatSumToN(x:number, n:number): number[] {
        const temp = [];
        temp.push(0);
        temp.push(n);
        const ret = [];
        for ( let i = 0; i < x - 1; i++) {
            temp.push( Math.round(Math.random() * n));
        }
        temp.sort();
        for ( let i = 1; i < temp.length; i ++) {
            ret.push(temp[i] - temp[i - 1]);
        }
        return ret;
    }

}