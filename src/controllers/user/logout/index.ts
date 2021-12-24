import { Request, Response, NextFunction } from 'express';
import firebase from 'firebase/compat/app';

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('refreshToken');
  await firebase.auth().signOut();
  return res.customSuccess(200, 'Successfully logged out.');
};
