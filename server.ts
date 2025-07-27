import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { DatabaseModule } from "./src/shared/database/database.module";
import * as dotenv from "dotenv";
import chalk from "chalk";
dotenv.config();
class App {
  public app: Application;
  private databaseModule: DatabaseModule;

  constructor() {
    this.app = express();
    this.databaseModule = DatabaseModule.getInstance();
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Security middleware
    this.app.use(helmet());
    this.app.use(cors());

    // Logging middleware
    this.app.use(morgan("combined"));

    // Body parsing middleware
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Health check route
    this.app.get("/health", (req: Request, res: Response) => {
      res.status(200).json({
        status: "OK",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
      });
    });

    // 404 Handler
    this.app.use((req: Request, res: Response) => {
      res.status(404).json({
        success: false,
        message: "Route not found",
      });
    });
  }

  private initializeErrorHandling(): void {
    this.app.use((error: Error, req: Request, res: Response, next: any) => {
      console.error(chalk.red("Error:", error));

      res.status(500).json({
        success: false,
        message:
          process.env.NODE_ENV === "production"
            ? "Internal server error"
            : error.message,
      });
    });
  }

  public async start(): Promise<void> {
    try {
      // Initialize database
      await this.databaseModule.initialize();

      // Start server
      const PORT = process.env.PORT || 3000;
      this.app.listen(PORT, () => {
        console.log(chalk.bgGreen(`Server running on port ${PORT}`));
        console.log(
          chalk.green(`Health check: http://localhost:${PORT}/health`)
        );
        console.log(
          chalk.green(`API base URL: http://localhost:${PORT}/api/v1`)
        );
      });
    } catch (error) {
      console.error(chalk.red("Failed to start application:", error));
      process.exit(1);
    }
  }
}

// Bootstrap application
const app = new App();
app.start();

export default app;
