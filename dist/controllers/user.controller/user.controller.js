"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const user_services_1 = require("../../services/dbQueries/user.services");
/**
 * @description - SingUp Controller
 * @param req - The request object
 * @param res - The response object
 * @function creatUser - This function is used to create a new user
 * and resolve the response to the client
 */
const signUp = (req, res) => {
    (0, user_services_1.creatUser)();
};
exports.signUp = signUp;
const signIn = (req, res) => {
    res.send("SignIn");
};
exports.signIn = signIn;
