import React, { useEffect, useState } from 'react';
import PatientLayout from '../../components/PatientLayout';

const Profile = () => {
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    email: '',
    healthInfo: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'));
    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];

    if (user?.role === 'Patient') {
      const current = allPatients.find(p => p.id === user.patientId);
      if (current) {
        setPatient(current);
        setFormData(current);
      }
    }

    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Contact validation
    if (!/^\d{10}$/.test(formData.contact)) {
      alert('📱 Contact number must be exactly 10 digits.');
      return;
    }

    const allPatients = JSON.parse(localStorage.getItem('patients')) || [];
    const updated = allPatients.map(p =>
      p.id === patient?.id ? { ...p, ...formData } : p
    );
    localStorage.setItem('patients', JSON.stringify(updated));
    alert('✅ Profile updated successfully!');
  };

  if (loading) {
    return (
      <PatientLayout>
        <div className="p-6 text-center text-gray-500">Loading profile...</div>
      </PatientLayout>
    );
  }

  if (!patient) {
    return (
      <PatientLayout>
        <div className="p-6 text-center text-red-500">❌ Patient not found.</div>
      </PatientLayout>
    );
  }

  return (
    <PatientLayout>
      <div className="max-w-xl mx-auto bg-white mt-10 p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-blue-700 mb-6">🧑‍⚕️ My Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={formData.name}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
            <input
              type="date"
              value={formData.dob}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              required
            />
          </div>

          {/* Contact */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Contact Number</label>
            <input
              type="text"
              value={formData.contact}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
              pattern="\d{10}"
              title="Must be 10-digit number"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value={formData.email}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          {/* Health Info */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Health Information</label>
            <textarea
              value={formData.healthInfo}
              className="mt-1 block w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })}
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Save Changes
          </button>
        </form>
      </div>
    </PatientLayout>
  );
};

export default Profile;
