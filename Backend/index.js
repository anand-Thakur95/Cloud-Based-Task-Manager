import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import dbConnection from "./utils/connection.js";
import cors from "cors";
import routes from "./routes/index.js";
import { routeNotFound, errorHandler } from "./middlewares/errorMiddleware.js";



dotenv.config();


const PORT = process.env.PORT || 3000

dbConnection();

const app = express()

app.use(cors({
    origin: '*',
    credentials: true,
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser())
app.use(morgan("dev"));
app.use("/api", routes)


app.use(routeNotFound)
app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server listening on ${PORT}`))
