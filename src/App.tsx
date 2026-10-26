import { useScrollReveal } from './hooks/useScrollReveal'
import { CareerProvider, useCareer } from './context/CareerContext'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { Sidebar } from './components/layout/Sidebar'
import { HomePage } from './pages/HomePage'
import { JobsPage } from './pages/JobsPage'
import { JobDetailPage } from './pages/JobDetailPage'
import { AuthPage } from './pages/AuthPage'
import { DashboardPage } from './pages/DashboardPage'
import { ResumePage } from './pages/ResumePage'
import { MatchesPage } from './pages/MatchesPage'
import { ProfilePage } from './pages/ProfilePage'
import { ApplicationsPage } from './pages/ApplicationsPage'
import { PostJobPage } from './pages/PostJobPage'
import { CandidatesPage } from './pages/CandidatesPage'
import './App.css'
import './motion.css'

// App chỉ ghép layout và trang. Logic dữ liệu nằm trong hooks/services.
function AppContent() {
  const { page, toast, busy, error } = useCareer()
  const motionRoot = useScrollReveal(page, busy)
  const pages = {
    home: <HomePage />,
    jobs: <JobsPage />,
    detail: <JobDetailPage />,
    login: <AuthPage />,
    signup: <AuthPage />,
    register: <AuthPage />,
    dashboard: <DashboardPage />,
    company: <DashboardPage />,
    resume: <ResumePage />,
    matches: <MatchesPage />,
    profile: <ProfilePage />,
    applications: <ApplicationsPage />,
    post: <PostJobPage />,
    candidates: <CandidatesPage />,
  }

  return (
    <div className="app" ref={motionRoot}>
      <Header />
      {busy && <div className="request-status" role="status">처리 중…</div>}
      {error && <div className="request-error" role="alert">{error}</div>}
      {page === 'home' ? pages.home : (
        <main className="workspace">
          <Sidebar />
          <div className="page-content page-enter" key={page}>{pages[page] || pages.home}</div>
        </main>
      )}
      <Footer />
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  )
}

export default function App() {
  return (
    <CareerProvider>
      <AppContent />
    </CareerProvider>
  )
}
