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
exports.checkIdExistence = exports.createPostVal = void 0;
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();
/**
 * @description - This function validates creat post arguments,
 * this functions handles the responses.
 * @param {object} - args - The arguments to be validated
 * @param {object} - res - The response object
 * @returns {boolean} - True if valid, false if not
 */
const createPostVal = (args, res) => {
    let isValid = true;
    const validArgs = ['title', 'content', 'authorId'];
    // Chack allowed number of arguments
    if (Object.keys(args).length !== 3) {
        res.status(400).json({
            status: 400,
            message: 'Invalid number of arguments'
        });
        isValid = false;
    }
    // Check if all arguments are valid
    for (let key in validArgs) {
        let current = args[validArgs[key]];
        if (!args.hasOwnProperty(validArgs[key])) {
            res.status(400).json({
                message: `<${validArgs[key]}> is required`,
                code: 'MISSING_ARGUMENTS'
            });
            return isValid = false;
        }
        else if (current === '' || typeof current !== 'string') {
            res.status(400).json({
                message: `<${validArgs[key]}> is empty or wrong type`,
                code: 'WRONG_ARG_TYPES'
            });
            return isValid = false;
        }
    }
    return isValid;
};
exports.createPostVal = createPostVal;
/**
 * @description - Check Id existence, handles error response if not found
 * @param {string} id - The id to be checked
 * @param {Response} res - The id to be checked
 * @returns {Promise<void>} - Returns nothing
 */
const checkIdExistence = (id, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isValid = true;
    yield prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })
        .then((user) => {
        if (!user) {
            res.status(404).json({
                message: 'Invalid UserID',
                code: 'INVALID_USER_ID'
            });
            return isValid = false;
        }
        else {
            return isValid;
        }
    })
        .catch((err) => {
        res.status(500).json({
            message: 'Internal Server Error',
            code: 'INTERNAL_SERVER_ERROR'
        });
        return isValid = false;
    });
    return isValid;
});
exports.checkIdExistence = checkIdExistence;
