import mongoose from 'mongoose';
import { Project } from '../models/Project.js';
import { Scan } from '../models/Scan.js';
import { Issue } from '../models/Issue.js';
import { AppError } from '../middleware/errorHandler.js';

export async function getProjectAnalytics(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) throw new AppError('Project not found', 404);
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id }).lean();
    if (!project) throw new AppError('Project not found', 404);

    const scans = await Scan.find({ projectId: project._id, status: 'completed' }).sort({ createdAt: 1 }).lean();
    const issues = await Issue.find({ projectId: project._id }).select('scanId severity category status').lean();
    const issueByScan = new Map();

    for (const issue of issues) {
      const scanId = issue.scanId.toString();
      if (!issueByScan.has(scanId)) issueByScan.set(scanId, { total: 0, resolved: 0, critical: 0, high: 0, medium: 0, low: 0, categories: {} });
      const counts = issueByScan.get(scanId);
      counts.total += 1;
      if (counts[issue.severity] !== undefined) counts[issue.severity] += 1;
      if (issue.status === 'resolved') counts.resolved += 1;
      counts.categories[issue.category] = (counts.categories[issue.category] || 0) + 1;
    }

    const history = scans.map((scan) => ({
      id: scan._id,
      createdAt: scan.createdAt,
      startedAt: scan.startedAt,
      completedAt: scan.completedAt,
      durationMs: scan.startedAt && scan.completedAt ? new Date(scan.completedAt) - new Date(scan.startedAt) : null,
      status: scan.status,
      branch: scan.branch,
      commitSha: scan.commitSha,
      healthScore: scan.healthScore,
      scores: scan.scores,
      issueCounts: scan.issueCounts,
      progress: scan.progress instanceof Map ? Object.fromEntries(scan.progress) : (scan.progress || {}),
      architectureSummary: scan.architectureSummary,
      error: scan.error,
      findings: issueByScan.get(scan._id.toString()) || { total: 0, resolved: 0, critical: 0, high: 0, medium: 0, low: 0, categories: {} },
    }));

    const latest = history.at(-1) || null;
    const previous = history.at(-2) || null;
    res.json({ data: {
      project: { id: project._id, name: project.name, owner: project.owner, repository: project.fullName || `${project.owner}/${project.name}`, defaultBranch: project.defaultBranch, language: project.language, isPrivate: project.isPrivate, stars: project.stars },
      latest,
      previous,
      scoreChange: latest && previous ? latest.healthScore - previous.healthScore : null,
      history,
      hasTrend: history.length > 1,
      insufficientHistory: history.length < 2,
    } });
  } catch (err) {
    next(err);
  }
}