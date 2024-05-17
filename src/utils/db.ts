import mongoose from "mongoose";

type MongooseConnection = {
  isConnected?: number;
};

const connection: MongooseConnection = {};

const dbConnect = async (): Promise<void> => {
  if (connection.isConnected) {
    return;
  }
  const db = await mongoose.connect(process.env.MONGODB_URI as string);
  connection.isConnected = db.connections[0].readyState;
};

export default dbConnect;
