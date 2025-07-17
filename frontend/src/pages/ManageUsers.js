import React, { useEffect, useState, useCallback } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('');

  const fetchUsers = useCallback(async () => {
    const res = await API.get('/users', {
      params: { role: filter }
    });
    setUsers(res.data);
  }, [filter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);


  return (
    <div className="container py-4">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>

        <h3 className="mb-0 flex-grow-1 text-center">Manage Users</h3>

        <button
          type="button"
          className="btn btn-success"
          onClick={() => navigate('/create-user')}
        >
          <i className="bi bi-person-plus me-1"></i> Create User
        </button>
      </div>

      {/* Filter */}
      <div className="mb-4">
        <label htmlFor="roleFilter" className="form-label fw-semibold">
          Filter by Role:
        </label>
        <select
          id="roleFilter"
          className="form-select w-auto d-inline-block ms-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All</option>
          <option value="FOH">FOH</option>
          <option value="BOH">BOH</option>
          <option value="Manager">Manager</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Email</th>
                  <th>Contact Number</th>
                  <th>PIN</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      <i className="bi bi-person-x fs-4"></i>
                      <p className="mb-0">No users found for this role.</p>
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.user_id}>
                      <td>{u.first_name} {u.last_name}</td>
                      <td>
                        <span className="badge bg-secondary">{u.role}</span>
                      </td>
                      <td>{u.email}</td>
                      <td>{u.contact_number}</td>
                      <td>{u.pin}</td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => navigate(`/user/${u.user_id}`)}
                        >
                          <i className="bi bi-pencil-square me-1"></i> Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUsers;
