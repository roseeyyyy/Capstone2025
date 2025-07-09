import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ManageUsers from './pages/ManageUsers';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import StaffDashboard from './components/StaffDashboard';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Admin Dashboard */}
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/create-user" element={<CreateUser />} />

          {/* Staff Dashboard */}
          <Route path="/staff-dashboard" element={<StaffDashboard />} />

          {/* Catch-all: redirect unknown paths to login */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
