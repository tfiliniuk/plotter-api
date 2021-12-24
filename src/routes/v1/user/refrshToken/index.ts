import { Router } from 'express';

import { refreshToken } from 'controllers/user/refreshToken';
const router = Router();

router.post('/', refreshToken);

export default router;
