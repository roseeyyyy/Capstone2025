import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

function LeaveStatus() {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);

  const staff_id = localStorage.getItem('staff_id');

  const fetchLeaveRequests = useCallback(async () => {
    try {
      const res = await API.get(`/api/leaves?staff_id=${staff_id}`);
      // Only keep leaves with Pending status
      const pendingLeaves = res.data.filter(leave => leave.status === 'Pending');
      setLeaveRequests(pendingLeaves);
    } catch (err) {
      console.error('Failed to fetch leaves', err);
      //alert('Could not load leave requests.');
    }
  }, [staff_id]);

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  return (
    <div className="container">
      <h2>Pending Leave Requests</h2>

      {leaveRequests.length === 0 ? (
        <p>No pending leave requests.</p>
      ) : (
        <table>
          <thead>
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
              <tr key={leave.id}>
                <td>{leave.type}</td>
                <td>{leave.start_date}</td>
                <td>{leave.end_date}</td>
                <td>{leave.reason}</td>
                <td>{leave.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate('/staff-dashboard')}>Back</button>
    </div>
  );
}

export default LeaveStatus;
