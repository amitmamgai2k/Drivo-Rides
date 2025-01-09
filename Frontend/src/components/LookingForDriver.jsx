import React from 'react'
import { MapPin, ArrowLeft } from 'lucide-react';
function LookingForDriver({setConfirmRidePanel, setVehiclePanel, setVehicleFound}) {
    const vehiclesData = [
        {
          img: 'https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png',
          srcLocation: '562/11-A',
          exactLocation: 'Kaikondrahalii, Bengaluru, Karnataka',
          destLocation: 'Third Wave Coffee',
          exactDestLocation: 'Plot no 417 sector2 HSR Layout, Bengaluru, Karnataka',
          price: '193.20',
          payMethod: 'Cash',
        },
      ];

      const vehicle = vehiclesData[0];

      const onBackClick = () => {
        setVehicleFound(false); // Close Looking for Driver panel
        setConfirmRidePanel(false); // Optionally, close Confirm Ride panel
        setVehiclePanel(false); // Optionally, close Vehicles Available panel
      };
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-t-xl p-4">
    {/* Back Button */}
    <div className="mb-4">
      <button
        onClick={onBackClick}
        className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>

    <div className="flex-1 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold"> Looking For a Driver</h2>

      {/* Vehicle Image */}
      <div className="w-full h-40 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={vehicle.img}
          alt="Vehicle"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Location Details */}
      <div className="space-y-4">
        {/* Pickup Location */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <MapPin className="w-5 h-5 text-gray-500" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{vehicle.srcLocation}</h3>
            <p className="text-gray-600 text-sm">{vehicle.exactLocation}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <MapPin className="w-5 h-5 text-gray-500 fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{vehicle.destLocation}</h3>
            <p className="text-gray-600 text-sm">{vehicle.exactDestLocation}</p>
          </div>
        </div>
      </div>

      {/* Payment Details */}
      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
        <div>
          <p className="text-gray-600">Payment Method</p>
          <p className="font-semibold">{vehicle.payMethod}</p>
        </div>
        <div>
          <p className="text-gray-600">Total Fare</p>
          <p className="font-semibold">₹{vehicle.price}</p>
        </div>
      </div>
    </div>



  </div>
  )
}

export default LookingForDriver
