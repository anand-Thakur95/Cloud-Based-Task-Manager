import mongoose from "mongoose";

const buildMongoUri = (uri) => {
  const trimmed = uri.trim();

  // URI already includes a database name
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
    throw new Error("MONGODB_URL is not set. Add it to your production environment variables.");
  }

  const uri = buildMongoUri(rawUri);

  mongoose.set("bufferCommands", false);

  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    maxPoolSize: 10,
  });

  console.log(`MongoDB connected: ${mongoose.connection.host}`);
};

export const isDbConnected = () => mongoose.connection.readyState === 1;

export default dbConnection;
