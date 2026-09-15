import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { askProjectAI } from '../controllers/aiController.js';

const router = express.Router();

router.post('/projects/:id/ask-ai', requireAuth, askProjectAI);

export default router;
