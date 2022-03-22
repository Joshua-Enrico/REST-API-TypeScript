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
exports.login = exports.creatUser = void 0;
// import User from '../../models/user.model';// provide by moongose
const pwdEncription_utils_1 = require("../utils/pwdEncription.utils");
const token_utils_1 = require("../utils/token.utils");
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();
/**
    * @description - This function is used to create a new user
    * and resolve the response to the client
    * @param {object} args - Arguments from the client
    * @param {object} res - The response object
    * @returns {void} - Returns nothing
 */
function creatUser(args, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.user.create({
            data: {
                email: args.email,
                password: (0, pwdEncription_utils_1.encryptPWD)(args.password),
                username: args.username,
                firstName: args.firstName,
                lastName: args.lastName
            },
            select: {
                id: true,
                email: true,
                username: true,
                firstName: true,
                lastName: true
            }
        })
            .then((result) => {
            res.status(201).json({
                message: "User created successfully",
                data: result,
                code: "USER_CREATED_SUCCESSFULLY"
            });
        })
            .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error",
                code: "INTERNAL_SERVER_ERROR"
            });
        });
    });
}
exports.creatUser = creatUser;
/**
 * @description - This function logins user to sytem, this functions resolves
 * response and error to client
 * @param args - Email and password
 * @param res - The response object
 * @returns {void} - Returns nothing
 */
const login = (args, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.findUnique({
        where: {
            email: args.email,
        },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            password: true
        }
    })
        .then((user) => {
        if (!user) {
            res.status(401).json({
                message: 'Wrong email or password',
                codeError: 'WRONG_EMAIL_OR_PASSWORD'
            });
        }
        else {
            if ((0, pwdEncription_utils_1.decryptPWD)(user.password, args.password) === false) {
                res.status(401).json({
                    message: 'Wrong email or password',
                    codeError: 'WRONG_EMAIL_OR_PASSWORD'
                });
            }
            else {
                delete user['password'];
                res.status(200).json({
                    message: 'Login successful',
                    codeError: 'LOGIN_SUCCESSFUL',
                    user: user,
                    token: (0, token_utils_1.generateToken)(user.id)
                });
            }
        }
    })
        .catch((err) => {
        res.status(500).json({
            message: 'Internal server error',
            codeError: 'INTERNAL_SERVER_ERROR'
        });
    });
});
exports.login = login;
