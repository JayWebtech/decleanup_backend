import express from 'express';
import { getDashboardData } from '../controllers/dashboard.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Protected route that requires authentication
router.get('/data', authenticate, getDashboardData);

export default router; 