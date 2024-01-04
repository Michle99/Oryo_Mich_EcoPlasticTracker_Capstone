import express, { Application } from 'express';
import mongoose from 'mongoose';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB Connection
const MONGO_URI = 'mongodb://127.0.0.1:27017/environmental_monitoring';
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});