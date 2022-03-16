import { Router } from 'express';
const router = Router();

import { signUp, signIn } from '../controllers/user.controller/user.controller';


// routes
router.post('/signup', signUp);
router.post('/signin', signIn);

export default router;