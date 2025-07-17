import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function LeaveStatus() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);

  const userId = localStorage.getItem('userId');

  const fetchLeaveRequests = useCallback(async () => {
    try {
      const res = await API.get(`/leaves/role/${userId}`);
      console.log('Fetched leaves:', res.data);

      const pendingLeaves = res.data.filter(
        (leave) => leave.leave_status.toLowerCase() === 'pending'
      );
      setLeaveRequests(pendingLeaves);
    } catch (err) {
      console.error('Failed to fetch leaves', err);
    }
  }, [userId]);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  // Format date as DD/MM/YYYY
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-NZ');
  };

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
        <h4 className="mb-0 text-center flex-grow-1">Pending Leave Requests</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          {leaveRequests.length === 0 ? (
            <div className="text-center text-muted py-3">
              <i className="bi bi-info-circle me-2"></i>No pending leave requests.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>Type</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Reason</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {leaveRequests.map((leave) => (
                    <tr key={leave.request_id}>
                      <td>{leave.leave_type}</td>
                      <td>{formatDate(leave.start_date)}</td>
                      <td>{formatDate(leave.end_date)}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {leave.leave_status}
                        </span>
                      </td>
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

export default LeaveStatus;
