/**
 * Application Routes Configuration
 */

import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTES } from '../utils/constants';

// Route wrappers
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// Layout
import MainLayout from '../components/layout/MainLayout';

// Pages
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Dashboard from '../components/Dashboard/Dashboard';
import SalesPage from '../components/sales/SalesPage';
import UploadPage from '../components/upload/ExcelUpload/UploadPage';
import NotFound from '../pages/NotFound/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Redirect root to dashboard - learned this from React Router docs */}
      <Route path="/" element={<Navigate to={ROUTES.DASHBOARD} replace />} />

      {/* Public Routes */}
      <Route
        path={ROUTES.LOGIN}
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.REGISTER}
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />

      {/* Private Routes */}
      <Route
        path={ROUTES.DASHBOARD}
        element={
          <PrivateRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.SALES}
        element={
          <PrivateRoute>
            <MainLayout>
              <SalesPage />
            </MainLayout>
          </PrivateRoute>
        }
      />
      <Route
        path={ROUTES.UPLOAD}
        element={
          <PrivateRoute>
            <MainLayout>
              <UploadPage />
            </MainLayout>
          </PrivateRoute>
        }
      />

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;