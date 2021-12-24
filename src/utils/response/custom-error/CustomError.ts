import { ErrorType, ErrorValidation, ErrorResponse } from './types';

export class CustomError extends Error {
  httpStatus: number;
  // private errorType: ErrorType;
  errors: string[];
  // private errorRaw: any;
  // private errorsValidation: ErrorValidation[] | null;

  constructor(
    httpStatusCode: number,
    // errorType: ErrorType,
    message: string,
    errors: string[] = [],
    // errorRaw: any = null,
    // errorsValidation: ErrorValidation[] | null = null,
  ) {
    super(message);

    // this.name = this.constructor.name;
    this.httpStatus = httpStatusCode;
    // this.errorType = errorType;
    this.errors = errors;
    // this.errorRaw = errorRaw;
    // this.errorsValidation = errorsValidation;
  }
  // get HttpStatusCode() {
  //   return this.httpStatus;
  // }

  // get JSON(): ErrorResponse {
  //   return {
  //     errorType: this.errorType,
  //     errorMessage: this.message,
  //     errors: this.errors,
  //     errorRaw: this.errorRaw,
  //     errorsValidation: this.errorsValidation,
  //     stack: this.stack,
  //   };
  // }

  static UnauthorizedError() {
    return new CustomError(401, 'User Unauthorized');
  }

  static BadRequest(message, errors = []) {
    return new CustomError(400, message, errors);
  }

  static NotFound(message, errors = []) {
    return new CustomError(404, message, errors);
  }
}
