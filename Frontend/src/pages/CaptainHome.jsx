import React, { useRef, useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import gsap from "gsap";
import logo from "../assets/logo.png";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import MapBackGround from "../components/MapBackGround";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const[ride,setRide] = useState(null)

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const{socket} = useContext(SocketContext);
  const{captain} = useContext(CaptainDataContext);




  useEffect(() => {
    // Check if captain data exists
    if (!captain?.captain?._id) {
        console.log("Waiting for captain data...");
        return;
    }

    console.log("Captain data loaded:", captain?.captain?._id);

    // Join socket room
    socket.emit("join", {
        userType: "captain",
        userId: captain.captain._id,
    });

    // Location update function



    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {


      socket.emit("update-location-captain", {
        userId: captain?.captain?._id,
        location: {
          latitude:position.coords.latitude,
          longitude:position.coords.longitude
        }

      });
        });
      }
    };
    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation(); // Initial update

    // Cleanup
    return () => clearInterval(locationInterval);

}, [captain, socket]); // Add captain to dependencies


useEffect(() => {
  if (!captain?.captain?._id) {
    console.log("Waiting for captain data...");
    return;
  }
  console.log("Captain data loaded:", captain?.captain?._id);
}, [captain]);

socket.on('new-ride', (data) => {
  console.log("Ride request received:", data);
      setRide(data);
      setRidePopupPanel(true);


})
  async function confirmRide() {
    // Add the captain's ID before making the API request
    // console.log("Ride id :", ride._id);
    console.log("Captain  id:", captain.captain._id);
    const captainId = captain.captain._id;


    if (!captainId) {
      console.error("Captain ID is missing.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId:  captain.captain._id, // Manually include captain's ID
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });


      setRide(response.data.data);
      console.log("Ride confirmed:", response.data);
      setConfirmRidePopupPanel(true);
      setRidePopupPanel(false);
    } catch (error) {
      console.error("Error confirming ride:", error.response?.data || error.message);
    }
  }




  // Animation for RidePop panel
  useEffect(function () {
    if (ridePopupPanel) {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(0)'
        })
    } else {
        gsap.to(ridePopupPanelRef.current, {
            transform: 'translateY(100%)'
        })
    }
}, [ ridePopupPanel ])


  // Animation for ConfirmRidePopUp panel
  useEffect(() => {
    if (confirmRidePopupPanel) {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopupPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePopupPanel]);

  return (
    <div className="h-screen ">
      {/* Header Section */}
      <div className="absolute top-4 left-4 z-10">
        <img

          src={logo} height={80} width={150}
          alt="Uber Logo"
        />
      </div>

      {/* Logout Button */}
      <Link
        to="/captain-login"
        className="fixed right-0 mr-10 top-5 h-10 w-10 object-contain bg-white flex items-center justify-center rounded-full shadow z-30"
      >
        <i className="ri-logout-box-r-line"></i>
      </Link>
    <div className="h-3/6">
      {/* Map Section */}
      <MapBackGround />
</div>
      {/* Captain Details */}
    <div className="h-3/6 p-6">   <CaptainDetails /></div>


      {/* RidePop Panel */}

{/* Ride Popup Panel */}
<div
    ref={ridePopupPanelRef}
    className="fixed w-full max-h-[90vh] overflow-y-auto bottom-0 bg-white px-4 py-6 transform translate-y-full shadow-lg z-50"
>
    <RidePop
        ride={ride}
        setRidePopupPanel={setRidePopupPanel}
        setConfirmRidePopupPanel={setConfirmRidePopupPanel}
        confirmRide={confirmRide}
    />
</div>
      {/* ConfirmRidePopUp Panel */}
      <div
        ref={confirmRidePopupPanelRef}
        className="fixed  w-full h-screen bottom-0 bg-white px-6   z-50 transform translate-y-full  shadow-lg"
      >
        <ConfirmRidePopUp
             ride={ride} setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
