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
exports.userExistance = exports.createUserVal = void 0;
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();
/**
 * @description - This function is used to validate the user arguments
 * @param args - Arguments to validate
 * @param res - The response object
 * @returns {boolean} - Returns true if the validation is successful
 */
const createUserVal = (args, res) => {
    let valid = true;
    const validArgs = ['email', 'password', 'username', 'firstName', 'lastName'];
    // Chack allowed number of arguments
    if (Object.keys(args).length !== 5) {
        valid = false;
        res.status(400).json({
            message: `Only ${validArgs.length} arguments are allowed: ${validArgs}`,
            codeError: 'WRONG_ARGUMENTS_NUMBER'
        });
        return valid;
    }
    // iterate over args
    for (let key in validArgs) {
        let current = args[validArgs[key]];
        if (!args.hasOwnProperty(validArgs[key])) {
            valid = false;
            res.status(400).json({
                message: `<${validArgs[key]}> is required`,
                codeError: 'MISSING_ARGUMENTS'
            });
            return valid;
        }
        else if (current === '' || typeof current !== 'string') {
            valid = false;
            res.status(400).json({
                message: `<${validArgs[key]}> is empty or wrong type`,
                codeError: 'WRONG_ARG_TYPES'
            });
            return valid;
        }
    }
    console.log("end of code");
    return valid;
};
exports.createUserVal = createUserVal;
/**
 *
 * @param email - The email to validate
 * @param name - The name to validate
 * @returns
 */
const userExistance = (email, username, res) => __awaiter(void 0, void 0, void 0, function* () {
    let valid = true;
    yield prisma.user.findMany({
        where: {
            OR: [
                { email },
                { username: username }
            ]
        },
    })
        .then((result) => {
        if (result.length > 0) {
            valid = false;
            res.status(400).json({
                message: 'username or email already exist',
                codeError: 'USER_EXIST'
            });
        }
    })
        .catch((err) => {
        console.log(err);
        valid = false;
    });
    return valid;
});
exports.userExistance = userExistance;
