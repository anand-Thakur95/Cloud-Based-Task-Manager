export const routeNotFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  const isDbError =
    err.name === "MongooseError" ||
    err.message?.includes("buffering timed out") ||
    err.message?.includes("before initial connection");

  res.status(isDbError ? 503 : statusCode).json({
    status: false,
    message: isDbError
      ? "Database connection failed. Verify MONGODB_URL and MongoDB Atlas network access."
      : err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
