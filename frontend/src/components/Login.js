import { API } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [pin, setPin] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { pin });

      console.log(res.data); // Debugging

      if (res.data.role === 'admin') {
        navigate('/dashboard');
      } else if (res.data.role === 'staff') {
        navigate('/staff-dashboard');
      } else {
        alert('Access denied.');
      }
    } catch (err) {
      alert(err.response?.data?.error || 'Invalid PIN.');
      console.error(err);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin}>
        <h2>Enter your PIN to Login</h2>
        <input
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="Enter PIN"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
