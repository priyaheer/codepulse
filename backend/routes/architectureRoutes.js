import express from 'express';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

router.get('/projects/:id/architecture', requireAuth, (req, res) => {
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

export default router;
