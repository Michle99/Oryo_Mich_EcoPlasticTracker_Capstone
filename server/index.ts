import express, { Application } from 'express';
import connectDB from './db';
import authRoutes from "./routes/auth.routes"
import pollutionReportRoutes from './routes/pollution-report.routes';
import cors from 'cors'
import bodyParser from 'body-parser';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.json({ limit: '50mb' }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200,
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept, Authorization",
}));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

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