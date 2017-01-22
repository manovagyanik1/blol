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

console.log(models);

models.document.hasMany(models.docMuxDocumentMap,{foreignKey:'documentID'});
models.workout.belongsTo(models.docMux,{foreignKey:'docMuxID'});
models.trainer.belongsTo(models.docMux,{foreignKey:'docMuxID'});
models.trainer.hasMany(models.trainerCenterMap,{foreignKey:'trainerID'});
models.trainer.hasMany(models.trainerWorkoutMap,{foreignKey:'trainerID'});

models.center.belongsTo(models.docMux,{foreignKey:'docMuxID'});
models.center.belongsTo(models.address,{foreignKey:'addressID'});

models.docMux.belongsToMany(models.document, { through: models.docMuxDocumentMap, foreignKey: 'docMuxID',otherKey: 'documentID'});

// association of cultClass
models.workout.hasMany(models.cultClass, {foreignKey: 'workoutID'});
models.center.hasMany(models.cultClass, {foreignKey: 'centerID'});
models.trainer.hasMany(models.cultClass, {foreignKey: 'trainerID'});
models.cultClass.belongsTo(models.workout, {foreignKey: 'workoutID'});
models.cultClass.belongsTo(models.center, {foreignKey: 'centerID'});
models.cultClass.belongsTo(models.trainer, {foreignKey: 'trainerID'});
models.event.belongsTo(models.center, {foreignKey: 'centerID'});
models.event.belongsTo(models.docMux,{foreignKey:'docMuxID'});
models.event.belongsTo(models.address,{foreignKey:'addressID'});
models.address.belongsTo(models.city,{foreignKey:'cityID'});

models.booking.belongsTo(models.order,{foreignKey:'orderID'});
models.booking.belongsTo(models.cultClass,{foreignKey:'classID'});
models.booking.belongsTo(models.user,{foreignKey:'userID'});
models.eventRegistration.belongsTo(models.event,{foreignKey:'eventID'});

models.CRMAdmin.hasMany(models.CRMAdminCenterMapping, {foreignKey: 'adminID'});
models.CRMAdmin.belongsToMany(models.center, { as :"adminCenterMapping",through: models.CRMAdminCenterMapping, foreignKey: 'adminID',otherKey: 'centerID'});
models.center.belongsToMany(models.CRMAdmin, { as :"centerAdminMapping", through: models.CRMAdminCenterMapping, foreignKey: 'centerID',otherKey: 'adminID'});

models.user.belongsTo(models.userFitnessProfile,{foreignKey:'userFitnessProfileID'});
models.pack.belongsTo(models.center,{foreignKey:'centerID'});
models.membership.belongsTo(models.pack, {foreignKey: 'packID'});
