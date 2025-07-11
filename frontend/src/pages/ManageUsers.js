import React, { useEffect, useState, useCallback } from 'react';
import { API } from '../api';
import { Link, useNavigate } from 'react-router-dom';

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchUsers = useCallback(async () => {
    const res = await API.get('/users', {
      params: { type: filter }
    });
    setUsers(res.data);
  },[filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="container">
      <h2>Manage Users</h2>

      <div>
        <label>Filter by Type: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="FOH">FOH</option>
          <option value="BOH">BOH</option>
          <option value="Manager">Manager</option>

          <button onClick={() => navigate('/')}>Back</button>
        </select>
      </div>

      <button onClick={() => window.location.href = '/create-user'}>
        Create User
      </button>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.name}</td>
              <td>{u.type}</td>
              <td>
                <Link to={`/user/${u.id}`}>
                  <button>View</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/dashboard')}>Back</button>
    </div>
  );
}

export default ManageUsers;
