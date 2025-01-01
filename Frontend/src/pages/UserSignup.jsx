import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserSignup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userData, setUserData] = useState({});

  const submitHandler = (e) => {
    e.preventDefault();

    const data = {
      fullName: {
        firstName,
        lastName,
      },x
      email,
      password,
    };

    setUserData(data);

    setEmail('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  useEffect(() => {
    console.log(userData); // Log userData after state update
  }, [userData]);

  return (
    <div className="min-h-screen bg-white px-4 pt-8">
      <h1 className="text-4xl font-bold mb-12">Uber</h1>
      <form onSubmit={submitHandler}>
        <div className="space-y-6">
          <div>
            <label className="block text-xl mb-2">What's your name</label>
            <div className="flex gap-4">
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="flex-1 px-4 py-3 rounded bg-gray-100 focus:outline-none"
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                className="flex-1 px-4 py-3 rounded bg-gray-100 focus:outline-none"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-xl">What's your email</label>
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xl mb-2">Enter Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              className="w-full px-4 py-3 rounded bg-gray-100 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-normal mt-4"
          >
            Sign Up
          </button>
          <div className="text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/user-login" className="text-blue-500">
              Login here
            </Link>
          </div>
          <div>
            <p className="text-[10px] leading-tight">
              This site is protected by reCAPTCHA and the{' '}
              <span className="underline">Google Privacy Policy</span> and{' '}
              <span className="underline">Terms of Service apply</span>.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UserSignup;
