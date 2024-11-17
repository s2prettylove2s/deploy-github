import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;

      // Lưu thông tin phiên làm việc vào sessionStorage
      sessionStorage.setItem(
        'userSession',
        JSON.stringify({
          uid: user.uid,
          email: user.email,
          lastLogin: new Date().toISOString(),
        })
      );

      navigate('/'); // Điều hướng đến trang chính
    } catch (error) {
      setError(error.message); // Hiển thị thông báo lỗi
    }
  };

  const handleSignUp = () => {
    navigate('/signup'); // Điều hướng đến trang Sign Up
  };

  const handleChangePassword = () => {
    navigate('/change-password');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-white shadow-md">
        <h1 className="text-xl font-bold mb-4">Sign In</h1>
        <input
          type="email"
          {...register('email')}
          placeholder="Email"
          className="block w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          {...register('password')}
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded"
        />
        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
          Sign In
        </button>

        {error && (
          <div className="mt-4 text-red-500">
            <p>{error}</p>
            <div className="flex justify-between">
              <button onClick={handleSignUp} className="text-blue-500 underline">
                Sign Up
              </button>
              <button onClick={handleChangePassword} className="text-blue-500 underline">
                Change Password
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignIn;
