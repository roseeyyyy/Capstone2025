import React, { useState } from 'react';
import LogoutButton from './LogoutButton';
import ViewAllRequests from './ViewAllRequests';

const AdminDashboard = ({ onLogout }) => {
  const [page, setPage] = useState('dashboard');

  return (
    <div>
      {page === 'dashboard' && (
        <>
          <h2>Admin Dashboard</h2>
          <button onClick={() => setPage('requests')}>View All Requests</button>
          <button onClick={() => alert('Leave History Page')}>Leave History</button>
          <button onClick={() => alert('Manage Users Page')}>Manage Users</button>
          <br /><br />
          <LogoutButton onLogout={onLogout} />
        </>
      )}

      {page === 'requests' && (
        <ViewAllRequests onBack={() => setPage('dashboard')} />
      )}
    </div>
  );
};

export default AdminDashboard;
