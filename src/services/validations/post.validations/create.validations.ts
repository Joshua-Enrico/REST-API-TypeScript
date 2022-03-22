import { Response } from "express"
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma: typeof PrismaClient = new PrismaClient();

/**
 * @description - This function validates creat post arguments,
 * this functions handles the responses.
 * @param {object} - args - The arguments to be validated
 * @param {object} - res - The response object
 * @returns {boolean} - True if valid, false if not 
 */
const createPostVal = (args:object, res:Response): boolean => {
    let isValid: boolean = true;
    const validArgs = ['title', 'content', 'authorId'];

    // Chack allowed number of arguments
    if (Object.keys(args).length !== 3) {
        res.status(400).json({
            status: 400,
            message: 'Invalid number of arguments'
        });
        isValid = false;
    }

    // Check if all arguments are valid
    for(let key in validArgs) {
        let current = args[validArgs[key] as keyof typeof args];

        if (!args.hasOwnProperty(validArgs[key])) {
            res.status(400).json({
                message: `<${validArgs[key]}> is required`,
                code: 'MISSING_ARGUMENTS'
            });
            return isValid = false;
        } else if (current === '' || typeof current !== 'string') {
            res.status(400).json({
                message: `<${validArgs[key]}> is empty or wrong type`,
                code : 'WRONG_ARG_TYPES'
            });
            return isValid = false;
        }
    }


    return isValid;
}


/**
 * @description - Check Id existence, handles error response if not found
 * @param {string} id - The id to be checked
 * @param {Response} res - The id to be checked
 * @returns {Promise<void>} - Returns nothing
 */
const checkIdExistence = async (id:string, res:Response): Promise<boolean> => {
    let isValid: boolean = true;

    await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }

    })
    .then((user: any) => {
        if (!user) {
            res.status(404).json({
                message: 'Invalid UserID',
                code: 'INVALID_USER_ID'
            });
            return isValid = false;
        }else {
            return isValid;
        }
    })
    .catch((err: any) => {

        res.status(500).json({
            message: 'Internal Server Error',
            code: 'INTERNAL_SERVER_ERROR'
        });
        return isValid = false;
    })


    return isValid
}


export {
    createPostVal,
    checkIdExistence
}
