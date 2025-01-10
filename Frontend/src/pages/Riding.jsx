import React from "react";
import { Link } from "react-router-dom";

const Riding = () => {
  // Static placeholders for the ride data
  const ride = {
    captain: {
      fullname: { firstname: "John Doe" },
      vehicle: { plate: "AB-1234" },
    },
    destination: "Downtown, City Center",
    fare: 250,
  };

  return (
    <div className="h-screen">
      {/* Home Link */}
      <Link
        to="/home"
        className="fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>

      {/* Top Section */}
       <div className="h-1/2">
       <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div className="h-1/2 p-4">
        {/* Ride Info */}
        <div className="flex items-center justify-between">
          <img
            className="h-12"
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"
            alt="Vehicle"
          />
          <div className="text-right">
            <h2 className="text-lg font-medium capitalize">
              {ride.captain.fullname.firstname}
            </h2>
            <h4 className="text-xl font-semibold -mt-1 -mb-1">
              {ride.captain.vehicle.plate}
            </h4>
            <p className="text-sm text-gray-600">Maruti Suzuki Alto</p>
          </div>
        </div>

        {/* Destination and Fare */}
        <div className="flex flex-col gap-2 mt-5">
          <div className="flex items-center gap-5 p-3 border-b-2">
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg font-medium">562/11-A</h3>
              <p className="text-sm -mt-1 text-gray-600">{ride.destination}</p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3">
            <i className="ri-currency-line"></i>
            <div>
              <h3 className="text-lg font-medium">₹{ride.fare}</h3>
              <p className="text-sm -mt-1 text-gray-600">Cash</p>
            </div>
          </div>
        </div>

        {/* Payment Button */}
        <button className="w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg">
          Make a Payment
        </button>
      </div>
    </div>
  );
};

export default Riding;
