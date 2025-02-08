import React, { useState } from 'react';
import { MapPinned ,MapPin, ArrowLeft, CreditCard ,MessageCircleMore} from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ChatPanel from './ChatPanel';

const ConfirmRidePopUp = (props) => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState('');
 const [isChatOpen, setIsChatOpen] = useState(false);

  const navigate = useNavigate();

  const vehiclesData = [
    {
      srcLocation: 'PickUp Location',
      exactLocation: 'Kaikondrahalii, Bengaluru, Karnataka',
      destLocation: 'DropOff Location',
      exactDestLocation: 'Plot no 417 sector2 HSR Layout, Bengaluru, Karnataka',
      price: '193.20',
      payMethod: 'Cash',
    },
  ];

  const vehicle = vehiclesData.length > 0 ? vehiclesData[0] : null;

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      setError('');

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  if (!vehicle) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>No vehicle data available.</p>
      </div>
    );
  }
  const submitHandler = async () => {
    try {
      const otpString = otp.join(''); // Convert OTP array to a string
     console.log("rideId", props.ride._id);
     console.log("captain Id in confrim ride popup", props.ride.captain._id);

      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/rides/start-ride`,
        {
          params: {
            rideId: props.ride._id,
            otp: otpString, // Pass the OTP as a string
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      if (response.status === 200) {
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
       const   ride = props.ride;
         console.log("riding confirm ridee popup props data",props.ride);

        navigate('/captain-riding', { state: { ride }   });
      }
    } catch (error) {
      console.error('Error starting ride:', error);
    }
  };

  return (
    <div>
    <div  className="h-screen" >
    <div className="flex flex-col w-full px-2 mt-4">
      {/* Back Button */}
      <div>
        <button
          onClick={() => props.setConfirmRidePopupPanel(false)}
          className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-6 h-6" />

        </button>
      </div>

      {/* Ride Info */}
      <div className="flex-1 space-y-6">
        <h2 className="text-2xl px-2 font-bold">Ride Details</h2>
        <div className="flex items-center justify-between bg-yellow-400 gap-8 p-4 rounded-lg mb-10">
          <div className="flex items-center justify-between w-full gap-8">
            <img
              className="h-10 w-10 rounded-full object-cover border-2 border-black"
              src={props.ride?.user?.ProfilePicture}
              alt="Rider"
            />
            <div className="flex justify-between items-center w-full">
              <h4 className="text-lg font-medium">{props.ride?.user?.fullname?.firstname || "Unknown"} {props.ride?.user?.fullname?.lastname || ""}</h4>
              <h4 className="text-medium font-medium">{props.ride?.distance} Km</h4>
            </div>
          </div>
        </div>

        {/* Location Info */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
          <div className='bg-green-200 p-3 rounded-lg'>  <MapPin className="w-5 h-5 text-green-800" /></div>
            <div>
              <h3 className="font-semibold text-lg">{vehicle.srcLocation}</h3>
              <p className="text-gray-600 text-sm">{props.ride?.originText}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3 bg-red ">
          <div className='bg-blue-200 p-3 rounded-lg'> <MapPinned className="w-5 h-5 text-blue-800" /></div>
            <div>
              <h3 className="font-semibold text-lg">{vehicle.destLocation}</h3>
              <p className="text-gray-600 text-sm">{props.ride?.destinationText}</p>
            </div>
          </div>
        </div>

        {/* Fare and Payment Info */}
        <div className="flex items-start space-x-3   bg-gray-50 rounded-lg">
        <div className='bg-orange-200 p-3 rounded-lg'>  <CreditCard className="w-6 h-6 text-orange-700" /></div>
          <div className="flex flex-col ">
            <p className="font-semibold text-lg">₹{props.ride?.price}</p>
            <p className="font-extralight text-sm">{vehicle.payMethod}</p>
          </div>

        </div>
        <div className='p-2 border-2 w-auto  text-bold rounded-lg flex flex-row items-center mx-auto justify-center mt-4'    onClick={() => setIsChatOpen(true)}>
    <MessageCircleMore className="w-6 h-6 mr-2 text-blue-700" />
    <p>Message To Rider</p>
</div>

        {/* OTP Input Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Enter OTP</h3>
          <div className="flex justify-center space-x-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}

                className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-lg focus:border-black focus:outline-none"
                maxLength={1}
              />
            ))}
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 mb-3">
        <button
          onClick={() => {
            props.setConfirmRidePopupPanel(false);
            submitHandler()

          }}

          className="w-full flex items-center justify-center bg-black text-white py-4 rounded-lg font-semibold hover:bg-blue-400 transition-colors duration-200 mb-4 cursor-pointer"
        >
          Confirm
        </button>
      </div>



</div>

    </div>

     <ChatPanel
       isOpen={isChatOpen}
       onClose={() => setIsChatOpen(false)}
       Name={`${props.ride?.user?.fullname?.firstname || "Driver"} ${
         props.ride?.user?.fullname?.lastname || ""
       }`}
       Image={props.ride?.user?.ProfilePicture || "default-profile.png"}
       rideId={props.ride?._id}
       recipientId={props.ride?.user?._id}
     />
    </div>
  );
};

export default ConfirmRidePopUp;