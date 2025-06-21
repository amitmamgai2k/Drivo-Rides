import React from 'react';
import { MapPin, ArrowLeft, Home } from 'lucide-react';
import carImg from '../assets/car.png';
import bikeImg from '../assets/bike.png';
import autoImg from '../assets/auto.png';


const ConfirmedVehicle = (props) => {
  const vehiclesData = [
    {
      img1:carImg,
      img2: bikeImg,
      img3: autoImg,
      srcLocation: 'Pickup Location',
      destLocation: 'Dropoff Location',
      payMethod: 'Cash',
    },
  ];

  const vehicle = vehiclesData[0];

  return (
    <div className="flex flex-col w-full h-full bg-white rounded-t-xl p-4">
      {/* Back Button */}
      <div className="mb-4">
        <button
          onClick={() => props.setConfirmRidePanel(false)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Remaining UI */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl font-semibold">Confirm Your Ride</h2>
        <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
          <img
            src={
              props.vehicleType === 'car'
                ? vehicle.img1
                : props.vehicleType === 'motorcycle'
                  ? vehicle.img2
                  : vehicle.img3
            }
            alt="Vehicle"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin size={24} className="text-sky-500 bg-sky-100 p-2 rounded-lg" />
            <div>
              <h3 className="font-semibold text-lg">{vehicle.srcLocation}</h3>
              <p className="text-gray-600 text-sm">{props.pickup}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Home size={24} className="text-violet-500 bg-violet-100 p-2 rounded-lg" />
            <div>
              <h3 className="font-semibold text-lg">{vehicle.destLocation}</h3>
              <p className="text-gray-600 text-sm">{props.drop}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-gray-600">Payment Method</p>
            <p className="font-semibold">{vehicle.payMethod}</p>
          </div>
          <div>
            <p className="text-gray-600">Total Fare</p>
            <p className="font-semibold">₹{props.fare[props.vehicleType]}</p>
          </div>
        </div>
      </div>

      {/* Fixed Confirm Button */}
      <div className="mt-6">
        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
        >
          Confirm Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmedVehicle;