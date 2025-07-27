import chalk from "chalk";
import { AppDataSource } from "./../../configs/database.config";
import { DataSource } from "typeorm";
// import { AppDataSource } from

export class DatabaseModule {
  private static instance: DatabaseModule;

  private constructor() {}

  public static getInstance(): DatabaseModule {
    if (!DatabaseModule.instance) {
      DatabaseModule.instance = new DatabaseModule();
    }
    return DatabaseModule.instance;
  }

  public async initialize(): Promise<void> {
    try {
      await AppDataSource.initialize();
      console.log(chalk.bgGreen("Database connection established"));
    } catch (error) {
      console.error(chalk.bgRedBright("Database connection failed:", error));
      throw error;
    }
  }

  public getDataSource(): DataSource {
    return AppDataSource;
  }
}
