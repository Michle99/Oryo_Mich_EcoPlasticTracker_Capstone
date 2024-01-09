import express from 'express';
import { submitPollutionReport, getAllPollutionReports, updatePollutionReport, deletePollutionReport } from '../controllers/pollution-report.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

// Submit pollution report route (protected)
router.post('/submit', authenticateUser, submitPollutionReport);

// Get all pollution reports route
router.get('/all', getAllPollutionReports);

// Update pollution report route (protected)
router.put('/update/:id', authenticateUser, updatePollutionReport);

// Delete pollution report route (protected)
router.delete('/delete/:id', authenticateUser, deletePollutionReport);

export default router;
