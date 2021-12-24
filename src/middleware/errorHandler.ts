import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';

import { CustomError } from 'utils/response/custom-error/CustomError';

export const errorHandler = (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    return res.status(err.httpStatus).json({ message: err.message, errors: err.errors });
  }
  return res.status(500).json({ message: 'Unexpected error' });
};
