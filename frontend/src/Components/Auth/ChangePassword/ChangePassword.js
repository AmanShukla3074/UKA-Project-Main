import React, { useState } from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'oldPassword') setOldPassword(value);
    else if (name === 'newPassword') setNewPassword(value);
    else if (name === 'confirmPassword') setConfirmPassword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required');
      return;
    }

    if (newPassword === oldPassword) {
      setError('New password must be different from the old password');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match');
      return;
    }

    // TODO: Add logic to change the password

    // Reset form and error, show success message
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setError('');
    setSuccessMessage('Your password has been changed successfully!');
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={handleChange}
        />

        <label>New Password:</label>
        <input
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={handleChange}
        />

        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
        />

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
