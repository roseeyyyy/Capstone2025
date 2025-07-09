import React from 'react';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

const AdminDashboard = ({ onLogout }) => {
  return (
    <div className="container">
      <h2>Admin Dashboard</h2>

      {/* Button to View All Requests */}
      <Link to="/view-requests">
        <button>View All Requests</button>
      </Link>

      {/* Leave History — can set up route later */}
      <button onClick={() => alert('Leave History Page Coming Soon')}>Leave History</button>

      {/* Manage Users */}
      <Link to="/manage-users">
        <button>Manage Users</button>
      </Link>

      <br /><br />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
};

export default AdminDashboard;
