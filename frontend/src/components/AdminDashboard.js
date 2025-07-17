import React from 'react';
import LogoutButton from './LogoutButton';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

const AdminDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  const cardItems = [
    {
      title: 'View All Requests',
      icon: 'bi-folder2-open',
      action: () => navigate('/view-requests'),
      color: 'primary',
    },
    {
      title: 'Leave History',
      icon: 'bi-clock-history',
      action: () => navigate('/admin-leave-history'),
      color: 'info',
    },
    {
      title: 'Manage Users',
      icon: 'bi-people',
      action: () => navigate('/manage-users'),
      color: 'success',
    },
  ];

  return (
    <div className="container py-5">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div>
          <h2 className="fw-bold mb-1">Welcome, {userName}!</h2>
          <p className="text-muted mb-0">Admin Leave Management Dashboard</p>
        </div>
        <LogoutButton onLogout={onLogout} />
      </div>

      {/* Card grid */}
      <div className="row g-4">
        {cardItems.map((item, idx) => (
          <div className="col-12 col-md-6 col-lg-4" key={idx}>
            <div
              className={`card h-100 text-center border-0 shadow-sm hover-shadow transition`}
              style={{ cursor: 'pointer', borderRadius: '1rem' }}
              onClick={item.action}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') item.action();
              }}
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
};

export default AdminDashboard;
