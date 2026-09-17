import express from 'express';
import { githubCallback, githubRedirect, exchangeOAuthCode, getMe, logout } from '../controllers/authController.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/github', githubRedirect);
router.get('/github/callback', githubCallback);
router.post('/exchange', exchangeOAuthCode);
router.get('/me', requireAuth, getMe);
router.post('/logout', logout);

export default router;
