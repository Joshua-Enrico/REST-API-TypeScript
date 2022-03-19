/**
 * @description - login args type
 */
 type loginArgs = {
    email: string,
    password: string
}

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

export{
    loginArgs,
    userType
}