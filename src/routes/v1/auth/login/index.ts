import { Router } from 'express';

import { email } from 'controllers/auth/login';
import { validatorLogin } from 'middleware/validation/auth';

const router = Router();

router.post('/', [validatorLogin], email);

export default router;
