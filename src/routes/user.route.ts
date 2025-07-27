import { Request, Response, Router } from "express";

const userRouter: Router = Router();

userRouter.get("/", (req: Request, res: Response) => {
  return res.status(200).json({
    status: "success",
    data: "I am on user route",
  });
});

export default userRouter;
