import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LogoutButton({ onLogout }) {
  return (
    <button
      className="btn btn-outline-secondary rounded-circle"
      onClick={onLogout}
      title="Logout"
    >
      <i className="bi-box-arrow-right fs-4"></i>
    </button>
  );
}

export default LogoutButton;
