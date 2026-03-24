
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { type ReactElement } from 'react';
import AdminLayout from './components/AdminLayout';
import BlogManagement from './pages/BlogManagement';
import AddBlog from './pages/AddBlog';
import JobManagement from './pages/JobManagement';
import PosterManagement from './pages/PosterManagement';
import SeoDashboard from './pages/SEO/SeoDashboard';
import Login from './pages/Login';
import { getCurrentRole, isAuthenticated } from './utils/auth';
import './App.css';

type RoleRouteProps = {
  allowedRole: 'admin' | 'seo';
  children: ReactElement;
};

const RoleRoute = ({ allowedRole, children }: RoleRouteProps) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getCurrentRole();

  if (role !== allowedRole) {
    return <Navigate to={role === 'seo' ? '/seo/dashboard' : role === 'admin' ? '/' : '/login'} replace />;
  }

  return children;
};

const LoginRoute = () => {
  if (!isAuthenticated()) {
    return <Login />;
  }

  const role = getCurrentRole();
  return <Navigate to={role === 'seo' ? '/seo/dashboard' : '/'} replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/login" element={<LoginRoute />} />
        <Route path="/" element={<AdminLayout />}>
          <Route index element={<RoleRoute allowedRole="admin"><BlogManagement /></RoleRoute>} />
          <Route path="add-blog" element={<RoleRoute allowedRole="admin"><AddBlog /></RoleRoute>} />
          <Route path="jobs" element={<RoleRoute allowedRole="admin"><JobManagement /></RoleRoute>} />
          <Route path="poster-settings" element={<RoleRoute allowedRole="admin"><PosterManagement /></RoleRoute>} />
          <Route path="seo/dashboard" element={<RoleRoute allowedRole="seo"><SeoDashboard /></RoleRoute>} />
        </Route>
        <Route path="*" element={<Navigate to={isAuthenticated() ? (getCurrentRole() === 'seo' ? '/seo/dashboard' : '/') : '/login'} replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
