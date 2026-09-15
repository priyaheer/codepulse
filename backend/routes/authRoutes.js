import express from 'express';
import { githubCallback, githubRedirect, getMe, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/github', githubRedirect);
router.get('/github/callback', githubCallback);
router.get('/me', requireAuth, getMe);
router.post('/logout', logout);

export default router;
