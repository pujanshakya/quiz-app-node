import { Application, Request, Response, Router } from "express";
import userRouter from "./user.route";

const initRoutes = (app: Application) => {
  //   Health check route
  app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
      status: "OK",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // API v1 routes
  const v1Router = Router();

  v1Router.use("/users", userRouter);

  // Mount v1 router to main app
  app.use("/api/v1", v1Router);

  // 404 Handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      success: false,
      message: "Route not found",
    });
  });
};

export default initRoutes;
