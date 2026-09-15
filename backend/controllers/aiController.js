import { Issue } from '../models/Issue.js';
import { Project } from '../models/Project.js';
import { AISuggestion } from '../models/AISuggestion.js';
import { AppError } from '../middleware/errorHandler.js';
import { getFileContent, getRepoTree } from '../services/githubService.js';
import { analyzeIssueWithGemini, askRepositoryWithGemini, suggestFixWithGemini, redactSecrets } from '../services/aiService.js';
import mongoose from 'mongoose';

async function getOwnedIssue(issueId, userId) {
  if (!mongoose.isValidObjectId(issueId)) throw new AppError('Issue not found', 404);
  const issue = await Issue.findById(issueId);
  if (!issue) throw new AppError('Issue not found', 404);
  const project = await Project.findOne({ _id: issue.projectId, userId });
  if (!project) throw new AppError('Issue not found', 404);
  return { issue, project };
}

async function getIssueContext(issue, project, userId) {
  const file = issue.file ? await getFileContent(userId, project.owner, project.name, issue.file) : null;
  const relatedFiles = [];
  for (const candidate of ['package.json', 'README.md']) {
    if (candidate !== issue.file && relatedFiles.length < 2) {
      const related = await getFileContent(userId, project.owner, project.name, candidate);
      if (related) relatedFiles.push({ path: candidate, content: related.content });
    }
  }
  return {
    issue: {
      category: issue.category,
      severity: issue.severity,
      title: redactSecrets(issue.title),
      description: redactSecrets(issue.description),
      file: issue.file,
      line: issue.line,
      rule: issue.rule,
      evidence: redactSecrets(issue.evidence),
    },
    project: { name: project.name, owner: project.owner, language: project.language, defaultBranch: project.defaultBranch },
    file: file ? { path: issue.file, content: file.content } : null,
    relatedFiles,
  };
}

async function getQuestionContext(project, userId, question, issue) {
  if (issue) return getIssueContext(issue, project, userId);
  const tree = await getRepoTree(userId, project.owner, project.name, project.defaultBranch || 'main');
  const terms = String(question).toLowerCase().split(/\W+/).filter(Boolean);
  const paths = tree.tree.map((item) => item.path).filter((filePath) => /\.(js|jsx|ts|tsx|py|go|java|json|md)$/.test(filePath));
  const selected = paths.filter((filePath) => terms.some((term) => filePath.toLowerCase().includes(term))).slice(0, 5);
  const fallback = paths.filter((filePath) => /(^|\/)(auth|routes?|services?|api|app|server|readme)/i.test(filePath)).slice(0, 5);
  const relatedFiles = [];
  for (const filePath of [...new Set([...selected, ...fallback])].slice(0, 6)) {
    const file = await getFileContent(userId, project.owner, project.name, filePath);
    if (file) relatedFiles.push({ path: filePath, content: file.content });
  }
  return { project: { name: project.name, owner: project.owner, language: project.language, defaultBranch: project.defaultBranch }, issue: null, file: null, relatedFiles };
}

async function saveSuggestion(issue, result, extra = {}) {
  const suggestion = await AISuggestion.create({ issueId: issue._id, ...result, ...extra, provider: 'gemini', aiAvailable: true });
  issue.aiAnalysisId = suggestion._id;
  await issue.save();
  return suggestion;
}

export async function aiAnalyzeIssue(req, res, next) {
  try {
    const { issue, project } = await getOwnedIssue(req.params.id, req.user._id);
    const result = await analyzeIssueWithGemini(await getIssueContext(issue, project, req.user._id));
    const suggestion = await saveSuggestion(issue, result);
    res.json({ data: suggestion });
  } catch (err) {
    next(err);
  }
}

export async function suggestIssueFix(req, res, next) {
  try {
    const { issue, project } = await getOwnedIssue(req.params.id, req.user._id);
    const result = await suggestFixWithGemini(await getIssueContext(issue, project, req.user._id));
    const suggestion = await saveSuggestion(issue, result, { explanation: result.explanation, recommendedSolution: result.recommendedSolution, saferAlternative: result.saferAlternative, diff: result.diff });
    res.json({ data: suggestion });
  } catch (err) {
    next(err);
  }
}

export async function askProjectAI(req, res, next) {
  try {
    const project = await Project.findOne({ _id: req.params.id, userId: req.user._id });
    if (!project) throw new AppError('Project not found', 404);
    const question = String(req.body?.question || '').trim();
    if (!question) throw new AppError('A question is required', 400);
    const issue = req.body?.issueId && mongoose.isValidObjectId(req.body.issueId) ? await Issue.findOne({ _id: req.body.issueId, projectId: project._id }) : null;
    const context = await getQuestionContext(project, req.user._id, question, issue);
    res.json({ data: await askRepositoryWithGemini({ question, context }) });
  } catch (err) {
    next(err);
  }
}
