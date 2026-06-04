import { isDbConnected } from "../utils/connection.js";

export const requireDbConnection = (req, res, next) => {
  if (!isDbConnected()) {
    return res.status(503).json({
      status: false,
      message:
        "Database is not connected. Check MONGODB_URL and Atlas network access (allow your host IP or 0.0.0.0/0).",
    });
  }
  next();
};
