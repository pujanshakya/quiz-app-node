import { Request, Response, Router } from "express";
import { validateBody } from "../middlewares/validation.middleware";
import { CreateUserDto, UpdateUserDto } from "../core/user/user.dto";
import { UserController } from "../core/user/user.controller";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.post("/", validateBody(CreateUserDto), userController.store);
userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.delete("/:id", userController.delete);
userRouter.put("/:id", validateBody(UpdateUserDto), userController.update);

export default userRouter;
