// src/components/SignOut.js
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('../signin'); // Chuyển đến trang đăng nhập sau khi đăng xuất
    } catch (err) {
      console.error('Sign out error', err.message);
    }
  };

  return <button onClick={handleSignOut}>Sign Out</button>;
};

export default SignOut;
