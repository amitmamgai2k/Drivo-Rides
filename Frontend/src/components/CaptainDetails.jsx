import React, { useContext } from 'react';
import 'remixicon/fonts/remixicon.css';
 import { CaptainDataContext } from '../context/CaptainContext';

function CaptainDetails() {
    const { captain } = useContext(CaptainDataContext);
  // console.log('captaindata',captain.captain.fullname.firstname);
  if (!captain || !captain.captain) {
    return (
        <div className="h-2/5 p-4">
            <p>Loading Captain Details...</p>
        </div>
    );
}

  return (

    <div className="h-2/5 p-4">
      {/* Captain Header */}
      <div className="flex items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 rounded-full object-cover"
            src="https://rahahome.com/wp-content/uploads/2022/11/2-min-scaled.jpg"
            alt="Captain"
          />
          <h4 className="text-lg font-medium">{captain?.captain?.fullname?.firstname + " " + captain?.captain?.fullname?.lastname}</h4>
        </div>
        <div className="text-center">
          <h4 className="text-lg font-medium">₹200</h4>
          <p className="text-sm text-gray-600">Earned</p>
        </div>
      </div>

      {/* Captain Stats */}
      <div className="flex items-center justify-between gap-4 bg-gray-100 rounded-md p-4">
        {/* Hours Online */}
        <div className="text-center">
          <i className="text-2xl ri-time-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>

        {/* Distance Covered */}
        <div className="text-center">
          <i className="text-2xl font-extralight ri-speed-up-fill"></i>
          <h4 className="text-lg font-medium">300Km</h4>
          <p className="text-sm text-gray-600">Distance Covered</p>
        </div>

        {/* Other Stat */}
        <div className="text-center">
          <i className="text-2xl font-extralight ri-booklet-line"></i>
          <h4 className="text-lg font-medium">10.2</h4>
          <p className="text-sm text-gray-600">Hours Online</p>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
