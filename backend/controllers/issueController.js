import { Issue } from '../models/Issue.js';
import { AISuggestion } from '../models/AISuggestion.js';
import { AppError } from '../middleware/errorHandler.js';

export async function listIssues(req, res, next) {
  try {
    const issues = await Issue.find({ projectId: req.params.id }).sort({ createdAt: -1 });
    res.json({ data: issues });
  } catch (err) {
    next(err);
  }
}

export async function getIssue(req, res, next) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    res.json({ data: issue });
  } catch (err) {
    next(err);
  }
}

export async function updateIssueStatus(req, res, next) {
  try {
    const issue = await Issue.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    res.json({ data: issue });
  } catch (err) {
    next(err);
  }
}

export async function analyzeIssue(req, res, next) {
  try {
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    const suggestion = await AISuggestion.create({
      issueId: issue._id,
      summary: 'AI analysis is temporarily unavailable. Scanner results are still available.',
      whyItMatters: 'The underlying scanner has already identified the issue and the recommendation remains available from the project health data.',
      impact: 'medium',
      recommendation: 'Review the scanner finding and confirm the fix path before deployment.',
      suggestedCode: '',
      confidence: 0.7,
      aiAvailable: false,
    });

    issue.aiAnalysisId = suggestion._id;
    await issue.save();
    res.json({ data: suggestion });
  } catch (err) {
    next(err);
  }
}
