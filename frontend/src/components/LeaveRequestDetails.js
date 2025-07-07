import React, { useState, useEffect } from 'react';
import { API } from '../api';

const LeaveRequestDetails = ({ requestId, onBack }) => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    fetchRequest();
  }, []);

  const fetchRequest = async () => {
    const res = await API.get(`/leaves/${requestId}`);
    setRequest(res.data);
  };

  const updateStatus = async (status) => {
    await API.put(`/leaves/${requestId}`, { status });
    alert(`Request ${status}`);
    onBack();
  };

  if (!request) return <p>Loading...</p>;

  return (
    <div>
      <h2>Leave Request Details</h2>
      <p><strong>Employee:</strong> {request.employee_name}</p>
      <p><strong>Leave Type:</strong> {request.leave_type}</p>
      <p><strong>Start Date:</strong> {request.start_date}</p>
      <p><strong>End Date:</strong> {request.end_date}</p>
      <p><strong>Reason:</strong> {request.reason}</p>
      <p><strong>Status:</strong> {request.status}</p>

      <button onClick={() => updateStatus('Approved')}>Accept</button>
      <button onClick={() => updateStatus('Declined')}>Decline</button>
      <br /><br />
      <button onClick={onBack}>Back to List</button>
    </div>
  );
};

export default LeaveRequestDetails;
