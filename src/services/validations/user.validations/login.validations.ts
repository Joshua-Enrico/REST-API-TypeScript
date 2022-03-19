import { Response } from "express"


/**
 * @description - This function is used to validate login args
 * @param args - Arguments to validate
 */
const loginVal = (args:object, res:Response): boolean => {
    
    let valid:boolean = true;
    const validArgs = ['email', 'password'];

    // Chack allowed number of arguments
    if(Object.keys(args).length !== 2) {
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


    return valid
}


export {
    loginVal
}