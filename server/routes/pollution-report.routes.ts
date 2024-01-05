import express from 'express';
import { submitPollutionReport, getAllPollutionReports } from '../controllers/pollution-report.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

// Submit pollution report route (protected)
router.post('/submit', authenticateUser, submitPollutionReport);

// Get all pollution reports route
router.get('/all', getAllPollutionReports);

export default router;
