import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/logo.png';
import { Mail, Lock, User } from 'lucide-react';
import toast from 'react-hot-toast';

const CaptainLogin = () => {
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
      try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, userData);
        if (response.status === 200) {
            const data = response.data;
            toast.success('Login successful');
            console.log('data', data.token);

            setCaptain(data.captain);
            localStorage.setItem('token', data.token);
            navigate('/captain-home');
        }
        setEmail('');
        setPassword('');
      } catch (error) {
        toast.error(error.response.data.message);

      }
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
                   <h1 className="text-2xl font-bold">Welcome back, captain!</h1>

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
                           Password
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

                   <button className='w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-lg'>
                       Login as Captain
                   </button>

                   <div className="text-center text-gray-600 flex flex-col gap-6 ">

                         <p className='text-center text-gray-600'>
                         Want to join our fleet? {' '}
                                               <Link to='/captain-signup' className='text-blue-600 font-medium hover:text-blue-700'>
                                               Register as captain
                                               </Link>
                                           </p>
                         <p className='text-center text-gray-600'>
                                                  Forgot Your Password? {' '}
                                               <Link to='/captain-forgot-password' className='text-blue-600 font-medium hover:text-blue-700'>
                                                  Forgot Password
                                               </Link>
                                           </p>
                   </div>
               </form>
           </div>

           {/* User Login Link */}
           <Link
               to='/user-login'
               className='flex items-center justify-center gap-2 bg-[#9ca265] hover:bg-[#8b916c] text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200 shadow-lg'
           >
               <User className="h-5 w-5" />
               Sign in as User
           </Link>
       </div>
   );
};

export default CaptainLogin;