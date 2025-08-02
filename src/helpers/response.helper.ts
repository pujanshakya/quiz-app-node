import { Response } from "express";
import {
  IErrorResponse,
  ISuccessResponse,
} from "../shared/interfaces/response.interface";

/**
 * Success Response Object
 */
const SUCCESS: ISuccessResponse = {
  message: "",
  code: 200,
  status: true,
  data: null,
};

/**
 * Error Response Object
 */
const ERROR: IErrorResponse = {
  message: "",
  code: 500,
  status: false,
  description: null,
};

/**
 * Global function for success response object.
 * @param res
 * @param code
 * @param data
 * @param message
 * @returns
 */
export const successResponse = (
  res: Response,
  code: number,
  data: any,
  message: string = ""
) => {
  SUCCESS.message = message;
  SUCCESS.data = data;
  SUCCESS.code = code;
  return res.status(SUCCESS.code).send(SUCCESS);
};

/**
 * Global function for error response object
 * @param res
 * @param code
 * @param message
 * @param description
 * @returns
 */
export const errorResponse = (
  res: Response,
  code: number,
  message: string,
  description: any
) => {
  ERROR.message = message;
  ERROR.code = Number(code);
  ERROR.description = description;
  return res.status(ERROR.code).send(ERROR);
};
