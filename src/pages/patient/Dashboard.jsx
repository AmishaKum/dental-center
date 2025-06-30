import React, { useEffect, useState } from 'react';
import PatientLayout from '../../components/PatientLayout';

const PatientDashboard = () => {
  const [patient, setPatient] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [nextAppointment, setNextAppointment] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const allIncidents = JSON.parse(localStorage.getItem('incidents')) || [];

    if (user?.role === 'Patient') {
      const current = allPatients.find(p => p.id === user.patientId);
      setPatient(current);

      const patientIncidents = allIncidents
        .filter(i => i.patientId === user.patientId)
        .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate));

      setIncidents(patientIncidents);
      const future = patientIncidents.find(i => new Date(i.appointmentDate) > new Date());
      setNextAppointment(future || null);
    }
  }, []);

  const getStatusColor = (status) => {
    const s = status?.toLowerCase();
    if (s === 'done' || s === 'completed') return 'bg-green-100 text-green-700';
    if (s === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-600';
  };

  return (
    <PatientLayout>
      <div className="bg-gray-100 min-h-screen p-6 max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-blue-800"> Welcome, {patient?.name || 'Patient'}</h1>
          <button
            onClick={() => window.location.href = '/patient/profile'}
            className="text-blue-600 underline hover:text-blue-800 text-sm"
          >
            Edit Profile
          </button>
        </div>

        {/* Next Appointment */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-2">📅 Your Next Appointment</h2>
          {nextAppointment ? (
            <div className="text-gray-700 space-y-1 text-sm">
              <p className="font-semibold text-lg">{nextAppointment.title}</p>
              <p>🕒 {new Date(nextAppointment.appointmentDate).toLocaleString()}</p>
              <p>💬 {nextAppointment.description}</p>
            </div>
          ) : (
            <p className="text-gray-500">No upcoming appointments.</p>
          )}
        </div>

        {/* Recent Treatments */}
        <div className="bg-white p-6 rounded-2xl shadow-md">
          <h2 className="text-xl font-semibold text-blue-700 mb-4">🦷 Recent Treatments</h2>
          {incidents.length === 0 ? (
            <p className="text-gray-500">No treatment records found.</p>
          ) : (
            <ul className="space-y-4">
              {incidents.slice(0, 3).map((i) => (
                <li key={i.id} className="p-4 bg-gray-50 border rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-blue-800 font-bold">{i.title}</h3>
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(i.status)}`}>
                      {i.status || 'Unknown'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">🧾 {i.treatment} • ₹{i.cost}</p>
                  <p className="text-sm text-gray-500">📅 {new Date(i.appointmentDate).toLocaleDateString()}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </PatientLayout>
  );
};

export default PatientDashboard;
