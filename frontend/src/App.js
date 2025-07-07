import React, { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [role, setRole] = useState(null);

  const handleLogout = () => setRole(null);

  return (
    <div>
      {!role && <Login onLogin={setRole} />}
      {role === 'admin' && <AdminDashboard onLogout={handleLogout} />}
    </div>
  );
}

export default App;
