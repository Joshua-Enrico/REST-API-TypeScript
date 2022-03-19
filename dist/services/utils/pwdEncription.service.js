"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptedPWD = void 0;
const CryptoJs = require('crypto-js');
/**
 * @description - This function is used to encrypt the password
 * @param pwd - The password to encrypt
 * @returns {string} - The encrypted password
 */
const encryptedPWD = (pwd) => {
    console.log(process.env.SALT);
    const encrypted = CryptoJs.AES.encrypt(pwd, process.env.SALT);
    return encrypted.toString();
};
exports.encryptedPWD = encryptedPWD;
