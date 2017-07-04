'use strict';
import * as cookie from 'cookie';
import * as cacheUtils from '../utils/cache-utils';
import GlobalConstants from "../constants/globalConstants";
import { models } from '../models';

// TODO: define model for decoded
export const authenticateUser = function (decoded, request, callback) {
  models.User.findOne({facebookId: decoded['id']})
        .then((data) => {
          if (data !== null ) {
            callback(null, true);
          } else {
            callback(null, false);
          }
        });
  // if (request.headers.authorization) {
  //   cacheKey = request.headers.authorization;
  // } else if (request.headers.cookie) {
  //   cacheKey = cookie.parse(request.headers.cookie)[GlobalConstants.AUTH_COOKIE_KEY];
  // }
};