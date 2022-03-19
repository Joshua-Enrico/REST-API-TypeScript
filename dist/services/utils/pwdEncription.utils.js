"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptedPWD = exports.encryptedPWD = void 0;
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
/**
 * @description - This function is used to decrypt the password and compare it
 * @param pwd - The password to decrypt
 * @returns decryptedPWD - The decrypted password
 */
const decryptedPWD = (encrypted, pwd) => {
    let isValidL = true;
    const decrypted = CryptoJs.AES.decrypt(encrypted, process.env.SALT).toString(CryptoJs.enc.Utf8);
    (decrypted === pwd) ? isValidL = true : isValidL = false;
    return isValidL;
};
exports.decryptedPWD = decryptedPWD;
