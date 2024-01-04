import mongoose from 'mongoose';

const mongodb = process.env.MONGO_URI || "";


const connectDB = async (): Promise<void> => {
    try {
      await mongoose.connect(mongodb);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      process.exit(1);
    }
  };
  
  export default connectDB;