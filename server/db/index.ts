import mongoose from 'mongoose';
import '../load_envs'

const mongodb = process.env.MONGO_URI || "";

console.log("Connection string:", mongodb);


const connectDB = async () => {
    try {
      await mongoose.connect(mongodb);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  
  export default connectDB;