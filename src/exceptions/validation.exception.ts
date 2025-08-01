export class ValidationException extends Error {
  readonly status: number;
  readonly errors: { [key: string]: string[] }[];
  constructor(statusCode: number, errors: { [key: string]: string[] }[]) {
    super();

    this.status = statusCode;
    this.errors = errors;
    this.message = "Validation error";
  }
}
