import React,{ useState} from 'react';
import { Phone, Shield, Share ,MessageCircleMore} from 'lucide-react';
import ChatPanel from './ChatPanel';
const WaitForDriver = (props) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  console.log("WaitFor Driver",props.ride)
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
    }
    else {
      console.log('Web Share API is not supported in this browser.');
    }
  }

  return (
    <div className="flex flex-col h-screen z-30 bg-white p-4">
      <div className="flex-1 flex flex-col justify-center items-center space-y-3">
        <img
          src={props.ride?.captain?.ProfilePicture}
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

        <p className="text-gray-900 font-bold">{props.ride?.captain?.vehicle?.model} {props.ride?.captain?.vehicle?.color} colour  {props.ride?.captain?.vehicle?.vehicleType}</p>
        <p className="text-2xl font-bold">{props.ride?.otp}</p>
        <p className='text-sm'>Share the Otp with the driver for ride confirmation</p>

      </div>
   <div className='p-2 border-2 w-auto  text-bold rounded-lg flex flex-row items-center mx-auto justify-center mt-4'    onClick={() => setIsChatOpen(true)}>
    <MessageCircleMore className="w-6 h-6 mr-2 text-blue-700" />
    <p>Message To Driver</p>
</div>

      <div className="space-y-4 mt-6">
        <div className="flex justify-center space-x-8">
          <div>
            <Shield className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-xs text-center">Safety</p>
          </div>
          <div>
            <Share className="w-8 h-8 mx-auto mb-2 text-blue-500" onClick={shareRideHandler} />
            <p className="text-xs text-center">Share my trip</p>
          </div>
          <div>
            <Phone className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <a href={`tel:${props.ride?.captain?.mobileNumber}`}>
        <p className='text-center text-xs '>Call Now</p>
    </a>
          </div>
        </div>

        <p className="text-center text-gray-500">
          Meet at the pickup point<br/>
          {props.ride?.originText}
        </p>

        <button
          className="w-full bg-black text-white py-4 rounded-lg font-semibold"
          onClick={()=>{props.setwaitingForDriver(false)}}
        >
          Cancel Ride
        </button>
      </div>

      <ChatPanel
  isOpen={isChatOpen}
  onClose={() => setIsChatOpen(false)}
  Name={`${props.ride?.captain?.fullname?.firstname || "Driver"} ${
    props.ride?.captain?.fullname?.lastname || ""
  }`}
  Image={props.ride?.captain?.ProfilePicture || "default-profile.png"}
/>
      </div>



  );
};

export default WaitForDriver;