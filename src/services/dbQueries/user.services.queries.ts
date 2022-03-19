import { Response } from 'express';
// import User from '../../models/user.model';// provide by moongose
import { encryptedPWD } from '../utils/pwdEncription.service';
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const { user } = new PrismaClient();

/**
 * @description - User Arguments type
 */
type userType = {
    email: string,
    password: string,
    username: string,
    firstName: string,
    lastName: string
}

/**
    * @description - This function is used to create a new user
    * and resolve the response to the client
    * @param {object} req - The request object
    * @param {object} res - The response object
    * @returns {void} - Returns nothing
 */
async function creatUser(args:userType, res:Response): Promise<void> {
    console.log(encryptedPWD(args.password));
    await user.create({
        data: {
            email: args.email,
            password: encryptedPWD(args.password),
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
        .then((result: any) => {
            console.log(result);
            res.status(201).json({
                message: "User created successfully",
                data: result,
                code: "USER_CREATED_SUCCESSFULLY"
            });
        })
        .catch((err: any) => {
            console.log(err);
            res.status(500).json({
                message: "Internal server error",
                code: "INTERNAL_SERVER_ERROR"
            });
        })

}


export {
    creatUser
};