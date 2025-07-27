import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres", // or "postgres", "sqlite", etc.
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  username: process.env.DB_USERNAME || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: process.env.DB_NAME || "simple-quiz-app",
  synchronize: false, // auto create tables
  logging: false,
  entities: [], // or ["src/entity/**/*.ts"]
  //   migrations: ["src/migration/**/*.ts"],
  //   subscribers: ["src/subscriber/**/*.ts"],
});
