import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProjectAnalytics } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/projects/:id/analytics', requireAuth, getProjectAnalytics);

export default router;
