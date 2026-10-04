import mongoose from "mongoose";

export async function connectDB() {
  const mongoUri =
    process.env.MONGO_URI || "mongodb://localhost:27017/agrilink";

  try {
    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
    });
    console.log(`[MongoDB] Connected: ${conn.connection.host}`);
  } catch (err) {
    console.warn(
      `[MongoDB] Notice: Could not connect to MongoDB at ${mongoUri}. Operating with in-memory persistence.`,
    );
  }
}
