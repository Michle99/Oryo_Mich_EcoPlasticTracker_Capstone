"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
// Registration route
router.post('/signup', auth_controller_1.registerUser);
// Login route
router.post('/login', auth_controller_1.loginUser);
router.post('/logout', auth_controller_1.logoutUser);
exports.default = router;
