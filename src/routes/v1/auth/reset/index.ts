import { Router } from 'express';

import { reset } from 'controllers/auth/reset';
import { validatorResetPassword } from 'middleware/validation/auth';

const router = Router();

router.post('/', [validatorResetPassword], reset);

export default router;
