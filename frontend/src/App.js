import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import ViewAllRequests from './components/ViewAllRequests';
import ManageUsers from './pages/ManageUsers';
import UserDetails from './pages/UserDetails';
import CreateUser from './pages/CreateUser';
import AdminLeaveHistory from './components/AdminLeaveHistory';

import StaffDashboard from './components/StaffDashboard';
import LeaveForm from './pages/LeaveForm';
import LeaveStatus from './components/LeaveStatus';
import LeaveHistory from './components/LeaveHistory';
import Balance from './components/Balance';

function App() {
  // Define logout handler
  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.clear();
    window.location.href = '/'; // Or use useNavigate if you want SPA-style navigation
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          {/* Login Page */}
          <Route path="/" element={<Login />} />

          {/* Admin Dashboard */}
          <Route path="/dashboard" element={<AdminDashboard onLogout={handleLogout} />} />
          <Route path="/view-requests" element={<ViewAllRequests />} />
          <Route path="/manage-users" element={<ManageUsers />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/admin-leave-history" element={<AdminLeaveHistory />} />

          {/* Staff Dashboard */}
          <Route path="/staff-dashboard" element={<StaffDashboard onLogout={handleLogout} />} />
          <Route path="/leave-form" element={<LeaveForm />} />
          <Route path="/leave-status" element={<LeaveStatus />} />
          <Route path="/leave-history" element={<LeaveHistory />} />
          <Route path="/check-balance" element={<Balance />} />

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
