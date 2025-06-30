import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/AdminLayout';

const Incidents = () => {
  const { patientId } = useParams();
  const [incidents, setIncidents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: '',
    nextDate: '',
  });
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('incidents')) || [];
    const filtered = stored.filter(i => i.patientId === patientId);
    setIncidents(filtered);
  }, [patientId]);

  const saveToLocal = (newList) => {
    const all = JSON.parse(localStorage.getItem('incidents')) || [];
    const updated = all.filter(i => i.patientId !== patientId).concat(newList);
    localStorage.setItem('incidents', JSON.stringify(updated));
    setIncidents(newList);
  };

  const handleFileChange = (e) => {
    const fileList = Array.from(e.target.files);
    const readers = fileList.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then(results => {
      setFiles(results);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newIncident = {
      id: `i${Date.now()}`,
      patientId,
      ...formData,
      cost: parseFloat(formData.cost),
      files: files || []
    };
    const newList = [...incidents, newIncident];
    saveToLocal(newList);
    setFormData({
      title: '',
      description: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: '',
      nextDate: '',
    });
    setFiles([]);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">🦷 Incidents for Patient ID: <span className="text-blue-600">{patientId}</span></h2>

        {/* Incident Form */}
        <form onSubmit={handleSubmit} className="space-y-3 bg-white p-4 rounded shadow mb-6">
          <input className="border p-2 w-full" placeholder="Title" required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
          <textarea className="border p-2 w-full" placeholder="Description" required value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
          <input type="datetime-local" className="border p-2 w-full" required value={formData.appointmentDate} onChange={e => setFormData({ ...formData, appointmentDate: e.target.value })} />
          <input type="number" className="border p-2 w-full" placeholder="Cost (₹)" value={formData.cost} onChange={e => setFormData({ ...formData, cost: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Treatment Given" value={formData.treatment} onChange={e => setFormData({ ...formData, treatment: e.target.value })} />
          <input className="border p-2 w-full" placeholder="Status (e.g., done, completed)" value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value })} />
          <input type="date" className="border p-2 w-full" placeholder="Next Visit" value={formData.nextDate} onChange={e => setFormData({ ...formData, nextDate: e.target.value })} />

          {/* File Input */}
          <input
            type="file"
            multiple
            className="border p-2 w-full"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />

          <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Add Incident
          </button>
        </form>

        {/* Incident List */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">📋 All Incidents</h3>
          {incidents.length === 0 ? (
            <p className="text-gray-500">No incidents yet.</p>
          ) : (
            <ul className="space-y-3">
              {incidents.map((i) => (
                <li key={i.id} className="border p-4 rounded shadow-sm bg-gray-50">
                  <div className="font-bold text-blue-800">{i.title}</div>
                  <div className="text-sm text-gray-700">
                    🕒 {new Date(i.appointmentDate).toLocaleString()}<br />
                    💬 {i.description}<br />
                    💰 ₹{i.cost} — 🏥 {i.status} — 🔁 Next Visit: {i.nextDate || 'N/A'}<br />
                    🧾 Treatment: {i.treatment}
                  </div>

                  {i.files && i.files.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium text-sm">📎 Attachments:</p>
                      <ul className="space-y-1 mt-1">
                        {i.files.map((f, idx) => (
                          <li key={idx}>
                            <a
                              href={f.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 underline text-sm"
                            >
                              {f.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Incidents;
