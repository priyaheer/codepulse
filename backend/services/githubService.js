import { Octokit } from '@octokit/rest';
import { User } from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { config } from '../config/index.js';
import { decryptToken } from './tokenCrypto.js';

function githubAppError(error, fallbackMessage = 'GitHub request failed') {
  const status = error?.status;
  if (status === 401) return new AppError('GitHub authorization expired — please reconnect your account', 401);
  if (status === 403) return new AppError('GitHub denied access. Check the OAuth repository permissions and reconnect.', 403);
  if (status === 404) return new AppError('Repository not found or not accessible to this GitHub account', 404);
  return new AppError(fallbackMessage, 502);
}

/**
 * Returns an authenticated Octokit instance for the given user.
 * The token is fetched with the +select+ override since it's excluded by default.
 */
export async function getOctokitForUser(userId) {
  const user = await User.findById(userId).select('+githubAccessToken');
  if (!user?.githubAccessToken) {
    throw new AppError('GitHub connection not found — please reconnect your account', 401);
  }
  return new Octokit({ auth: decryptToken(user.githubAccessToken) });
}

/**
 * List repositories accessible to the authenticated user.
 */
export async function listUserRepos(userId, page = 1, perPage = 30) {
  try {
    const octokit = await getOctokitForUser(userId);
    const { data } = await octokit.rest.repos.listForAuthenticatedUser({
      sort: 'updated',
      per_page: Math.min(Math.max(perPage, 1), 100),
      page: Math.max(page, 1),
      type: 'all',
    });
    return data.map(normalizeRepo);
  } catch (error) {
    throw githubAppError(error, 'Could not load repositories from GitHub');
  }
}

/**
 * Get a single repo's metadata.
 */
export async function getRepo(userId, owner, repo) {
  try {
    const octokit = await getOctokitForUser(userId);
    const { data } = await octokit.rest.repos.get({ owner, repo });
    return normalizeRepo(data);
  } catch (error) {
    throw githubAppError(error, 'Could not verify the selected GitHub repository');
  }
}

/**
 * Fetch the full file tree for a repo (recursive, flat list).
 */
export async function getRepoTree(userId, owner, repo, branch) {
  const octokit = await getOctokitForUser(userId);

  // Get latest commit SHA for the branch
  const { data: ref } = await octokit.rest.git.getRef({
    owner,
    repo,
    ref: `heads/${branch}`,
  });
  const commitSha = ref.object.sha;

  const { data: treeData } = await octokit.rest.git.getTree({
    owner,
    repo,
    tree_sha: commitSha,
    recursive: 'true',
  });

  return {
    sha: commitSha,
    tree: treeData.tree.filter((item) => item.type === 'blob'),
    truncated: treeData.truncated,
  };
}

/**
 * Fetch raw file content from GitHub, decoded from base64.
 * Returns null if the file is too large or binary.
 */
export async function getFileContent(userId, owner, repo, filePath) {
  const octokit = await getOctokitForUser(userId);
  try {
    const { data } = await octokit.rest.repos.getContent({ owner, repo, path: filePath });
    if (data.type !== 'file') return null;
    if (data.size > config.scanner.maxFileSizeBytes) return null;
    const content = Buffer.from(data.content, 'base64').toString('utf-8');
    return { content, sha: data.sha, size: data.size };
  } catch (err) {
    if (err.status === 404) return null;
    throw err;
  }
}

function normalizeRepo(data) {
  return {
    id: data.id,
    name: data.name,
    fullName: data.full_name,
    owner: data.owner?.login || data.owner || '',
    ownerAvatar: data.owner?.avatar_url || '',
    description: data.description || '',
    language: data.language || '',
    isPrivate: data.private,
    stars: data.stargazers_count || 0,
    defaultBranch: data.default_branch || 'main',
    updatedAt: data.updated_at,
    url: data.html_url,
    isFork: Boolean(data.fork),
    visibility: data.private ? 'Private' : 'Public',
  };
}
