import { Request, Response, NextFunction } from "express"
import { creatUser } from "../../services/dbQueries/user.services"

/**
 * @description - SingUp Controller
 * @param req - The request object
 * @param res - The response object
 * @function creatUser - This function is used to create a new user
 * and resolve the response to the client
 */
const signUp =  (req:Request, res:Response) => {

    creatUser()
}

const signIn =  (req:Request, res:Response) => {
    res.send("SignIn")
}

export {
    signUp,
    signIn
}