import { config } from '../config/index.js';

const dimensions = ['codeQuality', 'security', 'performance', 'maintainability', 'dependencies'];
const categoryFor = { codeQuality: 'code-quality', security: 'security', performance: 'performance', maintainability: 'code-quality', dependencies: 'dependency' };

function scoreFor(findings, category) {
  const penalty = findings.filter((finding) => finding.category === category).reduce((total, finding) => total + (config.healthScore.penalties[finding.severity] || 0), 0);
  return Math.max(0, Math.min(100, 100 - penalty));
}

export function calculateHealthScore(findings) {
  const scores = {};
  for (const dimension of dimensions) scores[dimension] = scoreFor(findings, categoryFor[dimension]);
  const healthScore = Math.round(dimensions.reduce((total, dimension) => total + scores[dimension] * config.healthScore.weights[dimension], 0));
  const issueCounts = findings.reduce((counts, finding) => { counts.total += 1; counts[finding.severity] += 1; return counts; }, { total: 0, critical: 0, high: 0, medium: 0, low: 0 });
  return { healthScore, scores, issueCounts };
}
