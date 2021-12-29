import { Router } from 'express';

import { isAuth } from 'middleware/isAuth';

import auth from './auth';
import logout from './user/logout';

const router = Router();

router.use('/auth', auth);
router.use('/logout', logout);
router.get('/', isAuth);

export default router;
