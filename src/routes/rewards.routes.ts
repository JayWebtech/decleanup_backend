import { Router } from 'express';
import { claimReward } from '../controllers/rewards.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

router.post('/claim', requireAuth, claimReward);

export default router; 