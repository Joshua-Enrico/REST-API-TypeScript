import { Request, Response, NextFunction } from "express"

export const signUp =  (req:Request, res:Response):any => {
    res.send('signup')
}

export const signIn =  (req:Request, res:Response):any => {
    res.send("SignIn")
}
