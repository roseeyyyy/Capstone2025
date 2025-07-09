import React, { useEffect, useState } from 'react';
import { API } from '../api';
import { useParams, useNavigate } from 'react-router-dom';

function UserDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await API.get(`/users/${id}`);
      setUser(res.data);
    };
    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Details</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Type:</strong> {user.type}</p>
      <p><strong>PIN:</strong> {user.pin}</p>

      <button onClick={() => navigate('/manage-users')}>Back to Manage Users</button>
    </div>
  );
}

export default UserDetails;
