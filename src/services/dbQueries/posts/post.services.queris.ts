import { Response } from "express";
import { postType } from "../../utils/types/user.types";

const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();



/**
 * @description - This function is used to create a new post
 * and resolve the response to the client
 * @param {object} args - Arguments from the client
 * @param {Response} res - The object Response
 * @return {void} - Returns void
*/
const createPost = async (args:postType, res:Response): Promise<void> => {

    await prisma.post.create({
        data: {
            title: args.title,
            content: args.content,
            author : {
                connect: {
                    id: args.authorId
                }
            }
        },
        select: {
            id: true,
            title: true,
            content: true,
            author: {
                select: {
                    id: true,
                }
            }
        }
    })
        .then((result: any) => {

            res.status(201).json({
                message: "Post created successfully",
                data: result,
                code: "POST_CREATED_SUCCESSFULLY"
            });

        })
        .catch((err: any) => {

            res.status(500).json({
                message: "Internal server error",
                code: "INTERNAL_SERVER_ERROR"
            });
        })

}

export {
    createPost
}
