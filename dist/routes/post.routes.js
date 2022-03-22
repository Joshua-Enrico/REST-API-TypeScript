"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controllers_1 = require("../controllers/post.controllers/post.controllers");
const passport_middleware_1 = require("../middlewares/passport.middleware");
const router = (0, express_1.Router)();
/**
 * @description - Create user controller
 * @funciotn NewPost - Create new post
 * @function verifyToken - Verify token
 */
router.post('/', passport_middleware_1.verifyToken, post_controllers_1.NewPost);
exports.default = router;
