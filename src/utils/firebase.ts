import axios from 'axios';
import 'firebase/compat/auth';
import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase/compat/app';

import { captureException } from './error';
import { CustomError } from './response/custom-error/CustomError';

interface FirebaseUserRequest extends firebaseAdmin.auth.CreateRequest {
  displayName?: string;
  email?: string;
  password?: string;
}

interface FirebaseAuthResponse {
  uid: string;
  token: string;
  refreshToken: string;
}

const fCreateErrorCodes = [
  'auth/invalid-password',
  'auth/invalid-email',
  'auth/invalid-phone-number',
  'auth/phone-number-already-exists',
];

export async function fGetUserByEmail(email: string): Promise<firebaseAdmin.auth.UserRecord | null> {
  try {
    const userRecord = await firebaseAdmin.auth().getUserByEmail(email);
    return userRecord;
  } catch (error) {
    captureException(error);
    return null;
  }
}

async function fCreateUser(user: FirebaseUserRequest): Promise<firebaseAdmin.auth.UserRecord> {
  try {
    const userRecord: firebaseAdmin.auth.UserRecord = await firebaseAdmin.auth().createUser(user);

    return userRecord;
  } catch (err) {
    let errorMessage = 'Cannot create firebase user!';
    if (fCreateErrorCodes.includes(err.code)) {
      errorMessage += ` ${err.message}`;
    }

    captureException(err);
    throw CustomError.BadRequest(errorMessage);
  }
}

export async function fGetOrCreateUser(user: FirebaseUserRequest): Promise<string> {
  let userRecord = await fGetUserByEmail(user.email);
  if (!userRecord) {
    userRecord = await fCreateUser(user);
  } else if (user.password) {
    await firebaseAdmin.auth().updateUser(userRecord.uid, {
      password: user.password,
    });
  }
  return userRecord.uid;
}

export async function fCreateToken(uid: string): Promise<FirebaseAuthResponse> {
  const customToken: string = await firebaseAdmin.auth().createCustomToken(uid);
  await firebase.auth().signInWithCustomToken(customToken);
  const token: string = await firebase.auth().currentUser.getIdToken(true);

  return {
    uid,
    token,
    refreshToken: firebase.auth().currentUser.refreshToken,
  };
}

export async function fSignInWithEmailAndPassword(email: string, password: string): Promise<FirebaseAuthResponse> {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    const token: string = await firebase.auth().currentUser.getIdToken(true);

    return {
      uid: firebase.auth().currentUser.uid,
      token,
      refreshToken: firebase.auth().currentUser.refreshToken,
    };
  } catch (err) {
    if (err.code === 'auth/user-disabled') {
      throw CustomError.firebaseError(err.message);
    }

    throw CustomError.BadRequest('This email or password is not valid');
  }
}

export async function fVerifyToken(idToken: string): Promise<{
  uid: string;
} | null> {
  try {
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(idToken, true);

    return { uid: decodedToken.uid };
  } catch (error) {
    return null;
  }
}

export async function fRefreshToken(refreshToken: string): Promise<{
  uid: string;
  token: string;
  refreshToken: string;
} | null> {
  try {
    const { data } = await axios({
      url: `https://securetoken.googleapis.com/v1/token?key=${process.env.API_KEY}`,
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    return {
      uid: data.user_id,
      token: data.access_token,
      refreshToken: data.refresh_token,
    };
  } catch (error) {
    return null;
  }
}

export async function fResetPassword(email: string) {
  try {
    return await firebase.auth().sendPasswordResetEmail(email);
  } catch (error) {
    return null;
  }
}
