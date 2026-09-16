const validCategories = new Set(['code-quality', 'security', 'performance', 'dependency', 'architecture']);
const validSeverities = new Set(['critical', 'high', 'medium', 'low']);
const sourceMap = {
  codeQuality: 'custom-rule',
  security: 'secret-scanner',
  dependencies: 'dependency-scanner',
  performance: 'performance-scanner',
  architecture: 'architecture-scanner',
};

export function issueFingerprint(finding, projectId) {
  return [projectId || '', finding.category || '', finding.rule || '', finding.file || '', finding.line || '', String(finding.evidence || '').trim()].join('|').toLowerCase();
}

export function normalizeIssue(finding, scannerName) {
  const category = validCategories.has(finding.category) ? finding.category : 'code-quality';
  const severity = validSeverities.has(finding.severity) ? finding.severity : 'low';
  return {
    source: finding.source || sourceMap[scannerName] || 'custom-rule',
    detectionType: finding.detectionType || 'detected',
    category,
    severity,
    title: String(finding.title || 'Static analysis finding').slice(0, 200),
    description: String(finding.description || '').slice(0, 2000),
    file: finding.file || '',
    line: Number.isFinite(finding.line) ? finding.line : null,
    column: Number.isFinite(finding.column) ? finding.column : null,
    rule: finding.rule || '',
    evidence: String(finding.evidence || '').slice(0, 500),
  };
}

export function normalizeFindings(findings, scannerName) {
  return (findings || []).map((finding) => normalizeIssue(finding, scannerName));
}
