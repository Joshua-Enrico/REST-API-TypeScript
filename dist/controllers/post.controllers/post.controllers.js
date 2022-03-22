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
exports.NewPost = void 0;
const post_services_queris_1 = require("../../services/dbQueries/posts/post.services.queris");
const create_validations_1 = require("../../services/validations/post.validations/create.validations");
/**
 * @description - Create new post by user
 * @param {Request} req - The request object
 * @param {Response} res - The response object
 * @function createPost - Create new post
 * @function createPostVal - validate arguments
 * @function checkIdExistence - check if userId exits
 * @return {Promise<void>} - Returns nothing
 */
const NewPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let isValid = true; // isValid is true by default
    isValid = (0, create_validations_1.createPostVal)(req.body, res);
    isValid && (isValid = yield (0, create_validations_1.checkIdExistence)(req.body.authorId, res));
    isValid && (0, post_services_queris_1.createPost)(req.body, res);
});
exports.NewPost = NewPost;
