import React from 'react';
import { Phone, Shield, Share } from 'lucide-react';

const WaitForDriver = (props) => {


  return (
    <div className="flex flex-col h-screen bg-white p-4">
      <div className="flex-1 flex flex-col justify-center items-center space-y-6">
        <img
          src="https://www.rd.com/wp-content/uploads/2023/06/GettyImages-640566648.jpg?fit=700,700"
          alt="Driver"
          className="w-24 h-24 rounded-full"
        />
        <h2 className="text-2xl font-bold">{props.ride?.captain?.fullname?.firstname ||'unknown'}</h2>
        <p className="text-gray-500">KA15AK00-0</p>
        <p className="text-gray-500">White Suzuki S-Presso LXI ★ 4.9</p>
        <p className="text-2xl font-bold">2 min</p>
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
          562/11-A<br/>
          Kaikondrahalli, Bengaluru, Karnataka
        </p>

        <button
          className="w-full bg-black text-white py-4 rounded-lg font-semibold"
          onClick={()=>{props.WaitForDriver(false)}}
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default WaitForDriver;