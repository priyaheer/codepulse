import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { aiAnalyzeIssue, askProjectAI } from '../controllers/aiController.js';

const router = express.Router();

router.post('/issues/:id/analyze', requireAuth, aiAnalyzeIssue);
router.post('/projects/:id/ask-ai', requireAuth, askProjectAI);

export default router;
