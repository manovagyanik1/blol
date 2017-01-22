'use strict';
import * as cookie from 'cookie';
import * as cacheUtils from '../utils/cache-utils';
import GlobalConstants from "../constants/globalConstants";

export const authenticateUser = function (decoded, request, callback) {

  var isAuthenticated = false;
  var cacheKey;

  console.log('debug', 'inside validate, decoded ', decoded);

  if(request.headers.authorization){
    cacheKey = request.headers.authorization;
  } else if(request.headers.cookie){
    cacheKey = cookie.parse(request.headers.cookie)[GlobalConstants.AUTH_COOKIE_KEY];
  }

  cacheUtils.validateTokenOnRedis(cacheUtils.cache, cacheKey, function (err, cached) {
    if(!err && cached){

      console.log("info", "user::", decoded.userFbId, "successfully authenticated.");
      isAuthenticated = true;
      
      return callback(null, isAuthenticated, decoded);

    } else {
      console.log('info', 'User is not logged in');
      console.log('error', "Error while authenticating user:: ", err);
      return callback(null, isAuthenticated, null);
    }
  });
};