import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { BookProvider } from './contexts/BookContext';
import { DiscussionProvider } from './contexts/DiscussionContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import BookPage from './pages/BookPage';
import ClubPage from './pages/ClubPage';
import ProfilePage from './pages/ProfilePage';

function ProtectedRoute({ children, roles }: { children: JSX.Element; roles?: string[] }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BookProvider>
        <DiscussionProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex flex-1 max-w-6xl w-full mx-auto gap-6 px-4 py-6">
              <Sidebar />
              <main className="flex-1">
                <Routes>
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <DashboardPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/book/:id"
                    element={
                      <ProtectedRoute>
                        <BookPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/club/:id"
                    element={
                      <ProtectedRoute>
                        <ClubPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </main>
            </div>
          </div>
        </DiscussionProvider>
      </BookProvider>
    </AuthProvider>
  );
}
