import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};
const connection: connectionObject = {};

export const connectToDb = async (): Promise<void> => {
  if (connection.isConnected) {
    console.log("database is already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "");
    
    connection.isConnected = db.connections[0].readyState;
    console.log("DB connected successfully");
  } catch (error) {
    console.log("error connecting to DB: ", error);
    process.exit(1);
  }
};
