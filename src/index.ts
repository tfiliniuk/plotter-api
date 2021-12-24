import 'dotenv/config';
import 'reflect-metadata';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import './utils/response/customSuccess';
import { errorHandler } from 'middleware/errorHandler';

import routes from './routes';
import { dbCreateConnection } from './typeorm/dbCreateConnection';

export const app = express();
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  }),
);
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan('combined'));
}
app.use('/api', routes);
app.use(errorHandler);
const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on port ${port}`));

(async () => {
  await dbCreateConnection();
})();
