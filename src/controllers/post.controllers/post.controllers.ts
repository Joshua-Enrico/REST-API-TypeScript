import { Request, Response, NextFunction } from "express"
import { createPost } from "../../services/dbQueries/posts/post.services.queris";
import { checkIdExistence, createPostVal } from "../../services/validations/post.validations/create.validations";


/**
 * @description - Create new post by user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @function createPost - Create new post
 * @function createPostVal - validate arguments
 * @function checkIdExistence - check if userId exits
 * @return {Promise<void>} - Returns nothing
 */
const NewPost = async (req: Request, res: Response): Promise<void> => {
    let isValid:boolean = true; // isValid is true by default

    isValid = createPostVal(req.body, res);
    isValid && (isValid = await checkIdExistence(req.body.authorId, res)); 
    isValid && createPost(req.body, res);

}


export {    
    NewPost
}