import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Mail, Lock, User } from 'lucide-react';

const CaptainForgotPassword = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [userData, setUserData] = useState({});
   const { captain, setCaptain } = useContext(CaptainDataContext);
   const navigate = useNavigate();

   const submitHandler = async (e) => {
       e.preventDefault();
       const userData = {
           email: email,
           password: password
       };
       const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, userData);
       if (response.status === 200) {
           const data = response.data;
           setCaptain(data.captain);
           localStorage.setItem('token', data.token);
           navigate('/captain-home');
       }
       setEmail('');
       setPassword('');
   };

   return (
       <div className='min-h-screen bg-white p-6 flex flex-col justify-between'>
           <div>
               {/* Logo and Header Section */}
               <div className="flex flex-col  mb-6">
                   <img
                       className="object-contain mb-4 ml-[-10px]"
                       src={logo}
                       alt="Logo"
                       width={150}
                       height={80}
                   />
                   <h1 className="text-2xl font-bold">Forgot Your Password</h1>

               </div>

               {/* Login Form */}
               <form onSubmit={submitHandler} className="space-y-6">
                   <div>
                       <label className='text-gray-700 font-medium mb-2 block'>
                           Email Address
                       </label>
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
                       <label className='text-gray-700 font-medium mb-2 block'>
                          New Password
                       </label>
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

                   <Link to='/captain-login' className='w-full flex items-center justify-center bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-lg'>
                     Confirm
                   </Link>
                   <p className='text-sm text-gray-500 '>After Confirm your password, you will be redirected to the login page </p>


               </form>
           </div>

       </div>
   );
};

export default CaptainForgotPassword;