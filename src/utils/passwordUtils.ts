import * as Bcrypt from 'bcrypt';

import container from "../libs/ioc";
import {IServerConfig} from "../../configurations/interfaces";
const config = container.get<IServerConfig>("IServerConfig");

let privateKey = config.get('key:privateKey');
let BCRYPT_ROUNDS = config.get('key:bcrypytSaltRounds');

// Must contain 
//    one uppercase,
//    one lowercase,
//    one digit and
//    one of special characters out of [!, @, #, $, %]
// Also, must be atleast 8 characers
let PASSWORD_REGEX = /^(?=(.*\d))(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])[0-9a-zA-Z!@#$%]{8,}/;

/**
 * generates a random password and encrypts it using bcrypt.
 */
export const getRandomEncryptedPassword = function() {
    var password = getRandomPassword();
    return encrypt(password);
};

/**
 * encrypts a provided `password`
 */
export const encryptPassword = function(password) {
    return encrypt(password);
};

/**
 * compares a password provided by user in request and encrypted password present in DB
 */
export const comparePassword = function(plainTextPassword, encryptedPasswordFromDB) {
    return compare(plainTextPassword, encryptedPasswordFromDB);
};

/**
 * checks if a password is strong or not?
 */
export const isPasswordStrong = function(password) {
    return isPasswordStrongRegex (password);
};


// PRIVATE METHODS
/**
 * Encrypts password with bcrypt
 */
function encrypt(password) {

    var salt = Bcrypt.genSaltSync(BCRYPT_ROUNDS);
    var encyrptedPassword = Bcrypt.hashSync(password, BCRYPT_ROUNDS);
    return encyrptedPassword;
}

/**
 * compares a password provided by user in request and encrypted password present in DB
 */
function compare(plainTextPassword, encryptedPasswordFromDB){

    return Bcrypt.compareSync(plainTextPassword, encryptedPasswordFromDB);
}


/**
 * Returns a random password of `length`
 * and appends it to "Qq1!" to ensure usage of one lowercase,
 * one uppercase, one digit and one special character.
 */
function getRandomPassword() {
    var length = 8;
    return("Qq1!" + Math.random().toString(36).substr(2,length));
}

/**
 * Matches the password to strength regex,
 * returns false if password is not strong enough.
 */
function isPasswordStrongRegex(password) {
    return PASSWORD_REGEX.test(password);
}
