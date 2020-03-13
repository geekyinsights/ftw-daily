import React, { useState } from 'react';

export const UserData = props => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <>
      <h3>Customer Data</h3>
      <input placeholder="First Name" value={firstName} onChange={setFirstName} />
      <input placeholder="Last Name" value={lastName} onChange={setLastName} />
      <input placeholder="Email" value={email} onChange={setEmail} />
    </>
  );
};
