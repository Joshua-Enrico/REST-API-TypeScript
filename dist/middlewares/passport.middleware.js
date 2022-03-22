"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();
/**
 * @description - This function validates token existance and validity,
 * handles response if token is not valid otherwise call next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 * @returns {Promise<void>} - Returns nothing
 */
const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authToken = req.headers['authorization'];
    let userData;
    if (authToken) {
        const token = authToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, authData) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                res.status(401).json({
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token'
                });
            }
            else {
                userData = yield prisma.user.findUnique({
                    where: {
                        id: authData.userId
                    },
                    select: {
                        id: true,
                        userType: true
                    }
                });
                userData ? ((res.locals.userData = userData) && next()) : res.status(401).json({
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token'
                });
            }
        }));
    }
    else {
        res.status(401).json({
            code: 'NO_TOKEN_PROVIDED',
            message: 'No token provided'
        });
    }
});
exports.verifyToken = verifyToken;
