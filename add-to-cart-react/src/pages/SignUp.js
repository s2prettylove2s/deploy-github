import React from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = React.useState(false);

  const onSubmit = async (data) => {
    if (!isVerified) {
      alert('Please verify CAPTCHA');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      navigate('/sign-in');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleCaptcha = () => {
    setIsVerified(true);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md p-6 bg-white shadow-md">
        <h1 className="text-xl font-bold mb-4">Sign Up</h1>
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
        <ReCAPTCHA sitekey="6LfHioEqAAAAAG0KRs2bR1DM1F3k-Em8khhQ8CgN" onChange={handleCaptcha} />
        <button type="submit" className="w-full p-2 mt-4 bg-blue-500 text-white rounded">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
