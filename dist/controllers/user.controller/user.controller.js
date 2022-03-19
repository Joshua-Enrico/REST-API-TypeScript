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
exports.signIn = exports.signUp = void 0;
const user_services_queries_1 = require("../../services/dbQueries/user.services.queries");
const create_validations_1 = require("../../services/validations/user.validations/create.validations");
const login_validations_1 = require("../../services/validations/user.validations/login.validations");
/**
 * @description - SingUp Controller, create new user
 * @param req - The request object
 * @param res - The response object
 * @function creatUser - This function is used to create a new user
 * and resolve the response to the client
 * @function createUserVal - This function is used to validate the user
 * @function userExistance - This function is used to check username and
 * email existence
 */
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isValid = true; // isValid is true by default
    isValid = (0, create_validations_1.createUserVal)(req.body, res);
    isValid && (isValid = yield (0, create_validations_1.userExistance)(req.body.email, req.body.username, res));
    isValid && (0, user_services_queries_1.creatUser)(req.body, res);
});
exports.signUp = signUp;
const signIn = (req, res) => {
    let isValid = true; // isValid is true by default
    isValid = (0, login_validations_1.loginVal)(req.body, res);
    isValid && (0, user_services_queries_1.login)(req.body, res);
};
exports.signIn = signIn;
