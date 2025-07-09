import { API } from '../api';
import { useState } from 'react';

function Login({ onLogin }) {
  const [pin, setPin] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { pin });

      console.log(res.data); // 👈 add this for debugging

      if (res.data.role === 'admin') {
        onLogin('admin');
      } else if (res.data.role === 'staff') {
        onLogin('staff');
      } else {
        alert('Access denied.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Something went wrong.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="password"
        value={pin}
        onChange={(e) => setPin(e.target.value)}
        placeholder="Enter PIN"
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
