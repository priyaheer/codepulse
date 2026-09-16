import { useEffect, useState } from 'react';
import { api } from '../services/api';

export function useProjectScan() {
  const [data, setData] = useState({ project: null, scan: null, issues: [], loading: true, error: '' });

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const projects = await api.listProjects();
        const project = projects.find((item) => item._id === localStorage.getItem('codepulse_active_project')) || projects[0];
        if (!project) {
          if (active) setData({ project: null, scan: null, issues: [], loading: false, error: '' });
          return;
        }
        localStorage.setItem('codepulse_active_project', project._id);
        const [scans, issues] = await Promise.all([api.listScans(project._id), api.listIssues(project._id)]);
        const scan = scans.find((item) => item.status === 'completed') || null;
        if (active) setData({ project, scan, issues, loading: false, error: '' });
      } catch (err) {
        if (active) setData((current) => ({ ...current, loading: false, error: err.message }));
      }
    }
    load();
    return () => { active = false; };
  }, []);

  return data;
}