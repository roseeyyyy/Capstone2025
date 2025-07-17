import { API } from '../api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before trying login

    try {
      const res = await API.post('/auth/login', { pin });
      console.log('Role returned from backend:', res.data.role);

      localStorage.setItem('userId', res.data.userId);
      localStorage.setItem('userName', res.data.name);
      localStorage.setItem('userRole', res.data.role);

      switch (res.data.role) {
        case 'Admin':
          navigate('/dashboard');
          break;
        case 'Manager':
        case 'FOH':
        case 'BOH':
          navigate('/staff-dashboard');
          break;
        default:
          setError('Access denied.');
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Invalid PIN.');
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="card p-4 shadow rounded-4" style={{ maxWidth: '400px', width: '100%' }}>
        <div className="text-center mb-4">
          <i className="bi bi-calendar-check display-4 text-primary"></i>
          <h2 className="fw-bold mt-2">Leave Form System</h2>
          <p className="text-muted mb-0">Leave Portal</p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="pin" className="form-label fw-semibold">
              Enter your PIN
            </label>
            <input
              id="pin"
              type="password"
              className={`form-control ${error ? 'is-invalid' : ''}`}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="4 digit PIN"
              required
              autoFocus
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            <i className="bi bi-box-arrow-in-right me-2"></i> Login
          </button>
        </form>

        <div className="text-center mt-4 text-muted" style={{ fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Leave Form System
        </div>
      </div>
    </div>
  );
}

export default Login;
