import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from './components/ProtectedRoute';
import Sidebar from './components/Sidebar';
import AuthForm from './components/AuthForm';
import HomePage from './components/HomePage';
import MarketDashboard from './components/MarketDashboard';
import TrendsPage from './components/TrendsPage';
import GetQuotePage from './components/GetQuotePage';
import AluminumShorts from './components/AluminumShorts';
import AlertsManagement from './components/AlertsManagement';
import EmailVerification from './components/EmailVerification';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className={`${isDarkMode ? 'dark' : ''}`}>
        <div className="dashboard-layout">
          <Sidebar
            currentPage={window.location.pathname.substring(1) || 'home'}
            onPageChange={() => {}} // Handled by React Router now
            isCollapsed={isSidebarCollapsed}
            onCollapse={setIsSidebarCollapsed}
            isDarkMode={isDarkMode}
            onThemeChange={setIsDarkMode}
          />
          <div className={`transition-all duration-300 ${
            isSidebarCollapsed ? 'pl-16' : 'pl-64'
          }`}>
            <main className="dashboard-content py-6">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <AuthProvider>
      <Router>
        <EmailVerification />
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthForm />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <MarketDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/trends"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <TrendsPage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/quote"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <GetQuotePage />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/aluminum-shorts"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AluminumShorts />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/alerts"
            element={
              <ProtectedRoute>
                <DashboardLayout>
                  <AlertsManagement />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}