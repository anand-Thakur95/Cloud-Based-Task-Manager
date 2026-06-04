import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { isDbConnected } from "./utils/connection.js";
import cors from "cors";
import routes from "./routes/index.js";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware.js";
import { requireDbConnection } from "./middlewares/dbMiddleware.js";

dotenv.config();

for (const key of Object.keys(process.env)) {
  if (typeof process.env[key] === "string") {
    process.env[key] = process.env[key].trim();
  }
}

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL?.trim(),
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.get("/api/health", (req, res) => {
  res.status(isDbConnected() ? 200 : 503).json({
    status: isDbConnected(),
    message: isDbConnected() ? "OK" : "Database not connected",
  });
});

app.use("/api", requireDbConnection, routes);

app.use(routeNotFound);
app.use(errorHandler);

export default app;
