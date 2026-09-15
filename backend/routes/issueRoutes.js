import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listIssues, getIssue, updateIssueStatus } from '../controllers/issueController.js';
import { aiAnalyzeIssue, suggestIssueFix } from '../controllers/aiController.js';

const router = express.Router();

router.get('/:id', requireAuth, getIssue);
router.patch('/:id/status', requireAuth, updateIssueStatus);
router.post('/:id/analyze', requireAuth, aiAnalyzeIssue);
router.post('/:id/suggest-fix', requireAuth, suggestIssueFix);

export default router;
