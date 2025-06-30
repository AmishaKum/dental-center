🦷 ENTNT Dental Center – React Patient & Admin Portal
A responsive dental clinic management web app built with React, React Router, and Tailwind CSS. It supports role-based login, appointment tracking, profile management, and an admin dashboard with KPIs.

✨ Features
👨‍⚕️ Admin
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
Assignment developed by Amisha Kumari for ENTNT Dental Center.

📌 Notes
Bootstrapped using Create React App

Styling via Tailwind CSS