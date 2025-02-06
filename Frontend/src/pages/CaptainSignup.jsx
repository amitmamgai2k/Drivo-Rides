import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { User, Mail, Lock, Phone, Car, Upload, X } from 'lucide-react';
import logo from '../assets/logo.png';

const CaptainSignup = () => {
    // Personal Information States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewURL, setPreviewURL] = useState(null);

    // Vehicle Information States
    const [colour, setVehicleColour] = useState('');
    const [plate, setVehiclePlate] = useState('');
    const [model, setVehicleModel] = useState('');
    const [capacity, setVehicleCapacity] = useState('');
    const [vehicleType, setVehicleType] = useState('');

    const { captain,setCaptain } = useContext(CaptainDataContext);
    const navigate = useNavigate();

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

    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        if (profilePicture) {
            formData.append('ProfileImage', profilePicture);
        }

        // Construct nested objects
        const fullname = {
            firstname: firstName,
            lastname: lastName
        };

        const vehicle = {
            color: colour,
            plate,
            model,
            capacity: parseInt(capacity),
            vehicleType
        };

        // Append fields individually like userSignup
        formData.append('email', email);
        formData.append('mobileNumber', mobile);
        formData.append('password', password);
        formData.append('fullname', JSON.stringify(fullname));
        formData.append('vehicle', JSON.stringify(vehicle));



        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/captains/register`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
           console.log('Captain Registered',response);
            if (response.data && response.data.token) {
                console.log('c',captain);

                setCaptain(response.data.user);
                console.log('vc',captain);
                localStorage.setItem('token', response.data.token);
                navigate('/captain-home');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto p-6">
                {/* Header */}
                <div className="t mb-8">
                    <img
                        className=" mb-2 ml-[-10px]"
                        src={logo}
                        alt="Driver"
                        height={80}
                        width={150}
                    />
                    <h1 className="text-2xl font-bold text-gray-800">Join Our Fleet</h1>
                    <p className="text-gray-600">Register as a captain and start earning</p>
                </div>

                <form onSubmit={submitHandler} className="space-y-8 bg-white  rounded-xl shadow-sm">
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

                    {/* Personal Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                            <User className="w-5 h-5" />
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="John"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Last Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    required
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mobile Number
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    required
                                    type="tel"
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="+91 9876543210"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                <input
                                    required
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="••••••••"
                                    minLength={6}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Vehicle Information */}
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold flex items-center gap-2 border-b pb-2">
                            <Car className="w-5 h-5" />
                            Vehicle Information
                        </h2>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Color
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={colour}
                                    onChange={(e) => setVehicleColour(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="White"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Model
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={model}
                                    onChange={(e) => setVehicleModel(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="Swift Dzire"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    License Plate
                                </label>
                                <input
                                    required
                                    type="text"
                                    value={plate}
                                    onChange={(e) => setVehiclePlate(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="DL XX XXXX"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Seating Capacity
                                </label>
                                <input
                                    required
                                    type="number"
                                    value={capacity}
                                    onChange={(e) => setVehicleCapacity(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                                    placeholder="4"
                                    min="1"
                                    max="8"
                                />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Vehicle Type
                                </label>
                                <select
                                    required
                                    value={vehicleType}
                                    onChange={(e) => setVehicleType(e.target.value)}
                                    className="w-full px-4 py-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-blue-800 focus:border-transparent transition-all outline-none"
                                >
                                    <option value="">Select Vehicle Type</option>
                                    <option value="car">Car</option>
                                    <option value="auto">Auto</option>
                                    <option value="motorcycle">Motorcycle</option>

                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition-colors duration-200 shadow-lg"
                    >
                        Create Captain Account
                    </button>
                </form>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Already have an account?{' '}
                        <Link to="/captain-login" className="text-blue-600 font-medium hover:text-blue-700">
                            Login here
                        </Link>
                    </p>
                </div>

                <p className="text-xs text-gray-500 text-center mt-6">
                    By signing up, you agree to our{' '}
                    <Link to='/Drivo-Rides-Terms-and-Conditions' className="text-blue-600 hover:underline">Terms of Service</Link>{' '}
                    and{' '}
                    <Link to ='/Drivo-Rides-privacy-policy' className="text-blue-600 hover:underline">Privacy Policy</Link>
                </p>
            </div>
        </div>
    );
};

export default CaptainSignup;