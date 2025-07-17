import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

function LeaveForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.type) newErrors.type = 'Leave type is required.';
    if (!formData.startDate) newErrors.startDate = 'Start date is required.';
    if (!formData.endDate) newErrors.endDate = 'End date is required.';
    if (formData.startDate && formData.endDate && new Date(formData.startDate) > new Date(formData.endDate)) {
      newErrors.date = 'Start date cannot be after end date.';
    }
    if (!formData.reason) newErrors.reason = 'Reason is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please login first.');
      return;
    }

    if (!validateForm()) return;

    try {
      await API.post('/leaves', { ...formData, userId });
      alert('Leave request submitted!');
      navigate('/staff-dashboard');
    } catch (err) {
      console.error('Failed to submit leave request:', err.response?.data || err.message);
      alert(err.response?.data?.error || 'Failed to submit leave request.');
    }
  };

  return (
    <div className="container py-4" style={{ maxWidth: '600px' }}>
      {/* Top Bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/staff-dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <h4 className="mb-0 text-center flex-grow-1">Leave Request Form</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <form onSubmit={handleSubmit} noValidate>

            {/* Leave Type */}
            <div className="mb-3">
              <label className="form-label">Leave Type</label>
              <select
                className={`form-select ${errors.type ? 'is-invalid' : ''}`}
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="" disabled>Select Type</option>
                <option value="sick">Sick Leave</option>
                <option value="annual">Annual Leave</option>
                <option value="lieu_day">Lieu Day</option>
                <option value="unpaid">Unpaid Leave</option>
              </select>
              <div className="invalid-feedback">{errors.type}</div>
            </div>

            {/* Start Date */}
            <div className="mb-3">
              <label className="form-label">Start Date</label>
              <input
                type="date"
                className={`form-control ${errors.startDate || errors.date ? 'is-invalid' : ''}`}
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.startDate || errors.date}</div>
            </div>

            {/* End Date */}
            <div className="mb-3">
              <label className="form-label">End Date</label>
              <input
                type="date"
                className={`form-control ${errors.endDate || errors.date ? 'is-invalid' : ''}`}
                name="endDate"
                value={formData.endDate}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.endDate || errors.date}</div>
            </div>

            {/* Reason */}
            <div className="mb-3">
              <label className="form-label">Reason</label>
              <textarea
                className={`form-control ${errors.reason ? 'is-invalid' : ''}`}
                name="reason"
                rows="3"
                value={formData.reason}
                onChange={handleChange}
              />
              <div className="invalid-feedback">{errors.reason}</div>
            </div>

            {/* Buttons */}
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-primary">
                Submit Request
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default LeaveForm;
