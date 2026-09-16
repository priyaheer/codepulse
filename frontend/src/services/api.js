const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('codepulse_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = payload?.error?.message || payload?.message || `Request failed (${response.status})`;
    throw new Error(message);
  }
  return payload.data ?? payload;
}

export const api = {
  getMe: () => request('/auth/me'),
  logout: async () => {
    try {
      await request('/auth/logout', { method: 'POST' });
    } finally {
      localStorage.removeItem('codepulse_token');
      document.cookie = 'cp_token=; Max-Age=0; path=/; SameSite=Lax';
    }
  },
  githubLoginUrl: `${API_URL}/auth/github`,
  listRepos: (page = 1, perPage = 30) => request(`/github/repos?page=${page}&perPage=${perPage}`),
  getRepoTree: (owner, repo, branch) => request(`/github/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/tree?branch=${encodeURIComponent(branch || 'main')}`),
  getRepoFile: (owner, repo, path) => request(`/github/repos/${encodeURIComponent(owner)}/${encodeURIComponent(repo)}/file?path=${encodeURIComponent(path)}`),
  createProject: (repository) => request('/projects', { method: 'POST', body: JSON.stringify({ name: repository.name, owner: repository.owner, repository: repository.name, githubRepoId: repository.id, defaultBranch: repository.defaultBranch, description: repository.description, language: repository.language, isPrivate: repository.isPrivate, stars: repository.stars }) }),
  listProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  startScan: (id) => request(`/projects/${id}/scan`, { method: 'POST' }),
  listScans: (id) => request(`/projects/${id}/scans`),
  getScan: (projectId, scanId) => request(`/projects/${projectId}/scans/${scanId}`),
  getAnalytics: (projectId) => request(`/analytics/projects/${projectId}/analytics`),
  listIssues: (projectId) => request(`/projects/${projectId}/issues`),
  getIssue: (id) => request(`/issues/${id}`),
  updateIssueStatus: (id, status) => request(`/issues/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) }),
  analyzeIssue: (id) => request(`/issues/${id}/analyze`, { method: 'POST' }),
  suggestIssueFix: (id) => request(`/issues/${id}/suggest-fix`, { method: 'POST' }),
  askProjectAI: (projectId, question, issueId) => request(`/ai/projects/${projectId}/ask-ai`, { method: 'POST', body: JSON.stringify({ question, issueId }) }),
};

export function hasApiSession() {
  return Boolean(document.cookie.includes('cp_token=') || localStorage.getItem('codepulse_token'));
}

export { API_URL };
