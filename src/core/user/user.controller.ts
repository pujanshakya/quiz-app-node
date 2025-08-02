import { NextFunction, Request, Response } from "express";
import { UserService } from "./user.service";
import { successResponse } from "../../helpers/response.helper";
import { Params } from "./user.dto";

export class UserController {
  private readonly userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  store = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.store(req.body);
      return successResponse(res, 200, result, "User created successfully!");
    } catch (e) {
      next(e);
    }
  };

  getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await this.userService.getAllUsers();
      return successResponse(res, 200, result, "User fetched successfully!");
    } catch (e) {
      next(e);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.update(+id, req.body);
      return successResponse(res, 200, result, "User updated successfully!");
    } catch (e) {
      next(e);
    }
  };

  getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.getUserById(+id);
      return successResponse(res, 200, result, "User fetched successfully!");
    } catch (e) {
      next(e);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const result = await this.userService.delete(+id);
      return successResponse(res, 200, result, "User deleted successfully!");
    } catch (e) {
      next(e);
    }
  };
}
