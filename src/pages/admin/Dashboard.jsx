import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/AdminLayout';

const AdminDashboard = () => {
  const [totalPatients, setTotalPatients] = useState(0);
  const [upcomingAppointments, setUpcomingAppointments] = useState(0);
  const [completedTreatments, setCompletedTreatments] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem('patients')) || [];
    const incidents = JSON.parse(localStorage.getItem('incidents')) || [];

    const today = new Date();
    const thisMonth = today.getMonth();
    const thisYear = today.getFullYear();

    const upcoming = incidents.filter(i => new Date(i.appointmentDate) > today);
    const completed = incidents.filter(i => i.status?.toLowerCase() === 'completed' || i.status?.toLowerCase() === 'done');
    const revenue = incidents.reduce((sum, i) => {
      const date = new Date(i.appointmentDate);
      const cost = parseFloat(i.cost) || 0;
      return (date.getMonth() === thisMonth && date.getFullYear() === thisYear) ? sum + cost : sum;
    }, 0);

    setTotalPatients(patients.length);
    setUpcomingAppointments(upcoming.length);
    setCompletedTreatments(completed.length);
    setMonthlyRevenue(revenue);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  };

  return (
    <AdminLayout>
      <div className="bg-gray-100 min-h-screen p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-blue-800"> Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPIBox label="Total Patients" value={totalPatients} />
          <KPIBox label="Upcoming Appointments" value={upcomingAppointments} />
          <KPIBox label="Completed Treatments" value={completedTreatments} />
          <KPIBox label="Monthly Revenue (₹)" value={monthlyRevenue.toLocaleString()} />
        </div>
      </div>
    </AdminLayout>
  );
};

const KPIBox = ({ label, value }) => (
  <div className="bg-white p-6 rounded-2xl shadow-md text-center hover:shadow-lg transition">
    <div className="text-sm text-gray-500 mb-2">{label}</div>
    <div className="text-3xl font-bold text-blue-700">{value}</div>
  </div>
);

export default AdminDashboard;
