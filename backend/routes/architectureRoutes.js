import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Project } from '../models/Project.js';
import { Scan } from '../models/Scan.js';
import { AppError } from '../middleware/errorHandler.js';

const router = express.Router();

router.get('/projects/:id/architecture', requireAuth, async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) throw new AppError('Project not found', 404);
    const scan = await Scan.findOne({ projectId: project._id, status: 'completed' }).sort({ completedAt: -1, createdAt: -1 }).select('architectureSummary');
    res.json({ data: scan?.architectureSummary || null });
  } catch (err) {
    next(err);
  }
});

export default router;
