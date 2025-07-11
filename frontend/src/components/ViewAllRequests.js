import React, { useState, useEffect } from 'react';
import { API } from '../api';
import LeaveRequestDetails from './LeaveRequestDetails';
import { useNavigate } from 'react-router-dom';

function ViewAllRequests ({ onBack }) {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await API.get('/leaves');
    setRequests(res.data);
  };

  const filteredRequests = requests.filter((req) => {
    const matchesSearch = req.employee_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || req.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  if (selectedRequestId) {
    return (
      <LeaveRequestDetails
        requestId={selectedRequestId}
        onBack={() => {
          setSelectedRequestId(null);
          fetchRequests(); // Refresh list after status updates
        }}
      />
    );
  }

  return (
    <div className="container">
      <h2>All Leave Requests</h2>
      <button onClick={() => navigate('/dashboard')}>Back to Dashboard</button>
      <br /><br />

      <input
        type="text"
        placeholder="Search by employee name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
        <option value="All">All</option>
        <option value="Pending">Pending</option>
        <option value="Approved">Approved</option>
        <option value="Declined">Declined</option>
      </select>

      <table border="1" cellPadding="5" style={{ marginTop: '20px' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.id}</td>
              <td>{req.employee_name}</td>
              <td>{req.leave_type}</td>
              <td>{req.status}</td>
              <td>
                <button onClick={() => setSelectedRequestId(req.id)}>View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewAllRequests;
