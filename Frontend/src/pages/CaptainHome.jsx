import React, { useRef, useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import gsap from "gsap";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import MapBackGround from "../components/MapBackGround";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from "../context/CaptainContext";
const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(true);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const{socket} = useContext(SocketContext);
  const{captain} = useContext(CaptainDataContext);

  useEffect(() => {
      console.log("Full user object:", captain);
      console.log(" user id:", captain.captain._id);
      console.log("user name", captain.captain.fullname.firstname);

      socket.emit("join", {
          userId: captain?.captain?._id,  // Notice the double nesting
          userType: "captain"
      });
  }, [captain]);

  // Animation for RidePop panel
  useEffect(() => {
    if (ridePopupPanel) {
      gsap.to(ridePopupPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(ridePopupPanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [ridePopupPanel]);

  // Animation for ConfirmRidePopUp panel
  useEffect(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power3.out",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power3.in",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Header Section */}
      <div className="absolute top-5 left-5 z-10">
        <img
          className="w-16 mb-10"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt="Uber Logo"
        />
      </div>

      {/* Logout Button */}
      <Link
        to="/captain-login"
        className="fixed right-2 top-5 h-10 w-10 bg-white flex items-center justify-center rounded-full shadow"
      >
        <i className="ri-logout-box-r-line"></i>
      </Link>
    <div className="h-3/5">
      {/* Map Section */}
      <MapBackGround />
</div>
      {/* Captain Details */}

        <CaptainDetails />

      {/* RidePop Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full h-auto bottom-0 bg-white px-4 py-6 z-50 transform translate-y-full shadow-lg"
      >
        <RidePop
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        />
      </div>

      {/* ConfirmRidePopUp Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed w-full object-cover top-0 bg-white px-6   z-50 transform translate-y-full shadow-lg"
      >
        <ConfirmRidePopUp
          setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
