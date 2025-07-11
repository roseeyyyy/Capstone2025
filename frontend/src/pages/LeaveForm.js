import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

function LeaveForm() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit leave request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Submit leave request to backend
      await API.post('/api/leaves', formData);
      alert('Leave request submitted!');
      navigate('/staff-dashboard');
    } catch (err) {
      console.error('Failed to submit leave request:', err.response?.data || err.message);
      alert('Failed to submit leave request.');
    }
  };

  return (
    <div className="form-container">
      <h2>Leave Form</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Leave Type:</label>
          <select name="type" value={formData.type} onChange={handleChange} required>
            <option value="">Select Type</option>
            <option value="Sick">Sick Leave</option>
            <option value="Vacation">Annual Leave</option>
            <option value="Lieu Day">Lieu Day</option>
            <option value="Unpaid">Unpaid Leave</option>
          </select>
        </div>

        <div>
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Reason:</label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit Request</button>
        <button type="button" onClick={() => navigate('/staff-dashboard')}>
          Back
        </button>

      </form>
    </div>
  );
}

export default LeaveForm;
