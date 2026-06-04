import mongoose from "mongoose";

const buildMongoUri = (uri) => {
  const trimmed = uri.trim();

  if (/\.mongodb\.net\/[^/?]+/.test(trimmed)) {
    return trimmed;
  }

  const [base, query = ""] = trimmed.split("?");
  const cleanBase = base.replace(/\/$/, "");
  const params = query || "retryWrites=true&w=majority";

  return `${cleanBase}/taskmanager?${params}`;
};

const dbConnection = async () => {
  const rawUri = process.env.MONGODB_URL?.trim();

  if (!rawUri) {
    throw new Error(
      "MONGODB_URL is not set. Add it to your Vercel project environment variables."
    );
  }

  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  if (global.mongoose?.promise) {
    await global.mongoose.promise;
    return mongoose.connection;
  }

  const uri = buildMongoUri(rawUri);

  mongoose.set("bufferCommands", false);

  global.mongoose = {
    promise: mongoose
      .connect(uri, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        maxPoolSize: 10,
      })
      .then((connection) => {
        console.log(`MongoDB connected: ${connection.connection.host}`);
        return connection;
      }),
  };

  await global.mongoose.promise;
  return mongoose.connection;
};

export const isDbConnected = () => mongoose.connection.readyState === 1;

export default dbConnection;
