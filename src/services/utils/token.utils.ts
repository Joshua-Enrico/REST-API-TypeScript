const jwt = require('jsonwebtoken');

/**
 * @description - This function generates a token api acces
 * @param {string} userId - User ID
 * @returns {string} - The token
 */
const generateToken = (userId: string): string => {

    const token = jwt.sign({
        userId
    }, process.env.JWT_SECRET, {
        expiresIn: '3h'
    });

    return token;
}

export {
    generateToken
}