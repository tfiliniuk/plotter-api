import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorResetPassword = (req: Request, res: Response, next: NextFunction) => {
  let { email } = req.body;
  const errorsValidation: ErrorValidation[] = [];

  email = !email ? '' : email;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email field is required' });
  }

  if (errorsValidation.length !== 0) {
    throw CustomError.BadRequest('Validation Error', errorsValidation);
  }
  return next();
};
