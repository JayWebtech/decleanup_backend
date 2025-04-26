import { Router } from 'express';
import { connectX, shareX } from '../controllers/social.controller';
import { requireAuth } from '../middleware/auth.middleware';

const router = Router();

// Twitter OAuth routes
router.get('/connect-x', requireAuth, connectX);
router.get('/connect-x/callback', connectX); 
router.post('/share-x', requireAuth, shareX);

export default router; 