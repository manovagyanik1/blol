'use strict';
import * as redis from 'redis';
import container from "../libs/ioc";
import { IServerConfig } from "../../configurations/interfaces";
import {RedisClient} from "redis";
const config = container.get<IServerConfig>("IServerConfig");

// const globalConstants = require('../constants/globalConstants');
const redisHost = config.get('database:cache:host');
const redisPort = config.get('database:cache:port');
const redisOption = {
    db:config.get('database:cache:database')
};

const cacheClient = redis.createClient(redisPort, redisHost,redisOption);

export const cache = cacheClient;

export const generateKey = function(key){
    let partition = config.get('database:cache:partition');
    let segment = key.segment;
    let email = (key.email) ? encodeURIComponent(key.email) : null;
    let remainingContent = (key.id) ? encodeURIComponent(key.id) : null ;
    // let SEP = globalConstants.CACHE_KEY_GENERATION_SEP;
    let SEP = "needToSetThis";

    if(!email) {
        return partition + SEP + segment + SEP + remainingContent;
    }
    return partition + SEP + segment + SEP + email + SEP + remainingContent;
};

export const generateValue = function(value){
    let envelope = {
        item: value,
        stored: Date.now()
    };
    return JSON.stringify(envelope);
};

export const deleteKey = function(cacheClient:RedisClient,key:string){
    cacheClient.del(key);
};


export const setKeyAndExpiryPromise = function(cacheClient: any, key: string, value: string, ttl: number): Promise<any> {
    return new Promise((resolve, reject) => {
        setKeyAndExpiry(cacheClient, key, value, ttl, function(err) {
            if(!err) {
                resolve();
            } else {
                reject(err);
            }
        });
    });
};

export const setKeyAndExpiry = function(cacheClient,key, value, ttl, callback){
    cacheClient.setex(key, ttl, value,(err) =>{
        callback(err);
    });
};

export const getValue = function(cacheClient:RedisClient,key):Promise<string>{
    console.log("cache Key::" + key);
    return new Promise((resolve,reject)=>{
        cacheClient.get(key,(err,id) => {
            console.log("cache err::" + err);
            console.log("cache id::" + id);
            if(err){
                reject(err);
            }else{
                resolve(id);
            }
        })
    })
}

export const validateTokenOnRedis = function(cacheClient, key, callback){
    cacheClient.get(key,(err,reply) => {
        console.log('key:: ' + key);
        console.log('err:: ' + err);
        console.log('reply:: ' + reply);
        if(err){
            callback(err);
        }

        if(!reply) {
            callback(null, null);
        } else {
            callback(null,reply);
        }
    });
};