const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('codepulse_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Request failed');
  return payload.data;
}

export const api = {
  getMe: () => request('/auth/me'),
  githubLoginUrl: `${API_URL}/auth/github`,
  listRepos: () => request('/github/repos'),
  createProject: (repository) => request('/projects', { method: 'POST', body: JSON.stringify({ name: repository.name, owner: repository.owner, repository: repository.name, githubRepoId: repository.id, defaultBranch: repository.defaultBranch, description: repository.description, language: repository.language, isPrivate: repository.isPrivate, stars: repository.stars }) }),
  listProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  startScan: (id) => request(`/projects/${id}/scan`, { method: 'POST' }),
  listScans: (id) => request(`/projects/${id}/scans`),
  getScan: (projectId, scanId) => request(`/projects/${projectId}/scans/${scanId}`),
  listIssues: (projectId) => request(`/projects/${projectId}/issues`),
  getIssue: (id) => request(`/issues/${id}`),
  analyzeIssue: (id) => request(`/issues/${id}/analyze`, { method: 'POST' }),
  suggestIssueFix: (id) => request(`/issues/${id}/suggest-fix`, { method: 'POST' }),
  askProjectAI: (projectId, question, issueId) => request(`/ai/projects/${projectId}/ask-ai`, { method: 'POST', body: JSON.stringify({ question, issueId }) }),
};

export function hasApiSession() {
  return Boolean(document.cookie.includes('cp_token=') || localStorage.getItem('codepulse_token'));
}

export { API_URL };
