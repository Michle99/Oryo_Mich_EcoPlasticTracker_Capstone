"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pollution_report_controller_1 = require("../controllers/pollution-report.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
// Submit pollution report route (protected)
router.post('/submit', auth_middleware_1.authenticateUser, pollution_report_controller_1.submitPollutionReport);
// Get all pollution reports route
router.get('/all', auth_middleware_1.authenticateUser, pollution_report_controller_1.getAllPollutionReports);
// get location coordinates for all reports
router.get('/locations', auth_middleware_1.authenticateUser, pollution_report_controller_1.getLocationCoordinates);
// Update pollution report route (protected)
router.put('/update/:id', auth_middleware_1.authenticateUser, pollution_report_controller_1.updatePollutionReport);
// Delete pollution report route (protected)
router.delete('/delete/:id', auth_middleware_1.authenticateUser, pollution_report_controller_1.deletePollutionReport);
exports.default = router;
