import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { DatabaseModule } from "./src/shared/database/database.module";
import * as dotenv from "dotenv";
import chalk from "chalk";
import initRoutes from "./src/routes";
dotenv.config();
class App {
  public app: Application;
  private databaseModule: DatabaseModule;

  constructor() {
    this.app = express();
    this.databaseModule = DatabaseModule.getInstance();
    this.initializeMiddlewares();
    this.initializeErrorHandling();
    initRoutes(this.app);
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
      const PORT = process.env.APP_PORT || 3000;
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
