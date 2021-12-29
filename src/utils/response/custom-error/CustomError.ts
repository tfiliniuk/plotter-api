import { ErrorType, ErrorValidation, ErrorResponse } from './types';

export class CustomError extends Error {
  httpStatus: number;
  errors: string[];

  constructor(httpStatusCode: number, message: string, errors: string[] = []) {
    super(message);
    this.httpStatus = httpStatusCode;
    this.errors = errors;
  }
  static UnauthorizedError() {
    return new CustomError(401, 'User Unauthorized');
  }

  static BadRequest(message: string, errors = []) {
    return new CustomError(400, message, errors);
  }

  static NotFound(message: string, errors = []) {
    return new CustomError(404, message, errors);
  }
  static firebaseError(message: string, errors = []) {
    return new CustomError(409, message, errors);
  }
}
