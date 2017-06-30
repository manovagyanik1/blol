import * as lodash from 'lodash';

export default class SequelizeUtils {

    public static getRawObject(sequelizeObject: any, deleteUnwantedAttribues: boolean =false) {
        return(sequelizeObject.toJSON)
    }
}