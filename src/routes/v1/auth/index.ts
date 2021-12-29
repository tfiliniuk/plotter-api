import { Router } from 'express';

import { isAuth } from 'middleware/isAuth';

import login from './login';
import refreshToken from './refreshToken';
import register from './register';

const router = Router();

router.use('/login', login);
router.use('/register', register);
router.use('/refresh', isAuth, refreshToken);

export default router;
