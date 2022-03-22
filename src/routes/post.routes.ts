import { Router } from 'express';
import { NewPost } from '../controllers/post.controllers/post.controllers';
import { verifyToken } from '../middlewares/passport.middleware';
const router = Router();

/**
 * @description - Create user controller
 * @funciotn NewPost - Create new post
 * @function verifyToken - Verify token
 */
router.post('/', verifyToken , NewPost)


export default router;