import { Issue } from '../models/Issue.js';
import { Project } from '../models/Project.js';
import { AISuggestion } from '../models/AISuggestion.js';
import { AppError } from '../middleware/errorHandler.js';
import mongoose from 'mongoose';

export async function listIssues(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Project not found', 404);
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) throw new AppError('Project not found', 404);
    const issues = await Issue.find({ projectId: project._id }).sort({ createdAt: -1 });
    res.json({ data: issues });
  } catch (err) {
    next(err);
  }
}

export async function getIssue(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Issue not found', 404);
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    const project = await Project.findOne({ _id: issue.projectId, userId: req.user._id });
    if (!project) throw new AppError('Issue not found', 404);
    res.json({ data: issue });
  } catch (err) {
    next(err);
  }
}

export async function updateIssueStatus(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Issue not found', 404);
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    const project = await Project.findOne({ _id: issue.projectId, userId: req.user._id });
    if (!project) throw new AppError('Issue not found', 404);
    issue.status = req.body.status;
    await issue.save();
    res.json({ data: issue });
  } catch (err) {
    next(err);
  }
}

export async function analyzeIssue(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Issue not found', 404);
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      throw new AppError('Issue not found', 404);
    }
    const project = await Project.findOne({ _id: issue.projectId, userId: req.user._id });
    if (!project) throw new AppError('Issue not found', 404);
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
