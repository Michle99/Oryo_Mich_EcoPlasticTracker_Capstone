import express from 'express';
import { 
    submitPollutionReport, 
    getAllPollutionReports, 
    updatePollutionReport, 
    deletePollutionReport, 
    getLocationCoordinates, 
    upload
} from '../controllers/pollution-report.controller';
import { 
    authenticateUser 
} from '../middlewares/auth.middleware';

const router = express.Router();

// Submit pollution report route (protected)
router.post('/submit', authenticateUser, upload.array('images', 5), submitPollutionReport);

// Get all pollution reports route
router.get('/all', authenticateUser, getAllPollutionReports);

// get location coordinates for all reports
router.get('/locations', authenticateUser, getLocationCoordinates);

// Update pollution report route (protected)
router.put('/update/:id', authenticateUser, updatePollutionReport);

// Delete pollution report route (protected)
router.delete('/delete/:id', authenticateUser, deletePollutionReport);

export default router;
