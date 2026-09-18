import mongoose from "mongoose";

let connectionPromise = null;

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.warn("MONGO_URL is not set, skipping MongoDB connection");
    return null;
  }
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(process.env.MONGO_URL)
      .then((m) => {
        console.log("MongoDB Connected successfully");
        return m.connection;
      })
      .catch((err) => {
        connectionPromise = null;
        console.error(`MongoDB error: ${err.message}`);
        throw err;
      });
  }
  return connectionPromise;
};
