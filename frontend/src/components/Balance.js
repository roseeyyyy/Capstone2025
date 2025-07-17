import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { API } from '../api';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Balance() {
  const navigate = useNavigate();
  const staff_id = localStorage.getItem('userId');

  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchLeaveBalance = useCallback(async () => {
    if (!staff_id) {
      setError('Staff ID not found. Please log in again.');
      setLoading(false);
      return;
    }

    try {
      const res = await API.get(`/leaves/${staff_id}/balance`);
      setBalance(res.data.data);
    } catch (err) {
      console.error('Failed to fetch leave balance', err);
      setError('Failed to fetch leave balance.');
    } finally {
      setLoading(false);
    }
  }, [staff_id]);

  useEffect(() => {
    fetchLeaveBalance();
  }, [fetchLeaveBalance]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-3">Loading leave balances...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      </div>
    );
  }

  const remainingAnnual = balance.annual_leave_entitlement - balance.used_annual;
  const remainingSick = balance.sick_leave_entitlement - balance.used_sick;
  const remainingLieu = balance.lieu_entitlement - balance.used_lieu;

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
        <h4 className="mb-0">Leave Balances</h4>
        <div style={{ width: '42px' }}></div>
      </div>

      {/* Card */}
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
              <thead className="table-light">
                <tr>
                  <th>Leave Type</th>
                  <th>Entitlement</th>
                  <th>Used</th>
                  <th>Remaining</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Annual Leave</td>
                  <td>{balance.annual_leave_entitlement} days</td>
                  <td>{balance.used_annual} days</td>
                  <td>{remainingAnnual >= 0 ? remainingAnnual : 0} days</td>
                </tr>
                <tr>
                  <td>Sick Leave</td>
                  <td>{balance.sick_leave_entitlement} days</td>
                  <td>{balance.used_sick} days</td>
                  <td>{remainingSick >= 0 ? remainingSick : 0} days</td>
                </tr>
                <tr>
                  <td>Lieu Leave</td>
                  <td>{balance.lieu_entitlement} days</td>
                  <td>{balance.used_lieu} days</td>
                  <td>{remainingLieu >= 0 ? remainingLieu : 0} days</td>
                </tr>
                <tr>
                  <td>Unpaid Leave</td>
                  <td>—</td>
                  <td>{balance.used_unpaid} days</td>
                  <td>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Balance;
