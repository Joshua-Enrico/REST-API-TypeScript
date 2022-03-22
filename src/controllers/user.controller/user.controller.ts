import { Request, Response, NextFunction } from "express"
import { creatUser, login } from "../../services/dbQueries/user.services.queries"
import { createUserVal, userExistance } from "../../services/validations/user.validations/create.validations"
import { loginVal } from "../../services/validations/user.validations/login.validations";

/**
 * @description - SingUp Controller, create new user
 * @param req - The request object
 * @param res - The response object
 * @function creatUser - This function is used to create a new user
 * and resolve the response to the client
 * @function createUserVal - This function is used to validate the user 
 * @function userExistance - This function is used to check username and 
 * email existence
 * @returns {Promise<void>} - Returns nothing
 */
const signUp =  async (req:Request, res:Response): Promise<void> => {
    let isValid:boolean = true; // isValid is true by default

    isValid = createUserVal(req.body, res);
    isValid && (isValid = await userExistance(req.body.email, req.body.username, res))
    isValid && creatUser(req.body, res);

}


/**
 * @description - Login Controller, login user,
 * each function called handle the request and response
 * @param {Resquest} req - The request object 
 * @param {Response} res - The response object
 * @returns {void} - Returns nothing 
 */
const signIn = (req:Request, res:Response): void => {
    
    let isValid:boolean = true; // isValid is true by default

    isValid = loginVal(req.body, res);
    isValid && login(req.body, res);

}

export {
    signUp,
    signIn
}
