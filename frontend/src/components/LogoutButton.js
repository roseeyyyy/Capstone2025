import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // optionally clear any localStorage/session data here if used
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;
