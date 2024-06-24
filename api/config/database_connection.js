import mongoose from "mongoose";

export const database_connection = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL);
    console.log("connected to the database", conn.connection.host);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
