🦷 ENTNT Dental Center – React Patient & Admin Portal
Welcome to the ENTNT Dental Center Management System, a modern web application designed for  clinic operations for both administrators and patients. Built using React and Tailwind CSS, this portal features an Use friendly UI, role-based access, and simple appointment and patient tracking – all powered by localStorage.
✨ Features
👩‍⚕️ Admin
Secure login (email & password)

Dashboard with KPIs (total patients, revenue, treatments)

Patient management (Add, Edit, Delete)

Record & view treatment/incident history

View appointments in a calendar

🧑 Patient
Login with contact number (no password required)

View upcoming appointments

Edit and view profile

View treatment history

📁 Folder Structure
pgsql
Copy
Edit
src/
├── components/         # Layouts and ProtectedRoute wrapper
├── pages/
│   ├── admin/          # Admin views: Dashboard, Patients, Calendar, Incidents
│   └── patient/        # Patient views: Dashboard, Profile
├── data/               # Initial seed data (users, patients)
├── App.js              # Entry point with localStorage seeding
├── AppRouter.js        # Role-based routes using React Router
🔐 Credentials
Role	Login Info
Admin	admin@entnt.in / admin123
Patient	Contact: 1234567890 (no password)

🛠️ Tech Stack
React 19

React Router DOM v7

Tailwind CSS

LocalStorage (as mock backend)

React Calendar

PostCSS + Autoprefixer

⚙️ Getting Started
1. 📦 Install Dependencies
bash
Copy
Edit
npm install
2. 🧪 Run the App
bash
Copy
Edit
npm start
Open http://localhost:3000 in your browser.

3. 📦 Build for Production
bash
Copy
Edit
npm run build
4. 🧹 Reset Local Storage (if needed)
To reinitialize users/patients data:

Open Developer Tools → Application tab → Local Storage

Clear the following keys: users, patients, incidents

Refresh the app

👩‍💻 Author
This project was developed by Amisha Kumari as part of the ENTNT Dental Center assignment. It's designed for learning, experimentation, and showcasing frontend skills using modern tools like React and Tailwind CSS.



📌 Notes
Bootstrapped using Create React App

Styling via Tailwind CSS
