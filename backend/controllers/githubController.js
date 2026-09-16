import { AppError } from '../middleware/errorHandler.js';
import { listUserRepos as githubListUserRepos, getRepo as githubGetRepo, getRepoTree, getFileContent } from '../services/githubService.js';

export async function listUserRepos(req, res, next) {
  try {
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 30);
    const repos = await githubListUserRepos(req.user._id, page, perPage);
    res.json({ data: repos });
  } catch (err) {
    if (err.status === 401 || err.status === 403) return next(new AppError('GitHub authorization expired — please reconnect your account', 401));
    next(err);
  }
}

export async function getRepoDetails(req, res, next) {
  try {
    const { owner, repo } = req.params;
    const details = await githubGetRepo(req.user._id, owner, repo);
    res.json({ data: details });
  } catch (err) {
    if (err.status === 401 || err.status === 403) return next(new AppError('GitHub authorization expired — please reconnect your account', 401));
    next(err);
  }
}

export async function getRepositoryTree(req, res, next) {
  try {
    const tree = await getRepoTree(req.user._id, req.params.owner, req.params.repo, String(req.query.branch || 'main'));
    res.json({ data: tree });
  } catch (err) {
    next(err);
  }
}

export async function getRepositoryFile(req, res, next) {
  try {
    const filePath = String(req.query.path || '');
    if (!filePath || filePath.includes('..') || filePath.startsWith('/')) throw new AppError('Invalid repository path', 400);
    const file = await getFileContent(req.user._id, req.params.owner, req.params.repo, filePath);
    if (!file) throw new AppError('File not found or too large to preview', 404);
    res.json({ data: { path: filePath, ...file } });
  } catch (err) {
    next(err);
  }
}
