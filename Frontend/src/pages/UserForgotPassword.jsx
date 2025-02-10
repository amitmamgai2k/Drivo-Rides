import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const UserForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/forgot-password`,
                { email, password }
            );


            if (response.status === 200) {
                setIsSuccess(true);
                setEmail('');
                setPassword('');
                // Redirect to OTP verification page
                setTimeout(() => navigate('/verify-otp', { state: { email , password} }), 2000);
                toast.success('OTP sent successfully');

            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || 'Something went wrong. Please try again.');
            toast.error(error.response?.data?.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-white p-6 flex flex-col justify-between">
            <div>
                {/* Logo Section */}
                <div className="mb-8">
                    <img className="ml-[-10px]" src={logo} height={80} width={150} alt="Logo" />
                    <h1 className="text-2xl font-bold mt-4">Forgot Your Password</h1>
                    <p className="text-gray-600">Enter your email and new password below.</p>
                </div>

                {/* Forgot Password Form */}
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className="text-gray-700 font-medium mb-2 block">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                type="email"
                                placeholder="email@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-gray-700 font-medium mb-2 block">New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder="Enter your new password"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex items-center justify-center bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg"
                    >
                        Confirm
                    </button>

                    {isSuccess && (
                        <p className="text-sm text-center text-green-500 mt-2">
                            Redirecting to the OTP Verification Page...
                        </p>
                    )}
                    {errorMessage && (
                        <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
                    )}
                    <p className="text-sm text-gray-500 mt-4">
                        After confirming your password, you will be redirected to the OTP Verification Page.
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UserForgotPassword;
