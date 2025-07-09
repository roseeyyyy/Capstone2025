import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';

function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => setRole(null);

  return (
    <Router>
      <div>
        {!role ? (
          <Login onLogin={setRole} />
        ) : (
          <>
            <Routes>
              {/* Admin Dashboard */}
              <Route path="/" element={<AdminDashboard onLogout={handleLogout} />} />

              {/* Manage Users */}
              {role === 'admin' && (
                <>
                  <Route path="/manage-users" element={<ManageUsers />} />
                  <Route path="/user/:id" element={<UserDetails />} />
                  <Route path="/create-user" element={<CreateUser />} />
                </>
              )}

              {/* If no matching route, redirect to dashboard */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
