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

function issueKey(issue) {
  return issue.fingerprint || [issue.category, issue.rule, issue.file, issue.line || '', String(issue.evidence || '').trim()].join('|').toLowerCase();
}

export async function compareProjectScans(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.id) || !mongoose.isValidObjectId(req.query.from) || !mongoose.isValidObjectId(req.query.to)) throw new AppError('Two completed scans are required', 400);
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id }).lean();
    if (!project) throw new AppError('Project not found', 404);
    const scans = await Scan.find({ _id: { $in: [req.query.from, req.query.to] }, projectId: project._id, status: 'completed' }).lean();
    if (scans.length !== 2) throw new AppError('Two completed scans are required', 400);
    const scanA = scans.find((scan) => scan._id.toString() === req.query.from);
    const scanB = scans.find((scan) => scan._id.toString() === req.query.to);
    const [issuesA, issuesB] = await Promise.all([Issue.find({ projectId: project._id, scanId: scanA._id }).lean(), Issue.find({ projectId: project._id, scanId: scanB._id }).lean()]);
    const mapA = new Map(issuesA.map((issue) => [issueKey(issue), issue]));
    const mapB = new Map(issuesB.map((issue) => [issueKey(issue), issue]));
    const resolved = issuesA.filter((issue) => !mapB.has(issueKey(issue)));
    const added = issuesB.filter((issue) => !mapA.has(issueKey(issue)));
    const persistent = issuesB.filter((issue) => mapA.has(issueKey(issue)));
    const metric = (key) => ({ from: scanA.issueCounts?.[key] ?? 0, to: scanB.issueCounts?.[key] ?? 0, change: (scanB.issueCounts?.[key] ?? 0) - (scanA.issueCounts?.[key] ?? 0) });
    res.json({ data: {
      project: { id: project._id, repository: project.fullName || `${project.owner}/${project.name}` },
      from: { id: scanA._id, createdAt: scanA.createdAt, commitSha: scanA.commitSha, healthScore: scanA.healthScore, scores: scanA.scores, issueCounts: scanA.issueCounts },
      to: { id: scanB._id, createdAt: scanB.createdAt, commitSha: scanB.commitSha, healthScore: scanB.healthScore, scores: scanB.scores, issueCounts: scanB.issueCounts },
      health: { from: scanA.healthScore, to: scanB.healthScore, change: scanB.healthScore - scanA.healthScore },
      metrics: { total: metric('total'), critical: metric('critical'), high: metric('high'), medium: metric('medium'), low: metric('low') },
      categories: Object.fromEntries(['security', 'dependency', 'performance', 'architecture', 'code-quality'].map((category) => {
        const count = (items) => items.filter((issue) => issue.category === category).length;
        return [category, { from: count(issuesA), to: count(issuesB), change: count(issuesB) - count(issuesA) }];
      })),
      issues: { resolved, new: added, persistent },
    } });
  } catch (err) {
    next(err);
  }
}