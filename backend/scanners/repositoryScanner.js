import path from 'node:path';
import { config } from '../config/index.js';
import { getRepo, getRepoTree, getFileContent } from '../services/githubService.js';

const sourceExtensions = new Set(['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte', '.py', '.java', '.go', '.rb', '.php', '.cs', '.json', '.yml', '.yaml', '.toml', '.env', '.lock']);
const metadataFiles = new Set(['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'requirements.txt', 'Pipfile', 'go.mod', 'Gemfile']);

function isIgnored(filePath) {
  const parts = filePath.split('/');
  if (parts.some((part) => config.scanner.skipDirs.includes(part))) return true;
  const extension = path.extname(filePath).toLowerCase();
  return config.scanner.skipExts.includes(extension);
}

function isSupported(filePath) {
  const basename = path.basename(filePath);
  return metadataFiles.has(basename) || basename.startsWith('.env') || sourceExtensions.has(path.extname(filePath).toLowerCase());
}

export async function scanRepository({ userId, owner, repository, branch }) {
  const metadata = await getRepo(userId, owner, repository);
  const selectedBranch = branch || metadata.defaultBranch || 'main';
  const treeResult = await getRepoTree(userId, owner, repository, selectedBranch);
  const candidates = treeResult.tree
    .filter((item) => item.path && item.size <= config.scanner.maxFileSizeBytes && !isIgnored(item.path) && isSupported(item.path))
    .slice(0, config.scanner.maxFileCount);

  const files = [];
  for (const item of candidates) {
    const result = await getFileContent(userId, owner, repository, item.path);
    if (result?.content != null && !result.content.includes('\u0000')) {
      files.push({ path: item.path, content: result.content, size: result.size || item.size || 0 });
    }
  }

  return {
    metadata,
    branch: selectedBranch,
    commitSha: treeResult.sha,
    truncated: treeResult.truncated,
    files,
    limits: { maxFileCount: config.scanner.maxFileCount, maxFileSizeBytes: config.scanner.maxFileSizeBytes },
  };
}

export function isSourceFile(filePath) {
  return ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs', '.vue', '.svelte', '.py', '.java', '.go', '.rb', '.php', '.cs'].includes(path.extname(filePath).toLowerCase());
}
