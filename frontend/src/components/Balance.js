import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';

function Balance() {
  const navigate = useNavigate();
  const staff_id = localStorage.getItem('staff_id');

  // Set entitlements per type
  const entitlements = {
    Annual: 20,
    Sick: 10,
    Lieu: 5
  };

  const [balances, setBalances] = useState({
    Annual: 0,
    Sick: 0,
    Lieu: 0
  });

  const fetchLeaveBalance = async () => {
    try {
      const res = await API.get(`/api/leaves?staff_id=${staff_id}`);
      const approvedLeaves = res.data.filter(leave => leave.status === 'Approved');

      // Initialize counts
      let totals = {
        Annual: 0,
        Sick: 0,
        Lieu: 0
      };

      // Calculate days taken for each leave type
      approvedLeaves.forEach((leave) => {
        const start = new Date(leave.start_date);
        const end = new Date(leave.end_date);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

        if (totals[leave.type] !== undefined) {
          totals[leave.type] += diffDays;
        }
      });

      setBalances(totals);
    } catch (err) {
      console.error('Failed to fetch leave balance', err);
      alert('Could not load leave balance.');
    }
  };

  useEffect(() => {
    fetchLeaveBalance();
  }, []);

  return (
    <div className="container">
      <h2>Leave Balances</h2>

      <table>
        <thead>
          <tr>
            <th>Leave Type</th>
            <th>Entitlement</th>
            <th>Used</th>
            <th>Remaining</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(entitlements).map((type) => (
            <tr key={type}>
              <td>{type}</td>
              <td>{entitlements[type]} days</td>
              <td>{balances[type] || 0} days</td>
              <td>{entitlements[type] - (balances[type] || 0)} days</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={() => navigate('/staff-dashboard')}>Back</button>
    </div>
  );
}

export default Balance;
