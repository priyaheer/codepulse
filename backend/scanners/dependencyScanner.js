function packageJson(files) {
  const file = files.find((item) => item.path === 'package.json' || item.path.endsWith('/package.json'));
  if (!file) return null;
  try { return { file, data: JSON.parse(file.content) }; } catch { return null; }
}

export function scanDependencies(files) {
  const packageFile = packageJson(files);
  if (!packageFile) return { findings: [], summary: { packageManager: null, dependencyCount: 0, auditAvailable: false } };
  const dependencies = { ...(packageFile.data.dependencies || {}), ...(packageFile.data.devDependencies || {}) };
  const findings = [];
  for (const [name, version] of Object.entries(dependencies)) {
    if (/^[*^~]|latest$/i.test(String(version))) {
      findings.push({ category: 'dependency', severity: 'medium', file: packageFile.file.path, line: 1, title: `Unbounded version for ${name}`, description: 'This dependency uses a broad or floating version range, which can introduce unreviewed changes between installs.', rule: 'dependency-version-range', evidence: `${name}: ${version}` });
    }
  }
  const lockfile = files.find((item) => /(^|\/)(package-lock\.json|yarn\.lock|pnpm-lock\.yaml)$/.test(item.path));
  return { findings, summary: { packageManager: lockfile?.path.endsWith('yarn.lock') ? 'yarn' : lockfile?.path.endsWith('pnpm-lock.yaml') ? 'pnpm' : lockfile ? 'npm' : null, dependencyCount: Object.keys(dependencies).length, auditAvailable: false } };
}
