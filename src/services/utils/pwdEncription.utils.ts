const CryptoJs = require('crypto-js');
/**
 * @description - This function is used to encrypt the password
 * @param pwd - The password to encrypt
 * @returns {string} - The encrypted password
 */
const encryptPWD = (pwd: string): string => {
    console.log(process.env.SALT);
    const encrypted = CryptoJs.AES.encrypt(pwd, process.env.SALT);
    return encrypted.toString();
}

/**
 * @description - This function is used to decrypt the password and compare it
 * @param pwd - The password to decrypt
 * @returns decryptedPWD - The decrypted password
 */
const decryptPWD = (encrypted:string, pwd: string): boolean => {
    let isValidL: boolean = true;

    const decrypted = CryptoJs.AES.decrypt(encrypted, process.env.SALT).toString(CryptoJs.enc.Utf8);
    (decrypted === pwd) ? isValidL = true : isValidL = false;

    return isValidL;
}

export {
    encryptPWD,
    decryptPWD
}
