import { Request, Response, NextFunction } from 'express';
import { getRepository, Repository } from 'typeorm';

import { UserDto } from 'dtos/user-dto';
import { User } from 'typeorm/entities/users/User';
import { fVerifyToken } from 'utils/firebase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const isAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(CustomError.UnauthorizedError());
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(CustomError.UnauthorizedError());
    }
    const decodedToken = await fVerifyToken(accessToken);

    const userRepository: Repository<User> = getRepository(User);
    const user = await userRepository.findOne({ where: { firebase_id: decodedToken.uid } });
    if (!user) {
      return next(CustomError.UnauthorizedError());
    }
    const userData = new UserDto(user);
    req.user = userData;
    next();
  } catch (error) {
    return next(CustomError.UnauthorizedError());
  }
};
