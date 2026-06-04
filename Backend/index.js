import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/connection.js";
import cors from "cors";
import routes from "./routes/index.js";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware.js";



dotenv.config();

// Normalize .env values (trailing spaces break CORS, JWT, and MongoDB)
for (const key of Object.keys(process.env)) {
  if (typeof process.env[key] === "string") {
    process.env[key] = process.env[key].trim();
  }
}

const PORT = process.env.PORT || 3000

dbConnection();

const app = express()

app.use(cors({
    origin: process.env.FRONTEND_URL?.trim(),
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(morgan("dev"));
app.use("/api", routes)


app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))