import express from 'express';
import { submitPoI } from '../controllers/poi.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Route to submit PoI (requires authentication)
router.post('/submit', authenticate, submitPoI);

export default router; 