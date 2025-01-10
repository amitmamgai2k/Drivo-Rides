import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import gsap from "gsap";
import  ConfirmRidePopUp from "../components/ConfirmRidePopUp";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const[ConfirmRidePopupPanel,setConfirmRidePopupPanel] = useState(false);
  const ConfirmRidePopupPanelRef = useRef(null);


  const ridePopupPanelRef = useRef(null);

  useEffect(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ridePopupPanel]);
  useEffect(() => {
    if (ConfirmRidePopupPanel) {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ConfirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [ConfirmRidePopupPanel]);

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
    <div className="h-screen relative">
      <div className="absolute top-5 left-5 z-10 transition-opacity duration-300">
        <img className="w-16 mb-10" src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      </div>
      {/* Home Link */}
      <Link
        to="/captain-login"
        className="fixed right-2 top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full"
      >
        <i className="ri-logout-box-r-line"></i>
      </Link>

      {/* Top Section */}
      <div className="h-3/5">
        <img
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Bottom Section */}
      <div className="h-2/5 p-4">
        {/* Ride Info */}
        <div className="flex items-center justify-between gap-4 mb-10">
          <div className="flex items-center justify-between gap-4">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src="https://rahahome.com/wp-content/uploads/2022/11/2-min-scaled.jpg"
              alt=""
            />
            <h4 className="text-lg font-medium">Amit Mamgai</h4>
          </div>
          <div className="text-center">
            <h4 className="text-lg font-medium">₹200</h4>
            <p className="text-sm text-gray-600">Earned</p>
          </div>
        </div>

        <CaptainDetails />
      </div>

      {/* RidePop Component */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full h-auto mb-2 bottom-0 bg-white px-3  pt-4 z-50"
      >
        <RidePop
          setRidePopupPanel={setRidePopupPanel}

        />
        <div
        ref={ConfirmRidePopupPanelRef }
        className="fixed w-full h-auto mb-2 bottom-0 bg-white px-3  pt-4 z-50"
      >
        < ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}

        />
      </div>
    </div>
    </div>
  );
};

export default CaptainHome;