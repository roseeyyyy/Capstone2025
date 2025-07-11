import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

function LeaveHistory() {
  const navigate = useNavigate();
  const [leaveHistory, setLeaveHistory] = useState([]);

  const staff_id = localStorage.getItem('staff_id');

  const fetchLeaveHistory = useCallback(async () => {
    try {
      const res = await API.get(`/api/leaves?staff_id=${staff_id}`);
      // Filter for leaves with status Approved or Declined
      const history = res.data.filter(leave => 
        leave.status === 'Approved' || leave.status === 'Declined'
      );
      setLeaveHistory(history);
    } catch (err) {
      console.error('Failed to fetch leave history', err);
      //alert('Could not load leave history.');
    }
  }, [staff_id]);

  useEffect(() => {
    fetchLeaveHistory();
  }, [fetchLeaveHistory]);

  return (
    <div className="container">
      <h2>Leave History</h2>

      {leaveHistory.length === 0 ? (
        <p>No leave history yet.</p>
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
            {leaveHistory.map((leave) => (
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

export default LeaveHistory;
