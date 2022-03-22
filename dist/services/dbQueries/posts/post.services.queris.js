"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPost = void 0;
const { PrismaClient } = require('@prisma/client'); // provide by prisma
const prisma = new PrismaClient();
/**
 * @description - This function is used to create a new post
 * and resolve the response to the client
 * @param {object} args - Arguments from the client
 * @param {Response} res - The object Response
 * @return {void} - Returns void
*/
const createPost = (args, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.post.create({
        data: {
            title: args.title,
            content: args.content,
            author: {
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
        .then((result) => {
        res.status(201).json({
            message: "Post created successfully",
            data: result,
            code: "POST_CREATED_SUCCESSFULLY"
        });
    })
        .catch((err) => {
        res.status(500).json({
            message: "Internal server error",
            code: "INTERNAL_SERVER_ERROR"
        });
    });
});
exports.createPost = createPost;
