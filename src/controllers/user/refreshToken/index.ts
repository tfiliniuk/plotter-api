import { Request, Response, NextFunction } from 'express';
import 'firebase/compat/auth';

import { fRefreshToken } from 'utils/firebase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;
    if (!refreshToken) {
      throw CustomError.UnauthorizedError();
    }
    const data = await fRefreshToken(refreshToken);
    return res.customSuccess(200, data);
  } catch (error) {
    throw CustomError.UnauthorizedError();
  }
};
