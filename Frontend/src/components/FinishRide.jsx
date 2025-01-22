import React, { useState } from 'react';
import { MapPin, ArrowLeft, CreditCard } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const FinishRide = (props) => {

  const navigate = useNavigate();

  const vehiclesData = [
    {
      srcLocation: '562/11-A',
      exactLocation: 'Kaikondrahalii, Bengaluru, Karnataka',
      destLocation: 'Third Wave Coffee',
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

  const endRide = async () => {

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`, {
      rideId:props.ride._id ,
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (response.status === 200) {

      navigate('/captain-home');

    }
    }




  return (
    <div className="flex flex-col w-full px-6 pt-4 mt-2">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => props.setfinishRidePanel(false)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />
          <span>Back</span>
        </button>
      </div>

      {/* Ride Info */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl px-2 font-bold">Ride Details</h2>
        <div className="flex items-center justify-between bg-yellow-400 gap-4 p-4 rounded-lg mb-10">
          <div className="flex items-center justify-between w-full gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://rahahome.com/wp-content/uploads/2022/11/2-min-scaled.jpg"
              alt="Rider"
            />
            <div className="flex justify-between w-full">
              <h4 className="text-lg font-medium">{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}</h4>
              <h4 className="text-medium font-medium">{props.ride?.distance} Km</h4>
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
        <div className="flex space-x-2 items-center p-4 bg-gray-50 rounded-lg">
          <CreditCard className="w-6 h-6 text-gray-500" />
          <div className="flex flex-col">
            <p className="font-semibold text-lg">₹{props.ride?.price}</p>
            <p className="font-extralight text-sm">{vehicle.payMethod}</p>
          </div>
        </div>



      {/* Action Buttons */}
      <div className="mt-6 mb-3">
        <button
          onClick={endRide}

          className="w-full flex items-center justify-center bg-black text-white py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200 cursor-pointer"
        >
          Finish Ride
        </button>
        <p className='text-center font- base text-sm text-gray-400 mt-2'>Click on Finish Ride button to finish the ride</p>
      </div>
</div>

    </div>
  );
};

export default FinishRide;