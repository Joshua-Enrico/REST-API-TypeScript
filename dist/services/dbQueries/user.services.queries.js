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
exports.creatUser = void 0;
// import User from '../../models/user.model';// provide by moongose
const pwdEncription_service_1 = require("../utils/pwdEncription.service");
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const { user } = new PrismaClient();
/**
    * @description - This function is used to create a new user
    * and resolve the response to the client
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {void} - Returns nothing
 */
function creatUser(args, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log((0, pwdEncription_service_1.encryptedPWD)(args.password));
        yield user.create({
            data: {
                email: args.email,
                password: (0, pwdEncription_service_1.encryptedPWD)(args.password),
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
            console.log(result);
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
