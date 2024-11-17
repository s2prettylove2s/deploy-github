import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { confirmPasswordReset } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [oobCode, setOobCode] = useState(''); // code from the password reset email
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Extract the OOB code from the URL after clicking the reset email link
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('oobCode');
    if (code) {
      setOobCode(code);
    } else {
      setError('Invalid or expired reset link');
    }
  }, [location]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!newPassword) {
      setError('Please enter a new password.');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    try {
      if (!oobCode) {
        setError('Invalid or expired reset link.');
        return;
      }

      await confirmPasswordReset(auth, oobCode, newPassword);
      setSuccessMessage('Password has been successfully changed!');
      setTimeout(() => navigate('/signin'), 2000); // Navigate to the sign-in page after success
    } catch (error) {
      if (error.code === 'auth/invalid-action-code') {
        setError('The password reset link is invalid or expired.');
      } else {
        setError('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-6 bg-white shadow-md">
        <h1 className="text-xl font-bold mb-4">Change Password</h1>

        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          placeholder="Enter new password"
          className="block w-full p-2 mb-4 border rounded"
        />

        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
          Change Password
        </button>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
          </div>
        )}
        {successMessage && (
          <div className="mt-4 text-green-500">
            <p>{successMessage}</p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ChangePassword;
