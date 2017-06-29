import * as ORM from "sequelize";
import * as fs from 'fs';
import * as path from 'path';
import * as _ from 'lodash';
import {Sequelize} from 'sequelize';
import container from "../libs/ioc";
import {IServerConfig} from "../../configurations/interfaces";
const config = container.get<IServerConfig>("IServerConfig");

let modelFiles = {};
let currentFile = path.basename(__filename);

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (fs.lstatSync(path.join(__dirname, file)).isFile()) && (file !== currentFile);
    })
    .forEach(function (file) {
        let hidden = /^\./.test(file);
        let fileExtension = path.extname(file);
        if (!hidden && fileExtension == '.js') {    //getting only js files
            modelFiles = _.assign(modelFiles,require(path.join(__dirname, file)));
        }
    });

// 'mysql://username:password@host:port/cultApp'

const dbUrl = 'mysql:' + config.get('database:mysql:username') + ':' + config.get('database:mysql:password') +
    '@' + config.get('database:mysql:host') + '/' + config.get('database:mysql:db');


const options = {
    dialect: 'mysql',
        define:{
            underscoredAll: false,
            timestamps: true,
            logging: true,
            createdAt : "createdAt",
            updatedAt : "updatedAt",
            freezeTableName: true,
            paranoid :true
        },
    // timezone: "+05:30",
};

export const sequelize: Sequelize = new ORM(dbUrl, options );

export const models = {} as any;


for(let item in modelFiles){
    let modelName = modelFiles[item](sequelize);
    console.log("model name = " + modelName);
    models[item]= modelName;
}
