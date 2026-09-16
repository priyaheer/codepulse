import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProjectAnalytics, compareProjectScans } from '../controllers/analyticsController.js';

const router = express.Router();

router.get('/projects/:id/analytics', requireAuth, getProjectAnalytics);
router.get('/projects/:id/compare', requireAuth, compareProjectScans);

export default router;
