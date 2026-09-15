const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

async function request(path, options = {}) {
  const token = localStorage.getItem('codepulse_token');
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(options.headers || {}) },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(payload.message || 'Request failed');
  return payload.data;
}

export const api = {
  listProjects: () => request('/projects'),
  getProject: (id) => request(`/projects/${id}`),
  startScan: (id) => request(`/projects/${id}/scan`, { method: 'POST' }),
  listScans: (id) => request(`/projects/${id}/scans`),
  getScan: (projectId, scanId) => request(`/projects/${projectId}/scans/${scanId}`),
  listIssues: (projectId) => request(`/projects/${projectId}/issues`),
};

export function hasApiSession() {
  return Boolean(localStorage.getItem('codepulse_token'));
}
