import { Response } from "express"
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma: typeof PrismaClient = new PrismaClient();


/**
 * @description - This function is used to validate the user arguments
 * @param args - Arguments to validate
 * @param res - The response object
 * @returns {boolean} - Returns true if the validation is successful
 */
const createUserVal = (args:object, res:Response): boolean => {
    let valid:boolean = true;
    const validArgs = ['email', 'password', 'username', 'firstName', 'lastName' ];

    // Chack allowed number of arguments
    if(Object.keys(args).length !== 5) {
        valid = false;
        res.status(400).json({
            message: `Only ${validArgs.length} arguments are allowed: ${validArgs}`,
            codeError: 'WRONG_ARGUMENTS_NUMBER'
        })
        return valid;
    }
    // iterate over args
    for (let key in validArgs){
        
        let current = args[validArgs[key] as keyof typeof args];

        if (!args.hasOwnProperty(validArgs[key])) {
            valid = false;
            res.status(400).json({
                message: `<${validArgs[key]}> is required`,
                codeError: 'MISSING_ARGUMENTS'
            })
            return valid;
        } else if (current === '' || typeof current !== 'string') {
            valid = false;
            res.status(400).json({
                message: `<${validArgs[key]}> is empty or wrong type`,
                codeError: 'WRONG_ARG_TYPES'
            })
            return valid;
        }
    }
    console.log("end of code");
    return valid;
}

/**
 * 
 * @param email - The email to validate
 * @param name - The name to validate
 * @returns 
 */
const userExistance = async (email:string, username:string, res:Response): Promise<boolean> => {
    let valid:boolean = true;

    await prisma.user.findMany({
        where: {    
            OR: [
                {email},
                {username: username}
            ]
        },
    })
        .then((result: any) => {
            if (result.length > 0) {
                valid = false;
                res.status(400).json({
                    message: 'username or email already exist',
                    codeError: 'USER_EXIST'
                })
            }
        })
        .catch((err: any) => {
            console.log(err);
            valid = false;
        })
    return valid;
}


export {
    createUserVal,
    userExistance
}