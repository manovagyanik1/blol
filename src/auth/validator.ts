'use strict';
import { IUserModel } from '../models/schemas/user';
import * as cookie from 'cookie';
import * as cacheUtils from '../utils/cache-utils';
import GlobalConstants from "../constants/globalConstants";
import { models } from '../models';

export const authenticateUser = function (decoded: IUserModel, request, callback) {
  models.User.findOne({facebookId: decoded.facebookId})
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