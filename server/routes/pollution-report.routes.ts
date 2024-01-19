import express from 'express';
import { submitPollutionReport, getAllPollutionReports, updatePollutionReport, deletePollutionReport } from '../controllers/pollution-report.controller';
import { authenticateUser } from '../middlewares/auth.middleware';

const router = express.Router();

// Submit pollution report route (protected)
router.post('/submit', submitPollutionReport);

// Get all pollution reports route
router.get('/all', getAllPollutionReports);

// Update pollution report route (protected)
router.put('/update/:id', updatePollutionReport);

// Delete pollution report route (protected)
router.delete('/delete/:id', deletePollutionReport);

export default router;
