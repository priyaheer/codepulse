import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { startProjectScan, listProjectScans, getProjectScan } from '../controllers/scanController.js';

const router = express.Router({ mergeParams: true });

router.post('/:id/scan', requireAuth, startProjectScan);
router.get('/:id/scans', requireAuth, listProjectScans);
router.get('/:id/scans/:scanId', requireAuth, getProjectScan);

export default router;
