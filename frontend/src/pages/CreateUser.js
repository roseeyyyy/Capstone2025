import React, { useState } from 'react';
import { API } from '../api';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CreateUser() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pin, setPin] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'danger'
  const [showAlert, setShowAlert] = useState(false);

  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    setShowAlert(false);

    try {
      setIsSaving(true);
      await API.post('/users', {
        first_name: firstName,
        last_name: lastName,
        role,
        email,
        contact_number: number,
        pin,
      });

      setMessage('User created successfully!');
      setMessageType('success');
      setShowAlert(true);

      setTimeout(() => {
        navigate('/manage-users');
      }, 1500);
    } catch (err) {
      console.error('Failed to create user', err);
      setMessage(err.response?.data?.error || 'Could not create user.');
      setMessageType('danger');
      setShowAlert(true);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '650px' }}>
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/manage-users')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <h4 className="mb-0 flex-grow-1 text-center">Create New User</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Alert Message */}
      {showAlert && (
        <div className={`alert alert-${messageType} alert-dismissible fade show`} role="alert">
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setShowAlert(false)}
          ></button>
        </div>
      )}

      {/* Form Card */}
      <div className="card shadow-sm border-0">
        <div className="card-body">
          <form onSubmit={handleCreate}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Employee Type</label>
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                >
                  <option value="">Select Employee Type</option>
                  <option value="FOH">FOH</option>
                  <option value="BOH">BOH</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Contact Number</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter contact number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Login PIN</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Set a login PIN"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
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
                    Creating...
                  </>
                ) : (
                  <>
                    <i className="bi bi-person-plus me-2"></i> Create User
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

export default CreateUser;
