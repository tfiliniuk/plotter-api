import { Router } from 'express';

import { isAuth } from 'middleware/isAuth';

import login from './login';
import refreshToken from './refreshToken';
import register from './register';
import reset from './reset';

const router = Router();

router.use('/login', login);
router.use('/register', register);
router.use('/refresh', isAuth, refreshToken);
router.use('/reset', isAuth, reset);

export default router;
