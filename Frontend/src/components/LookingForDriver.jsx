import React,{useState} from 'react'
import { MapPin, ArrowLeft } from 'lucide-react';
import GamePanel from './GamePanel';
function LookingForDriver(props) {

    const vehiclesData = [
        {
          img1: '../src/assets/car.png',
      img2:'../src/assets/bike.png',
      img3:'../src/assets/auto.png',
      img4:'../src/assets/Road.png',
          srcLocation: 'Pickup Location',

          destLocation: 'Dropoff Location',


          payMethod: 'Cash',
        },
      ];
      const[gamePanelOpen, setGamePanelOpen] = useState(false);
      const vehicle = vehiclesData[0];

      const onBackClick = () => {
        console.log("Back button clicked");

        props.setVehicleFound(false); // Close Looking for Driver panel
        props.setConfirmRidePanel(false); // Optionally, close Confirm Ride panel
        props.setVehiclePanel(false); // Optionally, close Vehicles Available panel
      };
  return (
    <div className="flex flex-col w-full h-full bg-white rounded-t-xl bottom-0 ">
    {/* Back Button */}
    <div className="mb-4">
      <button
        onClick={onBackClick}
        className="flex items-center space-x-2 hover:bg-gray-100  rounded-full transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
    </div>

    <div className="flex-1 space-y-6">
      {/* Header */}
      <h2 className="text-2xl font-semibold"> Looking For a Driver</h2>

      {/* Vehicle Image */}
      <div className="relative w-full h-40  rounded-lg overflow-hidden  flex bg-cover bg-center  bg-no-repeat  "
       style={{
        backgroundImage: `url(${vehicle.img4})`,


      }}
      >

     <img src={props.vehicleType === 'car' ? `${vehicle.img1}` : props.vehicleType === 'motorcycle' ? `${vehicle.img2}`: `${vehicle.img3}`} alt="Vehicle"
    className="absolute w-full h-[50%]  object-contain mt-10 animate-carMove "
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
            <p className="text-gray-600 text-sm">{props.pickup}</p>
          </div>
        </div>

        {/* Destination */}
        <div className="flex items-start space-x-3">
          <div className="mt-1">
            <MapPin className="w-5 h-5 text-gray-500 fill-current" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{vehicle.destLocation}</h3>
            <p className="text-gray-600 text-sm">{props.drop}</p>
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
          <p className="font-semibold">₹{props.fare[props.vehicleType]}</p>
        </div>
      </div>
    </div>
    <p className='text-sm text-center text-gray-700 mb-2'>Till looking for a driver play a game</p>
    <div  onClick={() => setGamePanelOpen(true)} className='flex justify-center text-white  items-center space-x-2 bg-black p-2 rounded-full transition-colors border-2 border-solid'>
      Launch Game
    </div>
    {gamePanelOpen && (
        <GamePanel setGamePanelOpen={setGamePanelOpen} />
      )}



  </div>
  )
}

export default LookingForDriver
