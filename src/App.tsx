import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import AppShell from './components/AppShell';
import AuthPage from './pages/AuthPage';
import ChallengesPage from './pages/ChallengesPage';
import CompaniesPage from './pages/CompaniesPage';
import DashboardPage from './pages/DashboardPage';
import LandingPage from './pages/LandingPage';
import MockInterviewPage from './pages/MockInterviewPage';
import NotFoundPage from './pages/NotFoundPage';
import OnboardingPage from './pages/OnboardingPage';
import HelpPage from './pages/HelpPage';
import PracticePage from './pages/PracticePage';
import PreparePage from './pages/PreparePage';
import ProfilePage from './pages/ProfilePage';
import ProgressPage from './pages/ProgressPage';
import QuestionsPage from './pages/QuestionsPage';
import { useApp } from './context/AppContext';

function Protected({ children }: { children: React.ReactNode }) {
  const { user, authLoading } = useApp();
  const location = useLocation();
  if (authLoading) return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading PrepKite…</div>;
  if (!user) return <Navigate to="/auth" replace state={{ from: `${location.pathname}${location.search}${location.hash}` }} />;
  return <>{children}</>;
}

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<Protected><DashboardPage /></Protected>} />
        <Route path="/onboarding" element={<Protected><OnboardingPage /></Protected>} />
        <Route path="/prepare" element={<Protected><PreparePage /></Protected>} />
        <Route path="/questions" element={<Protected><QuestionsPage /></Protected>} />
        <Route path="/companies" element={<Protected><CompaniesPage /></Protected>} />
        <Route path="/mock" element={<Protected><MockInterviewPage /></Protected>} />
        <Route path="/practice" element={<Protected><PracticePage /></Protected>} />
        <Route path="/challenges" element={<Protected><ChallengesPage /></Protected>} />
        <Route path="/progress" element={<Protected><ProgressPage /></Protected>} />
        <Route path="/profile" element={<Protected><ProfilePage /></Protected>} />
        <Route path="/help" element={<Protected><HelpPage /></Protected>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}
