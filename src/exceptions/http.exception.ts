export class HttpException extends Error {
  status: string;
  constructor(statusCode: string, message: string) {
    super();

    this.status = statusCode;
    this.message = message;
  }
}
