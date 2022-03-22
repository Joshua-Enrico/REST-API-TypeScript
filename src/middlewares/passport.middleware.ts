const jwt = require('jsonwebtoken');
import { Request, Response, NextFunction } from 'express';
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();


/**
 * @description - This function validates token existance and validity, 
 * handles response if token is not valid otherwise call next function
 * @param req - The request object
 * @param res - The response object
 * @param next - The next function
 * @returns {Promise<void>} - Returns nothing
 */
const verifyToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    const authToken = req.headers['authorization'];
    let userData:object;

    if (authToken) {
        const token = authToken.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, async (err:any, authData:any) => {
            if (err) {
                res.status(401).json({
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token'
                });
            } else {

                userData = await prisma.user.findUnique({
                    where: {
                        id: authData.userId
                    },
                    select: {
                        id: true,
                        userType: true
                    }
                })
                userData ? ((res.locals.userData = userData) && next()): res.status(401).json({
                    code: 'INVALID_TOKEN',
                    message: 'Invalid token'
                });
                
            }   
        });
    } else {
        res.status(401).json({
            code: 'NO_TOKEN_PROVIDED',
            message: 'No token provided'
        });
    }

}


export {
    verifyToken
}
