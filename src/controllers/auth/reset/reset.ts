import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';
import { v4 } from 'uuid';

import { userService } from 'services/user.service';
import { User } from 'typeorm/entities/users/User';
import { fGetOrCreateUser, fResetPassword } from 'utils/firebase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const reset = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;

  try {
    const usersRepository: Repository<User> = getRepository(User);
    const user = await userService.getByEmail(email);

    if (!!user && !user.firebase_id) {
      user.firebase_id = await fGetOrCreateUser({
        email,
        password: v4(),
        displayName: `${user.first_name} ${user.last_name}`,
      });
      await usersRepository.save(user);
    }
  } catch (error) {
    return next(CustomError.BadRequest('Validation Error', error.message));
  }
  fResetPassword(email);
  return res.customSuccess(204);
};
