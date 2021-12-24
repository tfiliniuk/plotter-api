import { Connection, createConnection } from 'typeorm';

import { initializeFirebase } from 'config/firebase';

import config from './config/ormconfig';

export const dbCreateConnection = async (): Promise<Connection | null> => {
  try {
    const conn = await createConnection(config);
    console.log(`Database connection success. Connection name: '${conn.name}' Database: '${conn.options.database}'`);
    initializeFirebase();
    console.log('Firebase initialized');
  } catch (err) {
    console.log(err);
  }
  return null;
};
