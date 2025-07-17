import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LeaveHistory() {
  const navigate = useNavigate();
  const [leaveHistory, setLeaveHistory] = useState([]);
  const [filteredType, setFilteredType] = useState('All');

  const userId = localStorage.getItem('userId');

  const fetchLeaveHistory = useCallback(async () => {
    try {
      const res = await API.get(`/leaves/history/${userId}`);
      setLeaveHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch leave history:', err);
      //alert('Could not load leave history.');
    }
  }, [userId]);

  useEffect(() => {
    fetchLeaveHistory();
  }, [fetchLeaveHistory]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ');
  };

  const getStatusBadge = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'approved') return 'success';
    if (lowerStatus === 'declined' || lowerStatus === 'disapproved') return 'danger';
    if (lowerStatus === 'pending') return 'warning';
    return 'secondary';
  };

  const getTypeBadge = (type) => {
    const lowerType = type.toLowerCase();
    if (lowerType === 'annual') return 'primary';
    if (lowerType === 'sick') return 'info';
    if (lowerType === 'unpaid') return 'secondary';
    if (lowerType === 'lieu') return 'dark';
    return 'light';
  };

  const filteredLeaves = filteredType === 'All'
    ? leaveHistory
    : leaveHistory.filter((leave) => leave.leave_type.toLowerCase() === filteredType.toLowerCase());

  return (
    <div className="container py-4">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/staff-dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <h4 className="mb-0 text-center flex-grow-1">Your Leave History</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-3 d-flex justify-content-end">
        <select
          className="form-select w-auto"
          value={filteredType}
          onChange={(e) => setFilteredType(e.target.value)}
        >
          <option value="All">All Types</option>
          <option value="Annual">Annual</option>
          <option value="Sick">Sick</option>
          <option value="Unpaid">Unpaid</option>
          <option value="Lieu">Lieu</option>
        </select>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          {filteredLeaves.length === 0 ? (
            <div className="text-center text-muted py-3">
              <i className="bi bi-info-circle me-2"></i>No leave history found.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Requested At</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeaves.map((leave) => (
                    <tr key={leave.request_id}>
                      <td>
                        <span className={`badge bg-${getTypeBadge(leave.leave_type)}`}>
                          {leave.leave_type}
                        </span>
                      </td>
                      <td>{formatDate(leave.start_date)}</td>
                      <td>{formatDate(leave.end_date)}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className={`badge bg-${getStatusBadge(leave.leave_status)}`}>
                          {leave.leave_status}
                        </span>
                      </td>
                      <td>{formatDate(leave.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LeaveHistory;
