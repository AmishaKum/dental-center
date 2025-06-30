import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white p-6 shadow-md">
        <h2 className="text-xl font-bold mb-6">🦷 ENTNT Admin</h2>
        <nav className="space-y-3">
          <Link to="/admin/dashboard" className="block text-blue-600 hover:underline">Dashboard</Link>
          <Link to="/admin/patients" className="block text-blue-600 hover:underline">Patients</Link>
          <Link to="/admin/calendar" className="block text-blue-600 hover:underline">Calendar</Link>
          <button onClick={handleLogout} className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
            Logout
          </button>
        </nav>
      </div>

      {/* Page Content */}
      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
