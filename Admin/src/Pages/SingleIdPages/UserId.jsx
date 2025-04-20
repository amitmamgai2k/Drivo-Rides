import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsersData, updateUserData } from '../../Redux/Slices/AdminDashBoardData';
import {  Mail, Phone, MapPin, Car, DollarSign, Clock, BarChart, Calendar, Star, Award, Edit, Route, Wifi, Save, X, AlertCircle } from 'lucide-react';

function UserId() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userId, editMode } = location?.state || {};
  const [isEditMode, setIsEditMode] = useState(editMode || false);

  const { usersData = []} = useSelector((state) => state.dashboard);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    firstname: '',
    lastname: ''
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchUsersData(userId));
    }
  }, [dispatch, userId]);
  console.log("usersData", usersData);

  useEffect(() => {
    if (Object.keys(usersData).length) {
      setFormData({
        email: usersData.email || '',
        mobileNumber: usersData.mobileNumber || '',
        firstname: usersData.fullname?.firstname || '',
        lastname: usersData.fullname?.lastname || '',
      });
    }
  }, [usersData]);

  const {
    ProfilePicture,
    RideDone,
    TotalExepense,
    createdAt,
    distanceTravelled,
    email,
    fullname = {},
    hoursRide,
    mobileNumber,
    updatedAt,
    _id,
  } = usersData;

  const validateForm = () => {
    const newErrors = {};

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Mobile number validation
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    }

    // Name validation
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }

    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    if (isEditMode) {
      if (validateForm()) {
        console.log("Saving changes:", formData);
        console.log("User ID:", userId);
        dispatch(updateUserData({ userID: userId, data: formData }));
        setIsEditMode(false);
      }
    } else {
      setIsEditMode(true);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      email: usersData.email || '',
      mobileNumber: usersData.mobileNumber || '',
      firstname: usersData.fullname?.firstname || '',
      lastname: usersData.fullname?.lastname || '',
    });
    setIsEditMode(false);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  if (!Object.keys(usersData).length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600 font-medium">Loading User details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">User Profile</h2>
        <div className="flex space-x-2">
          {isEditMode && (
            <button
              onClick={handleCancelEdit}
              className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow transition-colors"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
          )}
          {editMode && (
            <button
              onClick={handleEditToggle}
              className={`flex items-center ${isEditMode ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow transition-colors`}
            >
              {isEditMode ? <Save size={18} className="mr-2" /> : <Edit size={18} className="mr-2" />}
              {isEditMode ? "Save Changes" : "Edit Profile"}
            </button>
          )}
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src={ProfilePicture || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png'}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />

            </div>
            <div className="text-center md:text-left">
              {isEditMode ? (
                <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                  <div className="w-full md:w-auto">
                    <input
                      type="text"
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleInputChange}
                      placeholder="First Name"
                      className={`px-3 py-1 rounded text-gray-800 w-full ${errors.firstname ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.firstname && (
                      <p className="mt-1 text-xs text-red-200">{errors.firstname}</p>
                    )}
                  </div>
                  <div className="w-full md:w-auto">
                    <input
                      type="text"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleInputChange}
                      placeholder="Last Name"
                      className={`px-3 py-1 rounded text-gray-800 w-full ${errors.lastname ? 'border-2 border-red-500' : ''}`}
                    />
                    {errors.lastname && (
                      <p className="mt-1 text-xs text-red-200">{errors.lastname}</p>
                    )}
                  </div>
                </div>
              ) : (
                <h3 className="text-2xl font-bold">{`${fullname.firstname || ''} ${fullname.lastname || ''}`}</h3>
              )}
              <div className="flex items-center justify-center md:justify-start mt-1">
                <Award size={16} className="mr-1" />
                <span className="text-sm font-medium">User ID: {_id?.substring(0, 8)}...</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section - Arranged in a grid with Personal Info on left and Statistics on right */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information - Left Column */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4 text-gray-800">Personal Information</h4>

              {/* Email Field */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Mail size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  {isEditMode ? (
                    <div>
                      <input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">{email}</p>
                  )}
                </div>
              </div>


              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Phone size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Mobile Number</p>
                  {isEditMode ? (
                    <div>
                      <input
                        type="text"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleInputChange}
                        className={`mt-1 block w-full border ${errors.mobileNumber ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                      />
                      {errors.mobileNumber && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.mobileNumber}
                        </p>
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-600">{mobileNumber}</p>
                  )}
                </div>
              </div>

              {/* Account Created - Not Editable */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Calendar size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Account Created</p>
                  <p className="text-gray-600">
                    {new Date(createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Last Updated - Not Editable */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Calendar size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Last Updated</p>
                  <p className="text-gray-600">
                    {new Date(updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Statistics - Right Column */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4 text-gray-800">All Time Statistics</h4>

              {/* All-time Stats */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Route size={20} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Total Rides</p>
                        <p className="text-lg font-semibold text-gray-800">{RideDone || 0}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <BarChart size={20} className="text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Distance</p>
                        <p className="text-lg font-semibold text-gray-800">{distanceTravelled?.toFixed(1) || '0'} km</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-md">
                        <DollarSign size={20} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Total Expense </p>
                        <p className="text-lg font-semibold text-gray-800">₹{TotalExepense?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-md">
                        <Clock size={20} className="text-amber-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Total Riding Time</p>
                        <p className="text-lg font-semibold text-gray-800">{hoursRide?.toFixed(1) || '0'} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserId;