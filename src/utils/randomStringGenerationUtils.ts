import GlobalConstant from "../constants/globalConstants";

export default class RandomStringGenerationUtils {

    public static generateRandomString(): string{

        let randomString = "";

        let length = GlobalConstant.RANDOM_STRING_LENGTH;

        let possible = GlobalConstant.RANDOM_STRING_COMBINATION;

        for ( let i = 0; i < length; i++ ) {
            randomString += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return randomString;
    }
}
