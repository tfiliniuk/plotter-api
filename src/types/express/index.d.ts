export {};

declare global {
  namespace Express {
    export interface Request {
      user?: {
        email: string;
        id: number;
        firstName: string;
        lastName: string;
      };
    }
    export interface Response {
      customSuccess(httpStatusCode: number, data?: any): Response;
    }
  }
}
