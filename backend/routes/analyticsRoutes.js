import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/projects/:id/analytics', requireAuth, (req, res) => {
  res.json({
    data: {
      health: [
        { name: 'Jan', score: 58 },
        { name: 'Feb', score: 61 },
        { name: 'Mar', score: 64 },
        { name: 'Apr', score: 72 },
        { name: 'May', score: 79 },
        { name: 'Jun', score: 81 },
      ],
      issues: [
        { name: 'Jan', count: 34 },
        { name: 'Feb', count: 31 },
        { name: 'Mar', count: 26 },
        { name: 'Apr', count: 21 },
        { name: 'May', count: 18 },
        { name: 'Jun', count: 14 },
      ],
      severity: {
        critical: 2,
        high: 4,
        medium: 6,
        low: 2,
      },
    },
  });
});

export default router;
