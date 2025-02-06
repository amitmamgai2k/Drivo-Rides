import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Mail, Lock, Car } from 'lucide-react';

const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { user,setUser } = useContext(UserDataContext);
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
            console.log('user',user);


            setUser(data.user);
            console.log('setUser',user);

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
                    <h1 className="text-2xl font-bold mt-4">Welcome Back</h1>
                    <p className="text-gray-600">Sign in to continue your journey</p>
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
                        <label className='text-gray-700 font-medium mb-2 block'>Password</label>
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

                    <button className='w-full bg-black text-white font-semibold py-3 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg'>
                        Sign In
                    </button>

                    <p className='text-center text-gray-600'>
                        New to Drivo? {' '}
                        <Link to='/user-signup' className='text-blue-600 font-medium hover:text-blue-700'>
                            Create an account
                        </Link>
                    </p>
                    <p className='text-center text-gray-600'>
                           Forgot Your Password? {' '}
                        <Link to='/user-forgot-password' className='text-blue-600 font-medium hover:text-blue-700'>
                           Forgot Password
                        </Link>
                    </p>
                </form>
            </div>

            {/* Captain Login Button */}
            <Link
                to='/captain-login'
                className='flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg mt-6'
            >
                <Car className="h-5 w-5" />
                Sign in as Captain
            </Link>

        </div>
    );
};

export default UserLogin;