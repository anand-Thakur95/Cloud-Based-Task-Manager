import app from "../app.js";
import dbConnection from "../utils/connection.js";

await dbConnection();

export default app;
