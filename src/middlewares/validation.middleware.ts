import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import { ValidationException } from "../exceptions/validation.exception";

export function validateBody<T>(targetClass: any) {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      req.body = plainToInstance(targetClass, req.body);
      const errors = await validate(req.body, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      if (errors.length > 0) {
        const validationMessageBag: { [key: string]: string[] }[] = [];
        for (const error of errors) {
          let validationMessageStack: { [key: string]: string[] } = {};

          validationMessageStack[error.property] = [];

          for (const message in error.constraints) {
            validationMessageStack[error.property].push(
              error.constraints[message]
            );
          }

          validationMessageBag.push(validationMessageStack);
        }
        throw new ValidationException(404, validationMessageBag);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
