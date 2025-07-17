import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import 'bootstrap-icons/font/bootstrap-icons.css';

function StaffDashboard({ onLogout }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const cardItems = [
    {
      title: 'Request Leave',
      icon: 'bi-calendar-plus',
      action: () => navigate('/leave-form'),
      color: 'primary'
    },
    {
      title: 'Leave Status',
      icon: 'bi-clipboard-check',
      action: () => navigate('/leave-status'),
      color: 'success'
    },
    {
      title: 'Leave History',
      icon: 'bi-clock-history',
      action: () => navigate('/leave-history'),
      color: 'info'
    },
    {
      title: 'Check Leave Balance',
      icon: 'bi-wallet2',
      action: () => navigate('/check-balance'),
      color: 'warning'
    }
  ];

  return (
    <div className="container py-5">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Welcome, {userName}!</h2>
          <p className="text-muted mb-0">Your Leave Management Dashboard</p>
        </div>
        <LogoutButton onLogout={onLogout} />
      </div>

      {/* Card buttons */}
      <div className="row g-4">
        {cardItems.map((item, index) => (
          <div className="col-12 col-md-6 col-lg-3" key={index}>
            <div
              className={`card h-100 text-center border-0 shadow-sm hover-shadow transition`}
              style={{ cursor: 'pointer', borderRadius: '1rem' }}
              onClick={item.action}
            >
              <div className="card-body py-4">
                <div className={`text-${item.color} mb-3`}>
                  <i className={`${item.icon} display-4`}></i>
                </div>
                <h5 className="card-title fw-semibold">{item.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-5 text-muted" style={{ fontSize: '0.85rem' }}>
        &copy; {new Date().getFullYear()} Leave Form System
      </div>
    </div>
  );
}

export default StaffDashboard;
