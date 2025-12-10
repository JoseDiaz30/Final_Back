import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
    const uri = process.env.MONGO_URI 
    if (!uri) {
        console.error("MONGO_URI no esta definido");
        process.exit(1);
    }

    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB conectado: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error al conectar a MongoDB: ${error.message}`);
      console.error(error);
      process.exit(1);
    }
};

export default connectDB;