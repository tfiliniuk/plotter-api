import { Request, Response, NextFunction } from 'express';
import validator from 'validator';

import { ConstsUser } from 'consts/ConstsUser';
import { CustomError } from 'utils/response/custom-error/CustomError';
import { ErrorValidation } from 'utils/response/custom-error/types';

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  let { email, password, first_name, last_name } = req.body;

  const errorsValidation: ErrorValidation[] = [];

  email = !email ? '' : email;
  password = !password ? '' : password;
  first_name = !first_name ? '' : first_name;
  last_name = !last_name ? '' : last_name;

  if (!validator.isEmail(email)) {
    errorsValidation.push({ email: 'Email is invalid' });
  }

  if (validator.isEmpty(email)) {
    errorsValidation.push({ email: 'Email is required' });
  }

  if (validator.isEmpty(password)) {
    errorsValidation.push({ password: 'Password is required' });
  }

  if (!validator.isLength(password, { min: ConstsUser.PASSWORD_MIN_CHAR })) {
    errorsValidation.push({
      password: `Password must be at least ${ConstsUser.PASSWORD_MIN_CHAR} characters`,
    });
  }

  if (validator.isEmpty(first_name)) {
    errorsValidation.push({ firstName: 'First name is required' });
  }
  if (validator.isEmpty(last_name)) {
    errorsValidation.push({ firstName: 'Last name is required' });
  }

  if (errorsValidation.length !== 0) {
    throw CustomError.BadRequest('Validation Error', errorsValidation);
  }
  return next();
};
