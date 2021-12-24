import { Router } from 'express';

import { isAuth } from 'middleware/isAuth';

import auth from './auth';
import logout from './user/logout';
import refreshToken from './user/refrshToken';

const router = Router();

router.use('/auth', auth);
router.use('/logout', logout);
router.get('/', isAuth);
router.use('/refresh', isAuth, refreshToken);

export default router;
