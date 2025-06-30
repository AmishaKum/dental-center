import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './pages/Login';
import AdminDashboard from './pages/admin/Dashboard';
import Patients from './pages/admin/Patients';
import Incidents from './pages/admin/Incidents';
import CalendarView from './pages/admin/CalendarView';

import PatientDashboard from './pages/patient/Dashboard';
import Profile from './pages/patient/Profile'; // ✅ Add this line

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin/dashboard" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/patients" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <Patients />
          </ProtectedRoute>
        } />
        <Route path="/admin/patient/:patientId/incidents" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <Incidents />
          </ProtectedRoute>
        } />
        <Route path="/admin/calendar" element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <CalendarView />
          </ProtectedRoute>
        } />

        {/* Patient Routes */}
        <Route path="/patient/dashboard" element={
          <ProtectedRoute allowedRoles={['Patient']}>
            <PatientDashboard />
          </ProtectedRoute>
        } />
        <Route path="/patient/profile" element={
          <ProtectedRoute allowedRoles={['Patient']}>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
