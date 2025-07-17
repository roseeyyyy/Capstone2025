import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get(`/users/${id}`);
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching user:', err);
        setMessage('Failed to load user data.');
        setMessageType('danger');
        setShowAlert(true);
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setShowAlert(false);
    try {
      setIsSaving(true);
      await API.put(`/users/${id}`, user);
      setMessage('User updated successfully!');
      setMessageType('success');
      setShowAlert(true);
      setTimeout(() => navigate('/manage-users'), 1500);
    } catch (err) {
      console.error('Failed to update user', err);
      setMessage(err.response?.data?.error || 'Could not update user.');
      setMessageType('danger');
      setShowAlert(true);
    } finally {
      setIsSaving(false);
    }
  };

  if (!user) return <div className="container mt-5">Loading user details...</div>;

  return (
    <div className="container py-4" style={{ maxWidth: '650px' }}>
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/manage-users')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <h4 className="mb-0 flex-grow-1 text-center">Edit User Details</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Alert */}
      {showAlert && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
          {message}
          <button type="button" className="btn-close" onClick={() => setShowAlert(false)}></button>
        </div>
      )}

      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form onSubmit={handleUpdate}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Role</label>
                <select
                  className="form-select"
                  name="role"
                  value={user.role}
                  onChange={handleChange}
                  required
                >
                  <option value="FOH">FOH</option>
                  <option value="BOH">BOH</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  name="contact_number"
                  value={user.contact_number}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">PIN</label>
                <input
                  type="password"
                  className="form-control"
                  name="pin"
                  value={user.pin}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mt-4 d-flex justify-content-end">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Saving...
                  </>
                ) : (
                  <>
                    <i className="bi bi-save me-2"></i> Update User
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UserDetails;
