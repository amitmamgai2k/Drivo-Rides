import React, { useState } from 'react';
import { Phone, Shield, Share, MessageCircleMore, X } from 'lucide-react';
import ChatPanel from './ChatPanel';

const WaitForDriver = (props) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log("WaitFor Driver", props.ride);

  const shareRideHandler = () => {
    if (navigator.share) {
      const shareData = {
        title: 'Share Ride Details',
        text: `Ride Origin: ${props.ride.originText || 'unknown'}  Ride Destination: ${props.ride.destinationText || 'unknown'}  Captain Name: ${props.ride?.captain?.fullname?.firstname || 'unknown'} ${props.ride?.captain?.fullname?.lastname || 'unknown'}  Captain PhoneNumber: ${props.ride?.captain?.mobileNumber || 'unknown'}`,
      };
      console.log('Share Data:', shareData);
      navigator.share(shareData)
        .then(() => console.log('Ride shared successfully'))
        .catch((error) => console.error('Error sharing ride:', error));
    } else {
      console.log('Web Share API is not supported in this browser.');
    }
  };

  // Only show if waitingForDriver is true
  if (!props.waitingForDriver) {
    return null;
  }

  return (
    <>
      {/* Simplified container - bottom sheet style */}
      <div className="bg-white w-full h-full rounded-t-xl shadow-xl overflow-hidden">
        {/* Scrollable content */}
        <div className="flex flex-col h-full overflow-y-auto">

          {/* Header with close option */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex justify-between items-center">
            <h3 className="text-lg font-semibold">Driver on the way</h3>
            <button
              onClick={() => props.setwaitingForDriver(false)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col justify-center items-center space-y-6 p-6">

            {/* Driver image and info */}
            <div className="text-center space-y-3">
              <img
                src={props.ride?.captain?.ProfilePicture}
                alt="Driver"
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-gray-200"
              />
              <h2 className="text-2xl font-bold text-gray-900">
                {props.ride?.captain?.fullname?.firstname || 'Unknown'} {props.ride?.captain?.fullname?.lastname || 'Unknown'}
              </h2>
            </div>

            {/* License plate */}
            <div className="relative bg-white border-4 border-black rounded-lg p-4 w-full max-w-xs">
              <div className="text-center text-xs font-bold mb-2 text-gray-700">
                INDIA
              </div>
              <div className="bg-white flex justify-center items-center">
                <div className="font-bold text-xl sm:text-2xl tracking-wider text-center">
                  <span className="text-blue-600 mr-2">IND</span>
                  <span className="text-black">
                    {props.ride?.captain?.vehicle?.plate || 'XX XX XX XXXX'}
                  </span>
                </div>
              </div>
              <div className="absolute top-0 left-0 h-full w-3 bg-blue-600 rounded-l"></div>
              <div className="absolute top-0 right-0 h-full w-3 bg-blue-600 rounded-r"></div>
            </div>

            {/* Vehicle info */}
            <p className="text-gray-900 font-medium text-center">
              {props.ride?.captain?.vehicle?.model} {props.ride?.captain?.vehicle?.color} colour {props.ride?.captain?.vehicle?.vehicleType}
            </p>

            {/* OTP */}
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold text-blue-600">{props.ride?.otp}</p>
              <p className="text-sm text-gray-600">
                Share the OTP with the driver for ride confirmation
              </p>
            </div>

            {/* Message button */}
            <div
              className="p-3 border-2 border-gray-300 rounded-lg flex flex-row items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors w-full max-w-xs"
              onClick={() => setIsChatOpen(true)}
            >
              <MessageCircleMore className="w-6 h-6 mr-2 text-blue-700" />
              <p className="font-medium">Message To Driver</p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center space-x-12 py-4">
              <div className="text-center">
                <div className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                  <Shield className="w-8 h-8 mx-auto text-blue-500" />
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">Safety</p>
              </div>

              <div className="text-center">
                <div
                  className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer"
                  onClick={shareRideHandler}
                >
                  <Share className="w-8 h-8 mx-auto text-blue-500" />
                </div>
                <p className="text-xs text-center mt-2 text-gray-600">Share trip</p>
              </div>

              <div className="text-center">
                <a href={`tel:${props.ride?.captain?.mobileNumber}`}>
                  <div className="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors cursor-pointer">
                    <Phone className="w-8 h-8 mx-auto text-blue-500" />
                  </div>
                  <p className="text-xs text-center mt-2 text-gray-600">Call Now</p>
                </a>
              </div>
            </div>

            {/* Pickup location */}
            <div className="text-center space-y-2 px-4">
              <p className="text-gray-600 font-medium">Meet at the pickup point</p>
              <p className="text-sm text-gray-500 break-words">
                {props.ride?.originText}
              </p>
            </div>
          </div>

          {/* Footer with cancel button */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
            <button
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg font-semibold transition-colors"
              onClick={props.CancleRide}
            >
              Cancel Ride
            </button>
          </div>
        </div>
      </div>

      {/* Chat Panel - only show when chat is open */}
      {isChatOpen && (
        <ChatPanel
          isOpen={isChatOpen}
          onClose={() => setIsChatOpen(false)}
          setIsChatOpen={setIsChatOpen}
          Name={`${props.ride?.captain?.fullname?.firstname || "Driver"} ${
            props.ride?.captain?.fullname?.lastname || ""
          }`}
          Image={props.ride?.captain?.ProfilePicture || "default-profile.png"}
          rideId={props.ride?._id}
          recipientId={props.ride?.captain?._id}
        />
      )}
    </>
  );
};

export default WaitForDriver;