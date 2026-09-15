import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AppLayout } from './layouts/AppLayout';

import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DemoPage } from './pages/DemoPage';
import { OnboardingPage } from './pages/OnboardingPage';

import { DashboardPage } from './pages/DashboardPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectOverviewPage } from './pages/ProjectOverviewPage';
import { ScanPage } from './pages/ScanPage';
import { IssuesPage } from './pages/IssuesPage';
import { IssueDetailPage } from './pages/IssueDetailPage';
import { CodeExplorerPage } from './pages/CodeExplorerPage';
import { SecurityPage } from './pages/SecurityPage';
import { DependenciesPage } from './pages/DependenciesPage';
import { PerformancePage } from './pages/PerformancePage';
import { ArchitecturePage } from './pages/ArchitecturePage';
import { AIAssistantPage } from './pages/AIAssistantPage';
import { ScanHistoryPage } from './pages/ScanHistoryPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProfilePage } from './pages/ProfilePage';

export default function App() {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}
