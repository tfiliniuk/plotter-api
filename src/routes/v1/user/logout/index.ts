import { Router } from 'express';

import { logout } from 'controllers/user/logout';
const router = Router();

router.get('/', logout);

export default router;
