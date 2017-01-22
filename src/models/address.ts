import * as ORM from "sequelize";
import {Sequelize} from 'sequelize';

export function address(sequelize: Sequelize) {
    return sequelize.define('Address', {
        addressLine1: {
            type: ORM.STRING
        },

        addressLine2:{
            type: ORM.STRING
        },

        locality:{
            type: ORM.STRING
        },

        cityID:{
            type: ORM.INTEGER
        },

        state:{
            type: ORM.STRING
        },

        pinCode: {
            type: ORM.INTEGER
        },

        latitude: {
            type: ORM.DOUBLE
        },

        longitude: {
            type: ORM.DOUBLE
        },

        version: {
            type: ORM.INTEGER,
            defaultValue: 0
        },
        deletedAt:{
            type:ORM.DATE,
            defaultValue:null
        }
    });
}

