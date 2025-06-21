import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';
import logo from '../assets/logo.png';
import { Mail, Lock, User, Phone, Upload, X, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

const UserSignup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobile, setMobile] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);
    const [userData, setUserData] = useState({});
    const [isLoading, setIsLoading] = useState(false); // Added loading state

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('File size should be less than 5MB');
                return;
            }
            setProfilePicture(file);
            setPreviewURL(URL.createObjectURL(file));
        }
    };

    const removeImage = () => {
        setProfilePicture(null);
        setPreviewURL(null);
    };

   // In submitHandler function
const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading

    const formData = new FormData();

    // Append ProfileImage (if exists)
    if (profilePicture) {
      formData.append("ProfileImage", profilePicture);
    }

    // Append other fields
    formData.append("email", email);
    formData.append("mobileNumber", mobile);
    formData.append("password", password);

    // Create a fullname object and stringify it
    const fullname = {
      firstname: firstName,
      lastname: lastName,
    };

    formData.append("fullname", JSON.stringify(fullname));

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/users/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    }
                }
            );

            if (response.data && response.data.token) {
                localStorage.setItem('token', response.data.token);
                toast.success('Registration successful');

                setUser(response.data.user);

                navigate('/home');
            }
        } catch (error) {
            toast.error(error.response.data);
            console.error('Registration error:', error.response?.data || error);
        } finally {
            setIsLoading(false); // Stop loading regardless of success or error
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className='max-w-2xl mx-auto p-6'>
                {/* Header Section */}
                <div className=" mb-8">
                    <img
                        className=' mb-4 ml-[-10px] object-contain'
                        src={logo}
                        alt="Logo"
                        height={80}
                        width={150}
                    />
                    <h1 className='text-2xl font-bold text-gray-800'>Create Account</h1>
                    <p className='text-gray-600 mt-2'>Begin your journey with us!</p>
                </div>

                <form onSubmit={submitHandler} className="bg-white p-6 rounded-xl shadow-sm space-y-6">
                    {/* Profile Picture Section */}
                    <div className="flex flex-col items-center gap-4">
                        <div className="relative w-32 h-32">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 bg-gray-100">
                                {previewURL ? (
                                    <img
                                        src={previewURL}
                                        alt="Profile Preview"
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <User className="w-16 h-16" />
                                    </div>
                                )}
                            </div>
                            {previewURL && (
                                <button
                                    type="button"
                                    onClick={removeImage}
                                    className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <div>
                            <label htmlFor="profile-picture" className="cursor-pointer flex items-center gap-2 text-blue-600 hover:text-blue-700">
                                <Upload className="w-4 h-4" />
                                <span>{previewURL ? 'Change Picture' : 'Upload Picture'}</span>
                            </label>
                            <input
                                id="profile-picture"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                            <p className="text-sm text-gray-500 text-center mt-1">
                                Maximum size: 5MB
                            </p>
                        </div>
                    </div>

                    {/* Name Fields */}
                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'>Full Name</label>
                        <div className='flex gap-4'>
                            <div className="relative flex-1">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                                <input
                                    required
                                    className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                    type="text"
                                    placeholder='First name'
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                            <div className="relative flex-1">
                                <input
                                    required
                                    className='w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                    type="text"
                                    placeholder='Last name'
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    disabled={isLoading}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Email Field */}
                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'>Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                type="email"
                                placeholder='email@example.com'
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Mobile Field */}
                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'>Mobile Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                type="tel"
                                placeholder='+91 9876543210'
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Password Field */}
                    <div>
                        <label className='text-gray-700 font-medium mb-2 block'>Create Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                            <input
                                className='w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                type="password"
                                placeholder='Enter secure password'
                                minLength={6}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className='w-full bg-black hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors duration-200 shadow-lg flex items-center justify-center gap-2'
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Creating Account...
                            </>
                        ) : (
                            'Create Account'
                        )}
                    </button>

                    <p className='text-center text-gray-600'>
                        Already have an account?{' '}
                        <Link to='/user-login' className='text-blue-600 font-medium hover:text-blue-700'>
                            Login here
                        </Link>
                    </p>
                </form>

                {/* Footer Text */}
                <div className="mt-6">
                   <p className="text-xs text-gray-500 text-center mt-6">
                                       By signing up, you agree to our{' '}
                                       <Link to='/Drivo-Rides-Terms-and-Conditions' className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                                       and{' '}
                                       <Link to ='/Drivo-Rides-privacy-policy' className="text-blue-600 hover:underline">Privacy Policy</Link>
                                   </p>
                </div>
            </div>
        </div>
    );
};

export default UserSignup;