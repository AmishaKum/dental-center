import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // ✅ State hooks — write these at the top of your component
  const [input, setInput] = useState('');        // for contact or email
  const [password, setPassword] = useState('');  // for admin only
  const [showPassword, setShowPassword] = useState(true); // show only if email

  // ✅ Handle login
  const handleLogin = (e) => {
  e.preventDefault();
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const patients = JSON.parse(localStorage.getItem('patients')) || [];

  // Admin login by email & password
  const admin = users.find(
    (u) => u.role === 'Admin' && u.email === input && u.password === password
  );

  // Patient login by contact only
  const patientData = patients.find((p) => p.contact === input);

  if (admin) {
    localStorage.setItem('loggedInUser', JSON.stringify(admin));
    navigate('/admin/dashboard');
  } else if (patientData) {
    // Create a fake user object for patient login
    const patientUser = {
      id: patientData.id,
      role: 'Patient',
      patientId: patientData.id,
      contact: patientData.contact,
      name: patientData.name,
    };

    localStorage.setItem('loggedInUser', JSON.stringify(patientUser));
    navigate('/patient/dashboard');
  } else {
    alert('Invalid contact number or credentials');
  }
};


  // ✅ Handle input field change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    const isContact = /^\d{10}$/.test(value); // detect 10-digit number
    setShowPassword(!isContact); // hide password if it's a contact number
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-blue-700 px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">🦷 ENTNT Login</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Contact</label>
            <input
              type="text"
              placeholder="admin@entnt.in or 9876543210"
              value={input}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {showPassword && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Admin: <span className="font-bold">Use Email & Password</span> <br />
          Patient: <span className="font-bold">Use Contact Number only</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
