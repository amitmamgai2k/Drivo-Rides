import React from 'react';
import { Phone, Shield, Share } from 'lucide-react';

const WaitForDriver = (props) => {
  console.log("WaitFor Driver",props.ride)

  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <div className="flex-1 flex flex-col justify-center items-center space-y-3">
        <img
          src="https://www.rd.com/wp-content/uploads/2023/06/GettyImages-640566648.jpg?fit=700,700"
          alt="Driver"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-2xl font-bold">{props.ride?.captain?.fullname?.firstname ||'unknown'} {props.ride?.captain?.fullname?.lastname ||'unknown'}</h2>

        {/* Updated Number Plate Design */}
        <div className="relative bg-white border-4 border-black rounded-lg  w-64">
          <div className="text-center text-xs font-bold mb-2">
            INDIA
          </div>
          <div className="bg-white flex justify-center items-center">
            <div className="font-bold text-2xl tracking-wider">
            <span className="text-center  text-2xl tracking-wider font-bold mt-2">
            IND
          </span>  {props.ride?.captain?.vehicle?.plate || 'XX XX XX XXXX'}
            </div>
          </div>

          <div className="absolute top-0 left-0 h-full w-4 bg-blue-600"></div>
          <div className="absolute top-0 right-0 h-full w-4 bg-blue-600"></div>
        </div>

        <p className="text-gray-900 font-bold">Maruti 800 {props.ride?.captain?.vehicle?.color} colour  {props.ride?.captain?.vehicle?.vehicleType}</p>
        <p className="text-2xl font-bold">{props.ride?.otp}</p>
        <p className='text-sm'>Share the Otp with the driver for ride confirmation</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-8">
          <div>
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-center">Safety</p>
          </div>
          <div>
            <Share className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-center">Share my trip</p>
          </div>
          <div>
            <Phone className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-center">Call driver</p>
          </div>
        </div>

        <p className="text-center text-gray-500">
          Meet at the pickup point<br/>
          {props.ride?.origin[0]},{props.ride?.origin[1]}
        </p>

        <button
          className="w-full bg-black text-white py-4 rounded-lg font-semibold"
          onClick={()=>{props.setwaitingForDriver(false)}}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default WaitForDriver;