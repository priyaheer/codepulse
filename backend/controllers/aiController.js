import { AppError } from '../middleware/errorHandler.js';

export async function aiAnalyzeIssue(req, res, next) {
  try {
    res.json({
      data: {
        summary: 'AI analysis is temporarily unavailable. Scanner results are still available.',
        whyItMatters: 'The repository scan already identified the issue and can be used for immediate triage.',
        impact: 'medium',
        recommendation: 'Use the scanner output as the source of truth until the provider is available.',
        suggestedCode: '',
        confidence: 0.7,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function askProjectAI(req, res, next) {
  try {
    res.json({
      data: {
        answer: 'This repository is currently in demo mode, so AI responses are limited to repository evidence and scan metadata only.',
        evidence: ['backend/middleware/auth.js', 'backend/services/githubService.js', 'frontend/src/App.jsx'],
      },
    });
  } catch (err) {
    next(err);
  }
}
