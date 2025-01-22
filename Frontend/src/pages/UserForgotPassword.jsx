import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Mail, Lock, Car } from 'lucide-react';

const UserForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUser } = useContext(UserDataContext);
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        const userData = {
            email: email,
            password: password
        };
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData);
        if (response.status === 200) {
            const data = response.data;
            setUser(data.user);
            localStorage.setItem('token', data.token);
            navigate('/home');
        }
        setEmail('');
        setPassword('');
    };

    return (
        <div className='min-h-screen bg-white p-6 flex flex-col justify-between'>
            <div>
                {/* Logo Section */}
                <div className="mb-8 ">
                    <img
                    className='ml-[-10px]'

                        src={logo}  height={80} width={150}
                        alt="Logo"
                    />
                    <h1 className="text-2xl font-bold mt-4">Forgot Your Password</h1>
                    <p className="text-gray-600"></p>
                </div>

                {/* Login Form */}
                <form onSubmit={submitHandler} className="space-y-6">
                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'>Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                type="email"
                                placeholder='email@example.com'
                            />
                        </div>
                    </div>

                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'> New Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder='Enter your password'
                            />
                        </div>
                    </div>

                    <Link to={'/captain-login'} className='w-full flex items-center justify-center bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg'>
                         Confirm
                    </Link>
                    <p className='text-sm text-gray-500 '>After Confirm your password, you will be redirected to the login page </p>


                </form>
            </div>


        </div>
    );
};

export default UserForgotPassword;