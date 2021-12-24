import { Request, Response, NextFunction } from 'express';
import 'firebase/compat/auth';
import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase/compat/app';

import { fVerifyToken } from 'utils/firebase';
import { CustomError } from 'utils/response/custom-error/CustomError';

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      throw CustomError.UnauthorizedError();
    }
    const userData = await fVerifyToken(refreshToken);
    await firebase.auth().signInWithCustomToken(refreshToken);
    const token: string = await firebase.auth().currentUser.getIdToken(true);
    console.log('sss', token);

    // console.log('userData', userData);
    return res.json('test');
  } catch (error) {
    return false;
  }
};
