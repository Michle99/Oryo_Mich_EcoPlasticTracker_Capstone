import mongoose from 'mongoose';
import '../load_envs';
const mongodbConn = process.env.MONGO_URI || "";
const connectDB = async () => {
    try {
        await mongoose.connect(mongodbConn, {
            dbName: "environmental_monitoring"
        });
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};
export default connectDB;
