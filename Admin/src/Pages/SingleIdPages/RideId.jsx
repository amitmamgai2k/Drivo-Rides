import React from 'react';
import { useLocation } from 'react-router-dom';
import { Clock, MapPin, CreditCard, User, Calendar, IndianRupee, CheckCircle, AlertCircle, Star, Car, Phone, Mail, ChevronsRight, Landmark } from 'lucide-react';
import { fetchRideDataWithID } from '../../Redux/Slices/AdminDashBoardData';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function RideId() {
  const dispatch = useDispatch();
  const {rideDataWithID, loading, error } = useSelector((state) => state.dashboard);
  const location = useLocation();
  const { rideId } = location.state;

  useEffect(() => {
    dispatch(fetchRideDataWithID(rideId));
  } , [dispatch, rideId]);
  console.log('Ride Data with ID:', rideDataWithID);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format complete date with time
  const formatDateTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  // Get status color
  const getStatusColor = (status) => {
    switch(status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Ride Details</h1>
        <p className="text-gray-500">Ride #{rideDataWithID?._id}</p>
      </div>

      {/* Status badge */}
      <div className="mb-8">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(rideDataWithID.status)}`}>
          {rideDataWithID.status === "pending" ? (
            <AlertCircle className="w-4 h-4 mr-1" />
          ) : (
            <CheckCircle className="w-4 h-4 mr-1" />
          )}
          {rideDataWithID.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Left column */}
        <div className="md:col-span-2 space-y-6">
          {/* Route section */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Route Information</h2>

            <div className="flex items-start mb-6">
              <div className="flex flex-col items-center mr-4">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <div className="w-0.5 h-16 bg-gray-300 my-1"></div>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
              </div>

              <div className="flex-1">
                <div className="mb-4">
                  <p className="font-medium text-gray-900">{rideDataWithID.originText}</p>
                  <p className="text-sm text-gray-500">Pickup Location</p>
                </div>

                <div>
                  <p className="font-medium text-gray-900">{rideDataWithID.destinationText}</p>
                  <p className="text-sm text-gray-500">Destination</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 border-t border-gray-200 pt-4">
              <div>
                <p className="text-sm text-gray-500">Distance</p>
                <p className="font-medium">{rideDataWithID.distance} km</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Duration</p>
                <p className="font-medium">{(rideDataWithID.duration * 60).toFixed(0)} mins</p>
              </div>

              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-medium">{formatDate(rideDataWithID.createdAt)}</p>
              </div>
            </div>
          </div>

          {/* Payment section - UPDATED */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>

            <div className="flex items-center mb-4">
              <CreditCard size={30} className="text-gray-500 mr-2 bg-green-200 p-2 rounded-lg" />
              <div>
                <span className="font-medium capitalize">{rideDataWithID.payment ? rideDataWithID.payment.paymentMethod : rideDataWithID.paymentMethod}</span>
                {rideDataWithID.payment && rideDataWithID.payment.upiId && (
                  <div className="text-sm text-gray-500">{rideDataWithID.payment.upiId}</div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Base fare</span>
                <span className="font-medium">₹{(rideDataWithID.price * 0.8).toFixed(2)}</span>
              </div>

              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium">₹{(rideDataWithID.price * 0.2).toFixed(2)}</span>
              </div>



              <div className="flex justify-between font-bold text-lg mt-4 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{rideDataWithID.payment ? rideDataWithID.payment.amount : rideDataWithID.price}</span>
              </div>
            </div>

            {/* Additional Payment Transaction Details */}
            {rideDataWithID.payment && (
              <div className="mt-6 border-t border-gray-200 pt-4">
                <h3 className="text-lg font-medium mb-3">Transaction Information</h3>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle size={18} className="text-green-500 mr-2" />
                    <span className="text-gray-700 mr-2">Status:</span>
                    <span className="font-medium text-green-600">{rideDataWithID.payment.paymentStatus}</span>
                  </div>

                  <div className="flex items-center">
                    <Clock size={18} className="text-blue-500 mr-2" />
                    <span className="text-gray-700 mr-2">Payment Time:</span>
                    <span className="font-medium">{formatDateTime(rideDataWithID.payment.paymentTime)}</span>
                  </div>

                  <div className="flex items-center">
                    <ChevronsRight size={18} className="text-purple-500 mr-2" />
                    <span className="text-gray-700 mr-2">Completion Time:</span>
                    <span className="font-medium">{formatDateTime(rideDataWithID.payment.completionTime)}</span>
                  </div>

                  <div className="flex items-center">
                    <Landmark size={18} className="text-indigo-500 mr-2" />
                    <span className="text-gray-700 mr-2">Gateway:</span>
                    <span className="font-medium">{rideDataWithID.payment.gatewayName}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-600">Order ID</div>
                      <div className="font-medium truncate">{rideDataWithID.payment.orderId}</div>
                    </div>

                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-600">Payment ID</div>
                      <div className="font-medium truncate">{rideDataWithID.payment.paymentId}</div>
                    </div>

                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-600">Bank Reference</div>
                      <div className="font-medium truncate">{rideDataWithID.payment.bankReference}</div>
                    </div>

                    <div className="bg-white p-3 rounded shadow-sm">
                      <div className="text-sm text-gray-600">Transaction ID</div>
                      <div className="font-medium truncate">{rideDataWithID.payment._id}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-6">
          {/* User information */}
          <div className="bg-gray-100  p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>

            {rideDataWithID.user && (
              <div>
                <div className="flex items-center mb-4">
                  {rideDataWithID.user.ProfilePicture ? (
                    <img
                      src={rideDataWithID.user.ProfilePicture}
                      alt="Profile"
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{rideDataWithID.user.fullname.firstname} {rideDataWithID.user.fullname.lastname}</p>
                    <p className="text-sm text-gray-500">{rideDataWithID.user.email}</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone size={30} className=" text-gray-500 mr-2 bg-red-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.user.mobileNumber}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={30} className=" text-gray-500 mr-2  bg-violet-200 p-2 rounded-lg" />
                    <span>Member since {formatDate(rideDataWithID.user.createdAt)}</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin size={30} className=" text-gray-500 mr-2  bg-green-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.user.distanceTravelled?.toFixed(1)} Km Traveled</span>
                  </div>

                  <div className="flex items-center">
                    <CheckCircle size={30} className=" text-gray-500 mr-2  bg-orange-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.user.RideDone} Rides Completed</span>
                  </div>

                  <div className="flex items-center">
                    <IndianRupee  size={30} className=" text-gray-500 mr-2  bg-blue-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.user.TotalExepense?.toFixed(2)} Total Spent</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Captain information */}
          <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Captain Details</h2>

            {rideDataWithID.captain ? (
              <div>
                <div className="flex items-center mb-4">
                  {rideDataWithID.captain.ProfilePicture ? (
                    <img
                      src={rideDataWithID.captain.ProfilePicture}
                      alt="Captain"
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                      <User className="w-6 h-6 text-gray-500" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{rideDataWithID.captain.fullname.firstname} {rideDataWithID.captain.fullname.lastname}</p>
                    <div className="flex items-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs ${rideDataWithID.captain.status === 'online' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                        <span className={`w-2 h-2 rounded-full mr-1 ${rideDataWithID.captain.status === 'online' ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                        {rideDataWithID.captain.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center">
                    <Phone size={30} className=" text-gray-500 mr-2 bg-pink-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.mobileNumber}</span>
                  </div>

                  <div className="flex items-center">
                    <Calendar size={30} className=" text-gray-500 mr-2 bg-yellow-200 p-2 rounded-lg" />
                    <span>Member since {formatDate(rideDataWithID.captain.createdAt)}</span>
                  </div>

                  <div className="flex items-center">
                    <Car size={30} className=" text-gray-500 mr-2 bg-orange-200 p-2 rounded-lg" />
                    <span>
                      {rideDataWithID.captain.vehicle.model} ({rideDataWithID.captain.vehicle.color}) - {rideDataWithID.captain.vehicle.plate}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <CheckCircle size={30} className=" text-gray-500 mr-2 bg-red-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.RideDone} Rides Completed</span>
                  </div>

                  <div className="flex items-center">
                    <MapPin size={30} className=" text-gray-500 mr-2 bg-blue-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.distanceTravelled?.toFixed(1)} Km Traveled</span>
                  </div>

                  <div className="flex items-center">
                    <IndianRupee size={30} className=" text-gray-500 mr-2 bg-lime-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.TotalEarnings?.toFixed(2)} Total Earnings</span>
                  </div>

                  <div className="flex items-center">
                    <Clock size={30}  className=" text-gray-500 mr-2 bg-indigo-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.hoursWorked?.toFixed(1)} hours worked</span>
                  </div>
                  <div className="flex items-center">
                    <Mail size={30}  className=" text-gray-500 mr-2 bg-cyan-200 p-2 rounded-lg" />
                    <span>{rideDataWithID.captain.email}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-6 text-center">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-500" />
                </div>
                <p className="text-gray-600 mb-1">Captain not assigned yet</p>
                <p className="text-sm text-gray-500">Your ride is waiting for a captain</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RideId;