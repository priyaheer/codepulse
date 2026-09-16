import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { listUserRepos, getRepoDetails, getRepositoryTree, getRepositoryFile } from '../controllers/githubController.js';

const router = express.Router();

router.get('/repos', requireAuth, listUserRepos);
router.get('/repos/:owner/:repo', requireAuth, getRepoDetails);
router.get('/repos/:owner/:repo/tree', requireAuth, getRepositoryTree);
router.get('/repos/:owner/:repo/file', requireAuth, getRepositoryFile);

export default router;
