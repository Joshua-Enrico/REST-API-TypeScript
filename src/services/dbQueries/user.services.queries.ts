
// import User from '../../models/user.model';// provide by moongose
import { encryptedPWD, decryptedPWD } from '../utils/pwdEncription.utils';
import { loginArgs, userType } from '../utils/types/user.types';
import { generateToken } from '../utils/token.utils';
import { Response } from 'express';

const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();

/**
    * @description - This function is used to create a new user
    * and resolve the response to the client
    * @param {object} args - Arguments from the client
    * @param {object} res - The response object
    * @returns {void} - Returns nothing
 */
async function creatUser(args:userType, res:Response): Promise<void> {

    await prisma.user.create({
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

/**
 * @description - This function logins user to sytem, this functions resolves
 * response and error to client
 * @param args - Email and password
 * @param res - The response object
 * @returns {void} - Returns nothing
 */
 const login = async (args:loginArgs, res:Response): Promise<void> => {

    await prisma.user.findUnique({
        where: {
            email: args.email,
        },
        select: {
            id: true,
            email: true,
            username: true,
            firstName: true,
            lastName: true,
            password: true
        }
    })
    .then((user:any) => {

        if(!user) {
            res.status(401).json({
                message: 'Wrong email or password',
                codeError: 'WRONG_EMAIL_OR_PASSWORD'
            })
        }else {

            if(decryptedPWD(user.password, args.password) === false) {
                res.status(401).json({
                    message: 'Wrong email or password',
                    codeError: 'WRONG_EMAIL_OR_PASSWORD'
                })
            } else {
                delete user['password'];
                res.status(200).json({
                    message: 'Login successful',
                    codeError: 'LOGIN_SUCCESSFUL',
                    user:  user,
                    token: generateToken(user.id)
                })
            }
        }
    })
    .catch((err:any) => {

        res.status(500).json({
            message: 'Internal server error',
            codeError: 'INTERNAL_SERVER_ERROR'
        })
    })

}



export {
    creatUser,
    login
};
