import { Request, Response, NextFunction } from 'express';

import { authService } from 'services/auth.service';
import { normalizeEmailAddress, normalizePassword } from 'utils/normalize';

export const email = async (req: Request, res: Response, next: NextFunction) => {
  const { email: rawEmail, password: rawPassword, first_name, last_name } = req.body;

  try {
    const email = normalizeEmailAddress(rawEmail);
    const password = normalizePassword(rawPassword);
    const userData = await authService.registration(email, password, first_name, last_name);
    res.cookie('refreshToken', userData.refreshToken, { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true });
    return res.customSuccess(200, userData);
  } catch (error) {
    return next(error);
  }
};
