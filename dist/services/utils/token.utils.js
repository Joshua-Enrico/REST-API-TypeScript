"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jwt = require('jsonwebtoken');
/**
 * @description - This function generates a token api acces
 * @param {string} userId - User ID
 * @returns {string} - The token
 */
const generateToken = (userId) => {
    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });
    return token;
};
exports.generateToken = generateToken;
