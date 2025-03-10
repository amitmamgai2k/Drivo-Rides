import React, { useRef, useState, useEffect,useContext } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import CaptainDetails from "../components/CaptainDetails";
import RidePop from "../components/RidePop";
import gsap from "gsap";
import logo from "../assets/logo.png";
import sound from "../assets/messageNoti.mp3";

import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import MapBackGround from "../components/CaptainMap";
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from "../context/CaptainContext";
import DropdownMenu from "../components/CaptainMenu/DropDownMenu";
import axios from "axios";
import { Menu } from "lucide-react";
import toast from "react-hot-toast";

const CaptainHome = () => {
  const navigate = useNavigate();
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
 const[menuOpen,setMenuOpen] = useState(false)
  const [panelOpen, setPanelOpen] = useState(false);
  const[ride,setRide] = useState(null)

  const notificationSound = useRef(new Audio(sound));


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


useEffect(() => {
  // Function to handle new ride
  const handleNewRide = async (data) => {
    console.log("Ride request received:", data);
    setRide(data);

    try {
      await notificationSound.current.play();
    } catch (error) {
      console.error("Error playing sound:", error);
    }
    setRidePopupPanel(true);
  };

  socket.on('new-ride', handleNewRide);

  return () => {
    socket.off('new-ride', handleNewRide);
  };
}, [socket]);
 useEffect(() => {
  const cancleRide = (data) => {
    console.log("Ride cancelled:", data);
    setConfirmRidePopupPanel(false);
    navigate('/captain-home');
    setRide(null);

    toast('Ride Cancle by the Rider ');
  }
   socket.on('ride-cancelled',cancleRide)
   return () => {
    socket.off('ride-cancelled', cancleRide);
  };
 },[socket])
  async function confirmRide() {

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
  const toggleMenu = (state) => {
    setMenuOpen(state !== undefined ? state : !menuOpen); // Toggle menu state
  };
  return (
    <div className="h-screen w-full  ">
      {/* Header Section */}
      <div className={`absolute top-5 left-1 right-3 z-10 transition-opacity duration-300 flex flex-row justify-between items-center ${
    panelOpen ? 'opacity-0' : 'opacity-100'
  }`}>
        <img

          src={logo} height={80} width={150}
          alt="Uber Logo"
        />
          <button className="text-3xl font-semibold bg-white  p-2 rounded-lg opacity-60"  onClick={() => toggleMenu()}>
    <Menu size={35}  strokeWidth={2} />
  </button>
      </div>

      <DropdownMenu isOpen={menuOpen} toggleMenu={toggleMenu} />

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
