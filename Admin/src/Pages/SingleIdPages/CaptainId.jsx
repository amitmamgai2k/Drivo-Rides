import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCaptainsData, updateCaptainData } from '../../Redux/Slices/AdminDashBoardData';
import { User, Mail, Phone, MapPin, Car, DollarSign, Clock, BarChart, Calendar, Star, Award, Edit, Route, Wifi, Save, X, AlertCircle } from 'lucide-react';

function CaptainId() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userId } = location?.state || {};
  const { captainsData = {} } = useSelector((state) => state.dashboard);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    firstname: '',
    lastname: '',
    vehicleModel: '',
    vehicleType: '',
    vehiclePlate: '',
    vehicleColor: '',
    vehicleCapacity: ''
  });

  useEffect(() => {
    if (userId) {
      dispatch(fetchCaptainsData(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // Initialize form data when captain data is loaded
    if (Object.keys(captainsData).length) {
      setFormData({
        email: captainsData.email || '',
        mobileNumber: captainsData.mobileNumber || '',
        firstname: captainsData.fullname?.firstname || '',
        lastname: captainsData.fullname?.lastname || '',
        vehicleModel: captainsData.vehicle?.model || '',
        vehicleType: captainsData.vehicle?.vehicleType || '',
        vehiclePlate: captainsData.vehicle?.plate || '',
        vehicleColor: captainsData.vehicle?.color || '',
        vehicleCapacity: captainsData.vehicle?.capacity || ''
      });
    }
  }, [captainsData]);

  // Destructure captain data for easier access
  const {
    ProfilePicture,
    RideDone,
    TotalEarnings,
    createdAt,
    distanceTravelled,
    email,
    feedback,
    fullname = {},
    hoursWorked,
    lastReset,
    locations = {},
    mobileNumber,
    socketId,
    status,
    todayDistanceTravelled,
    todayEarnings,
    todayHoursWorked,
    todayRidesDone,
    updatedAt,
    vehicle = {},
    _id,
  } = captainsData;

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

    // Vehicle validation - making these optional but if filled, they should be valid
    if (formData.vehicleModel.trim() === '') {
      newErrors.vehicleModel = 'Vehicle model is required';
    }

    if (formData.vehicleType.trim() === '') {
      newErrors.vehicleType = 'Vehicle type is required';
    }

    if (formData.vehiclePlate.trim() === '') {
      newErrors.vehiclePlate = 'License plate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEditToggle = () => {
    if (isEditing) {
      if (validateForm()) {
        console.log("Saving changes:", formData);
        console.log("User ID:", userId);
        dispatch(updateCaptainData({ userID: userId, data: formData }));
        setIsEditing(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancelEdit = () => {
    setFormData({
      email: captainsData.email || '',
      mobileNumber: captainsData.mobileNumber || '',
      firstname: captainsData.fullname?.firstname || '',
      lastname: captainsData.fullname?.lastname || '',
      vehicleModel: captainsData.vehicle?.model || '',
      vehicleType: captainsData.vehicle?.vehicleType || '',
      vehiclePlate: captainsData.vehicle?.plate || '',
      vehicleColor: captainsData.vehicle?.color || '',
      vehicleCapacity: captainsData.vehicle?.capacity || ''
    });
    setIsEditing(false);
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

  if (!Object.keys(captainsData).length) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-3 text-gray-600 font-medium">Loading captain details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Captain Profile</h2>
        <div className="flex space-x-2">
          {isEditing && (
            <button
              onClick={handleCancelEdit}
              className="flex items-center bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md shadow transition-colors"
            >
              <X size={18} className="mr-2" />
              Cancel
            </button>
          )}
          <button
            onClick={handleEditToggle}
            className={`flex items-center ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-4 py-2 rounded-md shadow transition-colors`}
          >
            {isEditing ? <Save size={18} className="mr-2" /> : <Edit size={18} className="mr-2" />}
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            <div className="relative mb-4 md:mb-0 md:mr-6">
              <img
                src={ProfilePicture || 'https://via.placeholder.com/150'}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-md"
              />
              <span
                className={`absolute bottom-1 right-1 w-4 h-4 rounded-full border-2 border-white ${
                  status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                }`}
              ></span>
            </div>
            <div className="text-center md:text-left">
              {isEditing ? (
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
                <span className="text-sm font-medium">Captain ID: {_id?.substring(0, 8)}...</span>
              </div>
              <div className="mt-2 flex flex-wrap justify-center md:justify-start gap-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                  status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  <Wifi size={14} className="mr-1" />
                  {status}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  <Star size={14} className="mr-1" />
                  Rating: {feedback || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4 text-gray-800">Personal Information</h4>

              {/* Email Field - Replaced InfoItem */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Mail size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  {isEditing ? (
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

              {/* Mobile Number Field - Replaced InfoItem */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <Phone size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Mobile Number</p>
                  {isEditing ? (
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

              {/* Current Location - Not Editable */}
              <div className="flex items-start space-x-3">
                <div className="mt-0.5">
                  <MapPin size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-700">Current Location</p>
                  <p className="text-gray-600">{`Lat: ${locations.latitude?.toFixed(6) || 'N/A'}, Long: ${locations.longitude?.toFixed(6) || 'N/A'}`}</p>
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

            {/* Vehicle Information */}
            <div className="space-y-6">
              <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-4 text-gray-800">Vehicle Details</h4>

              {isEditing ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
                      <input
                        type="text"
                        name="vehicleModel"
                        value={formData.vehicleModel}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.vehicleModel ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                      />
                      {errors.vehicleModel && (
                        <p className="mt-1 text-sm text-red-600">{errors.vehicleModel}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
                      <input
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.vehicleType ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                      />
                      {errors.vehicleType && (
                        <p className="mt-1 text-sm text-red-600">{errors.vehicleType}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">License Plate</label>
                      <input
                        type="text"
                        name="vehiclePlate"
                        value={formData.vehiclePlate}
                        onChange={handleInputChange}
                        className={`w-full border ${errors.vehiclePlate ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2`}
                      />
                      {errors.vehiclePlate && (
                        <p className="mt-1 text-sm text-red-600">{errors.vehiclePlate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                      <input
                        type="text"
                        name="vehicleColor"
                        value={formData.vehicleColor}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Capacity</label>
                      <input
                        type="text"
                        name="vehicleCapacity"
                        value={formData.vehicleCapacity}
                        onChange={handleInputChange}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm p-2 border"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Vehicle Model - Not Editable */}
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Car size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Vehicle Model</p>
                      <p className="text-gray-600">{`${vehicle.model || 'N/A'} (${vehicle.vehicleType || 'N/A'})`}</p>
                    </div>
                  </div>

                  {/* License Plate - Not Editable */}
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Car size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">License Plate</p>
                      <p className="text-gray-600">{vehicle.plate || 'N/A'}</p>
                    </div>
                  </div>

                  {/* Vehicle Details - Not Editable */}
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5">
                      <Car size={30} className="text-blue-600 p-2 bg-blue-100 rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Vehicle Details</p>
                      <p className="text-gray-600">{`Color: ${vehicle.color || 'N/A'}, Capacity: ${vehicle.capacity || 'N/A'} persons`}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-10">
            <h4 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-6 text-gray-800">Performance Statistics</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* All-time Stats */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <h5 className="font-medium text-gray-800 mb-4">All-time Statistics</h5>
                <div className="grid grid-cols-2 gap-4">
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
                      <div className="bg-green-100 p-2 rounded-md">
                        <DollarSign size={20} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Total Earnings</p>
                        <p className="text-lg font-semibold text-gray-800">₹{TotalEarnings?.toFixed(2) || '0.00'}</p>
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
                      <div className="bg-amber-100 p-2 rounded-md">
                        <Clock size={20} className="text-amber-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Hours Worked</p>
                        <p className="text-lg font-semibold text-gray-800">{hoursWorked?.toFixed(1) || '0'} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Today's Stats */}
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                <h5 className="font-medium text-gray-800 mb-4">Today's Statistics</h5>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Route size={20} className="text-blue-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Today's Rides</p>
                        <p className="text-lg font-semibold text-gray-800">{todayRidesDone || 0}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-2 rounded-md">
                        <DollarSign size={20} className="text-green-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Today's Earnings</p>
                        <p className="text-lg font-semibold text-gray-800">₹{todayEarnings?.toFixed(2) || '0.00'}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-2 rounded-md">
                        <BarChart size={20} className="text-purple-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Today's Distance</p>
                        <p className="text-lg font-semibold text-gray-800">{todayDistanceTravelled?.toFixed(1) || '0'} km</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-md shadow-sm border border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-amber-100 p-2 rounded-md">
                        <Clock size={20} className="text-amber-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-xs text-gray-500">Today's Hours</p>
                        <p className="text-lg font-semibold text-gray-800">{todayHoursWorked?.toFixed(1) || '0'} hrs</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>Last reset: {new Date(lastReset).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-500 mb-3">System Information</h4>
            <p className="text-xs text-gray-500">Socket ID: {socketId || 'Not connected'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CaptainId;