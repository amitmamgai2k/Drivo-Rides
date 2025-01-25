import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import logo from '../assets/logo.png';
import FinishRide from '../components/FinishRide';
import { gsap } from "gsap";
import { Link,useLocation } from 'react-router-dom';
import MapBackground from '../components/MapBackGround';

function CaptainRiding(props) {
  const [finishRidePanel, setfinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const location = useLocation();
  const rideData = location.state?.ride || {};
  console.log("rideData",rideData);



  useEffect(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [finishRidePanel]);

  return (
    <div className="h-screen bg-gray-100 relative overflow-hidden">
      {/* Header with Logo */}
      <div className="absolute top-0 left-0 right-0 p-4 z-20">
        <img
          className=" object-contain"
          src={logo}
          alt="Uber Logo"
          height={80} width={150}
        />
      </div>

      {/* Map Section */}
      <div className="h-[85vh] relative w-full  object-cover">
        <MapBackground />
      </div>

      {/* Bottom Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-white shadow-lg rounded-t-3xl overflow-hidden">
        {/* Pull-up Handle */}
        <div
          className="bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          onClick={() => setfinishRidePanel(true)}
        >
          <div className="flex justify-center py-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
        </div>

        {/* Ride Info */}
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="text-2xl font-bold text-gray-800">{rideData.distance} Km</h4>
            <p className="text-gray-500 text-sm">Distance to destination</p>
          </div>
          <button
            onClick={() => setfinishRidePanel(true)}
            className="bg-red-600 px-6 py-3 rounded-xl text-white font-semibold
                     hover:bg-red-700 active:bg-red-800 transition-colors
                     shadow-md hover:shadow-lg"
          >
            Complete Ride
          </button>
        </div>
      </div>

      {/* Finish Ride Panel */}
      <div
        ref={finishRidePanelRef}
        className="fixed w-full h-auto bottom-0 bg-white px-4 py-6 z-50
                 transform translate-y-full shadow-xl rounded-t-3xl"
      >
        <FinishRide setfinishRidePanel={setfinishRidePanel}  ride={rideData}/>
      </div>
    </div>
  );
}

export default CaptainRiding;