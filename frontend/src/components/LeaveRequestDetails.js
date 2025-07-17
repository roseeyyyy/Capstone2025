import React, { useState, useEffect, useCallback } from 'react';
import { API } from '../api';

const LeaveRequestDetails = ({ requestId, onBack }) => {
  const [request, setRequest] = useState(null);

  const fetchRequest = useCallback(async () => {
    const res = await API.get(`/leaves/${requestId}`);
    setRequest(res.data);
  }, [requestId]);

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest]);

  const retrieveEmployeeLeaveRecord = async (user_id, leave_type) => {
    const result = await API.get(`/leaves/${user_id}/balance`, {
      params: { leave_type }
    });
    console.log(leave_type)
    console.log(result);
  };

  const updateStatus = async (status) => {
    await API.put(`/leaves/${requestId}`, { status });
    //alert(`Request ${status}`);
    onBack();
  };

  if (!request) return <div className="container mt-4">Loading leave request details...</div>;

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h3 className="card-title mb-3">Leave Request Details</h3>

          <p><strong>Employee:</strong> {request.first_name} {request.last_name}</p>
          <p><strong>Leave Type:</strong> {request.leave_type}</p>
          <p><strong>Start Date:</strong> {request.start_date}</p>
          <p><strong>End Date:</strong> {request.end_date}</p>
          <p><strong>Reason:</strong> {request.reason}</p>
          <p><strong>Status:</strong> {request.leave_status}</p>

          {request.leave_status !== 'approved' && request.leave_status !== 'disapproved' && (
            <div className="mt-4 d-flex gap-2">
              <button
                className="btn btn-success"
                onClick={() => {
                  retrieveEmployeeLeaveRecord(request.user_id, request.leave_type);
                  updateStatus('approved');
                }}
              >
                <i className="bi bi-check-circle me-1"></i> Accept
              </button>

              <button
                className="btn btn-danger"
                onClick={() => updateStatus('disapproved')}
              >
                <i className="bi bi-x-circle me-1"></i> Decline
              </button>
            </div>
          )}

          <div className="mt-4">
            <button
              className="btn btn-outline-secondary"
              onClick={onBack}
            >
              <i className="bi bi-arrow-left me-1"></i> Back to List
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LeaveRequestDetails;
