import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';

function StaffDashboard({ onLogout }) {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Staff Dashboard</h2>

      <button onClick={() => navigate('/request-leave')}>
        Request Leave
      </button>

      <button onClick={() => navigate('/leave-status')}>
        Leave Status
      </button>

      <button onClick={() => navigate('/leave-history')}>
        Leave History
      </button>

      <button onClick={() => navigate('/check-balance')}>
        Check Leave Balance
      </button>

      <br /><br />
      <LogoutButton onLogout={onLogout} />
    </div>
  );
}

export default StaffDashboard;
