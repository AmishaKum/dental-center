import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import AdminLayout from '../../components/AdminLayout';

const CalendarView = () => {
  const [incidents, setIncidents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('incidents')) || [];
    setIncidents(stored);
  }, []);

  const getAppointmentsForDate = (date) => {
    return incidents.filter(incident => {
      const apptDate = new Date(incident.appointmentDate);
      return apptDate.toDateString() === date.toDateString();
    });
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const appointments = getAppointmentsForDate(date);
      return appointments.map((appt, idx) => (
        <div key={idx} className="text-xs text-blue-600 font-semibold truncate">
          • {appt.title}
        </div>
      ));
    }
    return null;
  };

  const selectedAppointments = getAppointmentsForDate(selectedDate);

  return (
    <AdminLayout>
      <div className="p-6 min-h-screen bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">📆 Appointment Calendar</h2>
        <div className="bg-white p-4 rounded shadow-md max-w-xl mb-6">
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            tileContent={tileContent}
          />
        </div>

        <div className="bg-white p-4 rounded shadow-md max-w-xl">
          <h3 className="text-lg font-semibold mb-2">
            Appointments on {selectedDate.toDateString()}
          </h3>
          {selectedAppointments.length === 0 ? (
            <p className="text-gray-500">No appointments on this date.</p>
          ) : (
            <ul className="space-y-2">
              {selectedAppointments.map((appt, idx) => (
                <li key={idx} className="border p-3 rounded">
                  <strong>{appt.title}</strong><br />
                  <span className="text-sm text-gray-600">{appt.description}</span><br />
                  <span className="text-sm text-gray-700">Status: {appt.status || 'N/A'}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default CalendarView;
