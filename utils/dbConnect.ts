import mongoose from "mongoose";

const dbConnect = async (): Promise<void> => {
  try {
    const { connection } = await mongoose.connect(
      process.env.MONGO_URI as string
    );
    if (connection.readyState === 1) {
      console.log("Database connected");
    }
  } catch (err: any) {
    console.error(err.message);
  }
};

export default dbConnect;
