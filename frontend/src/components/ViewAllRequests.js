import React, { useState, useEffect } from 'react';
import { API } from '../api';
import LeaveRequestDetails from './LeaveRequestDetails';
import { useNavigate } from 'react-router-dom';

function ViewAllRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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
    const matchesSearch = `${req.first_name} ${req.last_name}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const isPending = req.leave_status.toLowerCase() === 'pending';
    return matchesSearch && isPending;
  });

  const pendingCount = requests.filter(
    (req) => req.leave_status.toLowerCase() === 'pending'
  ).length;

  if (selectedRequestId) {
    return (
      <LeaveRequestDetails
        requestId={selectedRequestId}
        onBack={() => {
          setSelectedRequestId(null);
          fetchRequests();
        }}
      />
    );
  }

  return (
    <div className="container py-4">
      {/* Topbar */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          type="button"
          className="btn btn-outline-secondary"
          onClick={() => navigate('/dashboard')}
        >
          <i className="bi bi-arrow-left me-2"></i> Back
        </button>

        <h3 className="mb-0 text-center flex-grow-1">
          Pending Leave Requests{' '}
          <span className="badge bg-danger">{pendingCount}</span>
        </h3>

        <div style={{ width: '42px' }}></div>
      </div>

      {/* Search Bar */}
      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by employee name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Requests Table */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th>ID</th>
                  <th>Employee</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      <i className="bi bi-inbox fs-4 text-muted"></i>
                      <p className="text-muted mb-0">No pending leave requests.</p>
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req) => (
                    <tr key={req.id || req.request_id}>
                      <td>{req.id || req.request_id}</td>
                      <td>
                        {req.first_name} {req.last_name}
                      </td>
                      <td>{req.leave_type}</td>
                      <td>
                        <span className="badge bg-warning text-dark">
                          {req.leave_status.charAt(0).toUpperCase() +
                            req.leave_status.slice(1)}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() =>
                            setSelectedRequestId(req.id || req.request_id)
                          }
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewAllRequests;
