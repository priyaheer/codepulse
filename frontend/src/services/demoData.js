export const demoProjects = [
  {
    id: 'acme-dashboard-app',
    owner: 'acme',
    name: 'dashboard-app',
    description: 'Customer dashboard, billing flows, and internal ops tooling.',
    repositoryUrl: 'https://github.com/acme/dashboard-app',
    healthScore: 81,
    issueCount: 14,
    lastScan: '2 hours ago',
    status: 'Healthy',
    trend: '+7%',
    securityScore: 87,
    language: 'TypeScript',
    stars: 420,
    visibility: 'Private',
  },
  {
    id: 'acme-api-gateway',
    owner: 'acme',
    name: 'api-gateway',
    description: 'Edge gateway, rate-limiting, authentication, APIs.',
    repositoryUrl: 'https://github.com/acme/api-gateway',
    healthScore: 68,
    issueCount: 23,
    lastScan: 'Yesterday',
    status: 'Needs attention',
    trend: '+2%',
    securityScore: 71,
    language: 'Go',
    stars: 612,
    visibility: 'Private',
  },
  {
    id: 'acme-frontend-shell',
    owner: 'acme',
    name: 'frontend-shell',
    description: 'Reusable app shell and design system for product surfaces.',
    repositoryUrl: 'https://github.com/acme/frontend-shell',
    healthScore: 74,
    issueCount: 11,
    lastScan: '3 days ago',
    status: 'Stable',
    trend: '+4%',
    securityScore: 80,
    language: 'React',
    stars: 854,
    visibility: 'Public',
  },
];

export const demoIssues = [
  {
    id: 'ISS-2041',
    severity: 'critical',
    title: 'Unvalidated user input reaches payment API',
    category: 'security',
    file: 'src/payments/checkout.ts',
    line: 88,
    source: 'security-scanner',
    status: 'open',
    description: 'The checkout form does not explicitly validate risky fields before dispatching to the billing API.',
    evidence: 'const payload = { amount: form.amount, customer: form.customerId };',
    recommendation: 'Add request validation and verify values before sending.',
  },
  {
    id: 'ISS-1934',
    severity: 'high',
    title: 'Large dashboard bundle increases initial load cost',
    category: 'performance',
    file: 'src/modules/analytics/index.tsx',
    line: 33,
    source: 'performance-scanner',
    status: 'open',
    description: 'A large stat library is included in the initial route bundle.',
    evidence: 'import * as charts from "@acme/charts";',
    recommendation: 'Lazy-load the charting module behind a route-based split.',
  },
  {
    id: 'ISS-1897',
    severity: 'medium',
    title: 'Duplicate dependency version pinning',
    category: 'dependency',
    file: 'package.json',
    line: 20,
    source: 'dependency-scanner',
    status: 'in_progress',
    description: 'Two packages appear to target conflicting versions of a shared library.',
    evidence: '"react-router-dom": "7.x" && "@remix-run/router": "1.22"',
    recommendation: 'Align dependency versions to a single supported range.',
  },
  {
    id: 'ISS-1789',
    severity: 'low',
    title: 'Console logging left in server bootstrap',
    category: 'code-quality',
    file: 'server/bootstrap.ts',
    line: 51,
    source: 'eslint',
    status: 'resolved',
    description: 'Debug console output remains in a production code path.',
    evidence: 'console.log("boot complete")',
    recommendation: 'Remove log statements or guard them behind dev mode.',
  },
];

export const healthTrend = [
  { name: 'Jan', score: 58 },
  { name: 'Feb', score: 61 },
  { name: 'Mar', score: 64 },
  { name: 'Apr', score: 72 },
  { name: 'May', score: 79 },
  { name: 'Jun', score: 81 },
];

export const issueTrend = [
  { name: 'Jan', issues: 34 },
  { name: 'Feb', issues: 31 },
  { name: 'Mar', issues: 26 },
  { name: 'Apr', issues: 21 },
  { name: 'May', issues: 18 },
  { name: 'Jun', issues: 14 },
];

export const recentScans = [
  { id: 'scan-6', name: 'Production scan', time: '2h ago', health: 81, status: 'completed' },
  { id: 'scan-5', name: 'Release candidate', time: '1d ago', health: 76, status: 'completed' },
  { id: 'scan-4', name: 'Security sweep', time: '3d ago', health: 72, status: 'completed' },
];

export const scanSummary = {
  totalIssues: 14,
  critical: 2,
  high: 4,
  medium: 6,
  low: 2,
  resolved: 8,
};

export const dependencyRows = [
  { name: 'react', current: '18.3.1', latest: '19.0.0', risk: 'Medium', type: 'production', recommendation: 'Upgrade only after testing route-level rendering.' },
  { name: 'express', current: '4.21.1', latest: '5.0.0', risk: 'Low', type: 'production', recommendation: 'Stay on current minor for compatibility.' },
  { name: 'axios', current: '1.7.7', latest: '1.8.0', risk: 'Low', type: 'production', recommendation: 'Patch update recommended.' },
  { name: 'vite', current: '5.4.10', latest: '6.0.0', risk: 'Medium', type: 'development', recommendation: 'Upgrade when migration plan is ready.' },
];

export const architectureDiagram = [
  'User', 'React UI', 'API Service', 'Express', 'Controllers', 'Database',
];

export const demoActivity = [
  { label: 'Security scan completed', time: '12 min ago' },
  { label: 'Dependency patch reviewed', time: '1 hour ago' },
  { label: 'Performance pass improved bundle budget', time: '3 hours ago' },
];

export const demoFileTree = [
  { name: 'src', type: 'folder', children: ['app', 'features', 'lib'] },
  { name: 'server', type: 'folder', children: ['routes', 'middleware'] },
  { name: 'package.json', type: 'file', issueCount: 1 },
];
