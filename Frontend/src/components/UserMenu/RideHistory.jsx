import React, { useState } from 'react';
import { ArrowLeft, Clock, MapPin, Car, Blend, Wallet, Star, Calendar, Navigation, Receipt, IndianRupee, ArrowDownUp,MapPinHouse,Phone, IdCard} from 'lucide-react';
import { Link } from 'react-router-dom';
const RideHistory = (props) => {
  const [expandedRide, setExpandedRide] = useState(null);


  if (!props.rideHistoryData?.[0]?.rideHistory) return null;


  const rides = props.rideHistoryData[0].rideHistory.map(ride => ({
    id: ride.rideID,
    fname: ride.captainFirstName,
    lname: ride.captainLastName,
    mobile: ride.captainMobileNumber,
    vehicletype: ride.captainVehicleDetails?.vehicleType,
    vehiclePlate: ride.captainVehicleDetails?.plate,
    vehicleModel: ride.captainVehicleDetails?.model,
    vehicleColor: ride.captainVehicleDetails?.color,
    captainImage: ride.captainProfilePicture,
    date: new Date(ride.date).toLocaleDateString(),
    time: new Date(ride.date).toLocaleTimeString(),
    from: ride.origin,
    to: ride.destination,
    fare: ride.price,
    duration: ride.duration.toFixed(2)*60,
    distance: ride.distance,
    rating: ride.rating ?? "5",
    payment: ride.paymentID ? `•••• ${ride.paymentID}` : "XXXX",
    routeImage: 'https://blogadmin.uberinternal.com/wp-content/uploads/2022/08/image22.gif',
    invoiceLink: '#'
  }));

  // Stats cards data
  const stats = [
    { icon: Car, value: `${props?.userData?.user?.RideDone || 0}`, label: 'Total Rides', color: 'blue' },
    { icon: IndianRupee, value: `${props?.userData?.user?.TotalExepense || 0}`, label: 'Total Spent', color: 'green' },
    { icon: ArrowDownUp, value: `${props?.userData?.user?.distanceTravelled || 0} Km`, label: 'Total Distance', color: 'purple' },
    { icon: Clock, value: `${props?.userData?.user?.hoursRide || 0} Hours`, label: 'Total Time', color: 'orange' },
  ];

  return (
    <div className="fixed inset-0 bg-white z-30 overflow-auto animate-in slide-in-from-right">
      {/* Header */}
      <div className="sticky top-0 bg-white/80 backdrop-blur-sm border-b border-gray-100 px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={() => props.toggleRideHistory(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold">Ride History</h1>
          <div className="w-10" />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`p-4 bg-${stat.color}-100 rounded-xl text-center`}>
              <stat.icon className={`w-8 h-8 text-${stat.color}-600 mx-auto mb-2`} />
              <div className={`text-2xl font-bold text-${stat.color}-600`}>{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <h1 className='text-xl font-semibold ml-3'>Past Rides Details</h1>

        {/* Ride List */}
        <div className="space-y-2 ">
          {rides.map((ride) => (
            <div key={ride.id} className="border rounded-xl overflow-hidden ">
              {/* Ride Summary */}
              <div
                className="p-4 bg-gray-200 cursor-pointer "
                onClick={() => setExpandedRide(expandedRide === ride.id ? null : ride.id)}
              >
                <div className="flex items-center justify-between bg-gray-100 active:bg-gray-300  p-2 rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-green-600" />
                      <span className="font-medium">{ride.date}</span>
                      <span className="text-gray-600">{ride.time}</span>
                    </div>
                    <div className="flex items-center gap-1 text-medium text-black font-sans">
                      <Car className="w-5 h-5 text-blue-900 "  />
                      <span>{ride.vehicleColor} Colour  {ride.vehicleModel} </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-lg">₹{ride.fare}</div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {expandedRide === ride.id && (

                <div className="border-t p-4 space-y-6 bg-blue-50">
                  <p className='font-semibold text-black'>RideID {ride.id}</p>
                  {/* Route Map */}
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={ride.routeImage}
                      alt="Route map"
                      className="w-full h-40 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4  w-[90%] text-white flex justify-between">
                      <div className="flex items-center gap-2">
                        <Navigation className="w-5 h-5 " />
                        <span className="font-medium">{ride.distance} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 " />
                        <span className="font-medium">{ride.duration} mins</span>
                      </div>


                    </div>
                  </div>

                  {/* Detailed Information */}
                  <div className=" gap-4">
                    <div className="space-y-2 flex justify-between">

                      <div className="flex items-center gap-2 ">
                        <MapPinHouse  className="w-5 h-5 text-green-600" />
                        <div>
                          <div className="text-xs text-gray-500">From</div>
                          <div className="font-medium">{ride.from}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-red-600" />
                        <div>
                          <div className="text-xs text-gray-500">To</div>
                          <div className="font-medium">{ride.to}</div>
                        </div>
                      </div>
                    </div>


                  </div>

                  {/* Driver Details */}
                  <div className="space-y-2 flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                      <img
                        src={ride.captainImage}
                        alt="Driver"
                        className="w-10 h-10 rounded-full border-2 border-solid border-gray-400"
                      />
                      <div>
                        <div className="text-xs text-gray-500">DRIVER</div>
                        <div className="font-medium">{ride.fname} {ride.lname}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">CONTACT</div>
                        <div className="font-medium">{ride.mobile}</div>
                      </div>
                    </div>
                  </div>
                  {/* Vehicle Detials */}

                  <div className="space-y-2 flex justify-between items-center ">
                    <div className="flex items-center gap-2">
                    <IdCard className="w-5 h-5 text-orange-600" />
                      <div>
                        <div className="text-xs text-gray-500">{ride.vehicletype.toUpperCase()} PLATE NUMBER</div>
                        <div className="font-medium">{ride.vehiclePlate}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Blend  className="w-5 h-5 text-blue-600" />
                      <div>
                        <div className="text-xs text-gray-500">VEHICLE MODEL</div>
                        <div className="font-medium">{ride.vehicleModel}</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 flex justify-between">
                      <div className="flex items-center gap-2">
                        <Wallet className="w-5 h-5 text-purple-600" />
                        <div>
                          <div className="text-xs text-gray-500">Payment</div>
                          <div className="font-medium">{ride.payment}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-orange-600" />
                        <div>
                          <div className="text-xs text-gray-500">Your Rating</div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${i < Math.floor(ride.rating) ? 'fill-yellow-400' : ''}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>


                  {/* Actions */}
                  <div className="flex justify-between ">
                    <button className="flex items-center gap-2 text-blue-600 hover:bg-blue-50  py-2 rounded-lg">
                      <Receipt className="w-5 h-5" />
                      Download Receipt
                    </button>

                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-8 border-t text-center text-sm text-gray-500">
          {rides.length} rides shown • Updated just now
        </div>
        <div className="mt-6">
          <p className="text-xs text-gray-500 text-center mt-6">
            By signing up, you agree to our{' '}
            <Link to='/Drivo-Rides-Terms-and-Conditions' className="text-blue-600 hover:underline">Terms of Service</Link>
            {' '}and{' '}
            <Link to='/Drivo-Rides-privacy-policy' className="text-blue-600 hover:underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RideHistory;