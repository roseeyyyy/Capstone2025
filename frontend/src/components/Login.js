import React, { useState } from 'react';
import { API } from '../api';

const Login = ({ onLogin }) => {
  const [pin, setPin] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { pin });
      if (res.data.role === 'admin') {
        onLogin('admin');
      } else {
        alert('Access denied. Not an admin.');
      }
    } catch (err) {
      alert('Invalid PIN');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Admin Login</h2>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
