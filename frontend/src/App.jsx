import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layouts/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DemoPage } from './pages/DemoPage';
import { OnboardingPage } from './pages/OnboardingPage';

const DashboardPage = lazy(() => import('./pages/DashboardPage').then((module) => ({ default: module.DashboardPage })));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage').then((module) => ({ default: module.ProjectsPage })));
const ProjectOverviewPage = lazy(() => import('./pages/ProjectOverviewPage').then((module) => ({ default: module.ProjectOverviewPage })));
const ScanPage = lazy(() => import('./pages/ScanPage').then((module) => ({ default: module.ScanPage })));
const IssuesPage = lazy(() => import('./pages/IssuesPage').then((module) => ({ default: module.IssuesPage })));
const IssueDetailPage = lazy(() => import('./pages/IssueDetailPage').then((module) => ({ default: module.IssueDetailPage })));
const CodeExplorerPage = lazy(() => import('./pages/CodeExplorerPage').then((module) => ({ default: module.CodeExplorerPage })));
const SecurityPage = lazy(() => import('./pages/SecurityPage').then((module) => ({ default: module.SecurityPage })));
const DependenciesPage = lazy(() => import('./pages/DependenciesPage').then((module) => ({ default: module.DependenciesPage })));
const PerformancePage = lazy(() => import('./pages/PerformancePage').then((module) => ({ default: module.PerformancePage })));
const ArchitecturePage = lazy(() => import('./pages/ArchitecturePage').then((module) => ({ default: module.ArchitecturePage })));
const AIAssistantPage = lazy(() => import('./pages/AIAssistantPage').then((module) => ({ default: module.AIAssistantPage })));
const ScanHistoryPage = lazy(() => import('./pages/ScanHistoryPage').then((module) => ({ default: module.ScanHistoryPage })));
const AnalyticsPage = lazy(() => import('./pages/AnalyticsPage').then((module) => ({ default: module.AnalyticsPage })));
const SettingsPage = lazy(() => import('./pages/SettingsPage').then((module) => ({ default: module.SettingsPage })));
const ProfilePage = lazy(() => import('./pages/ProfilePage').then((module) => ({ default: module.ProfilePage })));

export default function App() {
  return (
    <ThemeProvider>
      <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-background text-[13px] text-text-secondary">Loading CodePulse...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/demo" element={<DemoPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />

        <Route path="/app" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/:projectId" element={<ProjectOverviewPage />} />
          <Route path="projects/:projectId/scan" element={<ScanPage />} />
          <Route path="issues" element={<IssuesPage />} />
          <Route path="issues/:issueId" element={<IssueDetailPage />} />
          <Route path="explorer" element={<CodeExplorerPage />} />
          <Route path="security" element={<SecurityPage />} />
          <Route path="dependencies" element={<DependenciesPage />} />
          <Route path="performance" element={<PerformancePage />} />
          <Route path="architecture" element={<ArchitecturePage />} />
          <Route path="assistant" element={<AIAssistantPage />} />
          <Route path="history" element={<ScanHistoryPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      </Suspense>
    </ThemeProvider>
  );
}
