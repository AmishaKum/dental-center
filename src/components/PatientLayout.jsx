import React from 'react';
import { useNavigate } from 'react-router-dom';

const PatientLayout = ({ children }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <h1 className="font-bold text-xl text-blue-700">🦷 Patient Panel</h1>
        <div className="space-x-4">
          <button onClick={() => navigate('/patient/dashboard')} className="text-blue-600 hover:underline">Dashboard</button>
          <button onClick={() => navigate('/patient/profile')} className="text-blue-600 hover:underline">Profile</button>
          <button onClick={handleLogout} className="text-red-500 hover:underline">Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default PatientLayout;
