import React, { useState } from 'react';
import { API } from '../api';

function CreateUser() {
  const [name, setName] = useState('');
  const [type, setType] = useState('Employee Type');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [pin, setPin] = useState('');

  const handleCreate = async (e) => {
    e.preventDefault();
    await API.post('/users', { name, type, email, number, pin });
    alert('User created!');
    window.location.href = '/manage-users';
  };

  return (
    <form onSubmit={handleCreate}>
      <h2>Create User</h2>
      <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="FOH">FOH</option>
        <option value="BOH">BOH</option>
        <option value="Manager">Manager</option>
      </select>
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input placeholder="Contact Number" value={number} onChange={(e) => setNumber(e.target.value)} required />
      <input placeholder="PIN" value={pin} onChange={(e) => setPin(e.target.value)} required />
      <button type="submit">Create</button>
    </form>
  );
}

export default CreateUser;
