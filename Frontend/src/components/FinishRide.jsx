import React, { useState, useContext } from 'react';
import { MapPin, ArrowLeft, CreditCard,MapPinHouse } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';


const FinishRide = (props) => {

  const navigate = useNavigate();
  const{socket} = useContext(SocketContext);

  const vehiclesData = [
    {
      srcLocation: 'Pickup Location',

      destLocation: 'Dropoff Location',


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
      console.log("Captain object: ", props.ride?.captain);


      socket.emit("update-captain-details",{
         userId:props.ride?.captain?._id,
         clientId:props.ride?.user?._id,
         TodayEarnings:props.ride.price,
         HoursWorked:props.ride.duration,
         DistanceTravelled:props.ride.distance,
         RideDone : 1

      })
      socket.emit("clear-chat-message",{
         rideId:props.ride._id
      })
      console.log("Captain Data sent to socket");


      navigate('/captain-home');

    }
    }
    socket.on('update-success', (message) => {
      console.log(message); // Should log: 'Details updated'
  });

  socket.on('error', (message) => {
      console.error(message);
  });




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
              src={props.ride?.user?.ProfilePicture}
              alt="Rider"
            />
            <div className="flex justify-between w-full">
              <h4 className="text-lg font-medium">{props.ride?.user?.fullname?.firstname} {props.ride?.user?.fullname?.lastname}</h4>
              <h4 className="text-medium font-medium">{props.ride?.distance} Km</h4>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-6">
  {/* Pickup Location */}
  <div className="flex items-start">
    <div className="w-8 flex-shrink-0 pt-0.5">
      <MapPinHouse className="w-6 h-6 text-blue-600" />
    </div>
    <div className="flex-1">

      <h3 className="font-semibold text-gray-900">{vehicle.srcLocation}</h3>
      <p className="text-sm text-gray-500 mt-1">{props.ride?.originText}</p>
    </div>
  </div>

  {/* Destination */}
  <div className="flex items-start">
    <div className="w-8 flex-shrink-0 pt-0.5">
      <MapPin className="w-6 h-6 text-red-600" />
    </div>
    <div className="flex-1">

      <h3 className="font-semibold text-gray-900">{vehicle.destLocation}</h3>
      <p className="text-sm text-gray-500 mt-1">{props.ride?.destinationText}</p>
    </div>
  </div>

  {/* Payment */}
  <div className="flex items-start">
    <div className="w-8 flex-shrink-0 pt-0.5">
      <CreditCard className="w-6 h-6 text-green-600" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500 mb-1">Payment</p>
      <div className="flex items-baseline gap-2">
        <p className="font-semibold text-gray-900 text-lg">₹{props.ride?.price}</p>
        <span className="text-sm text-gray-500">• {vehicle.payMethod}</span>
      </div>
    </div>
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