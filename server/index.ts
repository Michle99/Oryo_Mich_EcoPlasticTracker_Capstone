import express, { Application } from 'express';
import connectDB from './db';
import authRoutes from "./routes/auth.routes"
import pollutionReportRoutes from './routes/pollution-report.routes';


const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// MongoDB Connection
connectDB();

// Auth Routes
app.use('/api/auth', authRoutes);

// Pollution Report Routes
app.use('/api/reports', pollutionReportRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});