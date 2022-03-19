import { Request, Response, NextFunction } from "express"
import { creatUser } from "../../services/dbQueries/user.services.queries"
import { createUserVal, userExistance } from "../../services/validations/user.validations/user.validations"

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
const signUp =  async (req:Request, res:Response) => {
    let isValid:boolean = true; // isValid is true by default

    isValid = createUserVal(req.body, res);
    isValid && (isValid = await userExistance(req.body.email, req.body.username, res))
    isValid && creatUser(req.body, res);

}

const signIn =  (req:Request, res:Response) => {
    res.send("SignIn")
}

export {
    signUp,
    signIn
}