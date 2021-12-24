import { Router } from 'express';

import { email } from 'controllers/auth/register';
import { validatorRegister } from 'middleware/validation/auth';

const router = Router();

router.post('/', [validatorRegister], email);

export default router;
