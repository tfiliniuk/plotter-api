import firebaseAdmin from 'firebase-admin';
import firebase from 'firebase/compat/app';

const firebaseConfig2 = {
  apiKey: 'AIzaSyBkLCTljDKfpJIbeGuwRJD4oQNDVrs106M',
  authDomain: 'plotter-starter.firebaseapp.com',
  databaseURL: 'https://plotter-starter-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'plotter-starter',
  storageBucket: 'plotter-starter.appspot.com',
  messagingSenderId: '37979644281',
  appId: '1:637979644281:web:10aaf851775d89631f5fa8',
};

export const initializeFirebase = () => {
  const firebaseConfig = {
    projectId: process.env.PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.CLIENT_EMAIL,
  };

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(firebaseConfig),
    databaseURL: process.env.DATABASE_URL,
  });

  firebase.initializeApp(firebaseConfig2);
};
