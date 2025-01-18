import React from 'react';
import { MapPin, ArrowLeft,CreditCard } from 'lucide-react';

const RidePop = (props) => {
  const vehiclesData = [
    {
      srcLocation: 'Pickup Location',
      exactLocation: 'Kaikondrahalii, Bengaluru, Karnataka',
      destLocation: 'Dropoff Location',
      exactDestLocation: 'Plot no 417 sector2 HSR Layout, Bengaluru, Karnataka',
      price: '193.20',
      payMethod: 'Cash',
    },
  ];

  const vehicle = vehiclesData.length > 0 ? vehiclesData[0] : null;

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No vehicle data available.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-3/4 p-2">
      {/* Back Button */}
      <div className="">
        <button
          onClick={() => props.setRidePopupPanel(false)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Ride Info */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl px-2 font-bold">New Ride Available!</h2>
        <div className="flex items-center justify-between bg-yellow-400 gap-4 p-4 rounded-lg mb-10">
          <div className="flex items-center justify-between w-full gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://rahahome.com/wp-content/uploads/2022/11/2-min-scaled.jpg"
              alt="Rider"
            />
            <div className="flex justify-between w-full">
              <h4 className="text-lg font-medium"> {props.ride?.user?.fullname?.firstname || "Unknown"} {props.ride?.user?.fullname?.lastname || ""}</h4>

              <h4 className="text-lg font-medium">{props.ride?.distance} Km</h4>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-semibold text-lg">{vehicle.srcLocation}</h3>
              <p className="text-gray-600 text-sm">{props.ride?.origin}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500" />
            <div>
              <h3 className="font-semibold text-lg">{vehicle.destLocation}</h3>
              <p className="text-gray-600 text-sm">{props.ride?.destination}</p>
            </div>
          </div>
        </div>

        {/* Fare and Payment Info */}
        <div className="flex space-x-2 items-center p-2bg-gray-50 rounded-lg">
          <div >
           <CreditCard className='w-6 h-6 text-gray-500'/>
            </div>
            <div className='flex flex-col'>
            <p className="font-semibold text-lg">₹{props.ride?.price}</p>
            <p className="font-extralight text-small">{vehicle.payMethod}</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6">
        <button
          onClick={()=>{props.setConfirmRidePopupPanel(true)
           props.confirmRide()
            }}
          className="w-full bg-black text-white py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
        >
          Accept
        </button>
      </div>
      <div className="mt-6">
        <button
          onClick={() =>  props.setRidePopupPanel(false)}
          className="w-full bg-green-800 text-white py-4 rounded-lg font-semibold hover:bg-blue-800 transition-colors duration-200 cursor-pointer"
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default RidePop;