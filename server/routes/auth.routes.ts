import express from 'express';
import { registerUser, loginUser } from '../controllers/auth.controller';

const router = express.Router();

// Registration route
router.post('/signup', registerUser);

// Login route
router.post('/login', loginUser);

export default router;
