import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    contact: '',
    healthInfo: '',
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const savePatients = (updatedList) => {
    localStorage.setItem('patients', JSON.stringify(updatedList));
    setPatients(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updated = [...patients];
      updated[editingIndex] = { ...updated[editingIndex], ...formData };
      savePatients(updated);
      setEditingIndex(null);
    } else {
      const newPatient = {
        id: `p${Date.now()}`,
        ...formData
      };
      savePatients([...patients, newPatient]);
    }
    setFormData({ name: '', dob: '', contact: '', healthInfo: '' });
  };

  const handleEdit = (index) => {
    setFormData(patients[index]);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updated = [...patients];
    updated.splice(index, 1);
    savePatients(updated);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Patient Management</h2>

        <form onSubmit={handleSubmit} className="mb-6 space-y-3 bg-white p-4 rounded shadow-md">
          <input type="text" placeholder="Full Name" className="border p-2 w-full" required
            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input type="date" className="border p-2 w-full" required
            value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} />
          <input type="text" placeholder="Contact" className="border p-2 w-full" required
            value={formData.contact} onChange={(e) => setFormData({ ...formData, contact: e.target.value })} />
          <textarea placeholder="Health Info" className="border p-2 w-full"
            value={formData.healthInfo} onChange={(e) => setFormData({ ...formData, healthInfo: e.target.value })} />
          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            {editingIndex !== null ? 'Update' : 'Add'} Patient
          </button>
        </form>

        <div className="bg-white rounded shadow-md p-4">
          <h3 className="text-lg font-semibold mb-2">All Patients</h3>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2 border">Name</th>
                <th className="p-2 border">DOB</th>
                <th className="p-2 border">Contact</th>
                <th className="p-2 border">Health Info</th>
                <th className="p-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient, index) => (
                <tr key={patient.id}>
                  <td className="p-2 border">{patient.name}</td>
                  <td className="p-2 border">{patient.dob}</td>
                  <td className="p-2 border">{patient.contact}</td>
                  <td className="p-2 border">{patient.healthInfo}</td>
                  <td className="p-2 border space-x-2">
                    <button className="bg-yellow-400 px-2 py-1 rounded" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => handleDelete(index)}>Delete</button>
                    <button className="text-blue-600 underline" onClick={() => navigate(`/admin/patient/${patient.id}/incidents`)}>
                      View Incidents
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Patients;
