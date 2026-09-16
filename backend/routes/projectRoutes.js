import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireFields } from '../middleware/validate.js';
import { listProjects, createProject, getProject, deleteProject } from '../controllers/projectController.js';
import { startProjectScan, listProjectScans, getProjectScan } from '../controllers/scanController.js';
import { listIssues } from '../controllers/issueController.js';
import { askProjectAI } from '../controllers/aiController.js';

const router = express.Router();

router.get('/', requireAuth, listProjects);
router.post('/', requireAuth, requireFields('name', 'owner', 'repository'), createProject);
router.get('/:id', requireAuth, getProject);
router.delete('/:id', requireAuth, deleteProject);
router.post('/:id/scan', requireAuth, startProjectScan);
router.get('/:id/scans', requireAuth, listProjectScans);
router.get('/:id/scans/:scanId', requireAuth, getProjectScan);
router.get('/:id/issues', requireAuth, listIssues);
router.get('/:id/architecture', requireAuth, (req, res) => {
  res.json({
    data: {
      frontend: 'React',
      backend: 'Express',
      database: 'MongoDB',
      routing: 'React Router + Express routes',
      apiLayer: 'REST API / controllers',
      authentication: 'GitHub OAuth + JWT',
      stateManagement: 'React context',
      directories: ['frontend/src', 'backend/controllers', 'backend/models', 'backend/services'],
      diagram: ['User', 'React UI', 'API Service', 'Express', 'Controllers', 'Database'],
    },
  });
});
router.post('/:id/ask-ai', requireAuth, askProjectAI);
export default router;
