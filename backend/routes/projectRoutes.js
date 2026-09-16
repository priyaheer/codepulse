import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { Project } from '../models/Project.js';
import { requireFields } from '../middleware/validate.js';
import { listProjects, createProject, getProject, deleteProject } from '../controllers/projectController.js';
import { startProjectScan, listProjectScans, getProjectScan } from '../controllers/scanController.js';
import { listIssues } from '../controllers/issueController.js';
import { askProjectAI } from '../controllers/aiController.js';
import { Scan } from '../models/Scan.js';

const router = express.Router();

router.get('/', requireAuth, listProjects);
router.post('/', requireAuth, requireFields('name', 'owner', 'repository'), createProject);
router.get('/:id', requireAuth, getProject);
router.delete('/:id', requireAuth, deleteProject);
router.post('/:id/scan', requireAuth, startProjectScan);
router.get('/:id/scans', requireAuth, listProjectScans);
router.get('/:id/scans/:scanId', requireAuth, getProjectScan);
router.get('/:id/issues', requireAuth, listIssues);
router.get('/:id/architecture', requireAuth, async (req, res, next) => {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) return res.status(404).json({ error: { message: 'Project not found' } });
    const scan = await Scan.findOne({ projectId: project._id, status: 'completed' }).sort({ completedAt: -1, createdAt: -1 }).select('architectureSummary');
    res.json({ data: scan?.architectureSummary || null });
  } catch (err) {
    next(err);
  }
});
router.post('/:id/ask-ai', requireAuth, askProjectAI);
export default router;
