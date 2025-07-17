import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function AdminLeaveHistory() {
  const navigate = useNavigate();
  const [leaveHistory, setLeaveHistory] = useState([]);

  const fetchLeaveHistory = useCallback(async () => {
    try {
      const res = await API.get('/leaves/history');
      setLeaveHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch admin leave history:', err);
      alert('Could not load leave history.');
    }
  }, []);

  useEffect(() => {
    fetchLeaveHistory();
  }, [fetchLeaveHistory]);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-GB', options);
  };

  const getStatusBadge = (status) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'approved') return 'success';
    if (lowerStatus === 'disapproved' || lowerStatus === 'declined') return 'danger';
    if (lowerStatus === 'pending') return 'warning';
    return 'secondary';
  };

  return (
    <div className="container py-4">
      {/* Top bar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="btn btn-outline-secondary"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>
        <h4 className="mb-0 flex-grow-1 text-center">Leave History Records</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      <div className="card shadow-sm border-0">
        <div className="card-body">
          {leaveHistory.length === 0 ? (
            <div className="text-center text-muted py-4">
              <i className="bi bi-inbox display-4 mb-3"></i>
              <p className="mb-0">No approved or declined leave history found.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>User ID</th>
                    <th>Employee</th>
                    <th>Leave Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th>Requested At</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveHistory.map((leave) => (
                    <tr key={leave.request_id}>
                      <td>{leave.user_id}</td>
                      <td>{leave.first_name} {leave.last_name}</td>
                      <td>{leave.leave_type}</td>
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

export default AdminLeaveHistory;
