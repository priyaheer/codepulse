import express from 'express';
import authRoutes from './authRoutes.js';
import githubRoutes from './githubRoutes.js';
import projectRoutes from './projectRoutes.js';
import issueRoutes from './issueRoutes.js';
import aiRoutes from './aiRoutes.js';
import analyticsRoutes from './analyticsRoutes.js';
import architectureRoutes from './architectureRoutes.js';

const router = express.Router();
router.use('/auth', authRoutes);
router.use('/github', githubRoutes);
router.use('/projects', projectRoutes);
router.use('/issues', issueRoutes);
router.use('/ai', aiRoutes);
router.use('/analytics', analyticsRoutes);
router.use('/architecture', architectureRoutes);

export default router;
