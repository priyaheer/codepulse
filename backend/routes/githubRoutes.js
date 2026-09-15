import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listUserRepos, getRepoDetails } from '../controllers/githubController.js';

const router = express.Router();

router.get('/repos', requireAuth, listUserRepos);
router.get('/repos/:owner/:repo', requireAuth, getRepoDetails);

export default router;
