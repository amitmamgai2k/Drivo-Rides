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
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const[ride,setRide] = useState(null)

  const ridePopupPanelRef = useRef(null);
  const confirmRidePopupPanelRef = useRef(null);
  const{socket} = useContext(SocketContext);
  const{captain} = useContext(CaptainDataContext);



  // useEffect(() => {
  //   socket.on("new-ride", (data) => {
  //     console.log("Ride request received:", data);
  //         setRide(data);
  //         setRidePopupPanel(true);


  //   })
  // }, []);

  useEffect(() => {
      socket.emit("join", {
          userId: captain?.captain?._id,  // Notice the double nesting
          userType: "captain"
      });
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
      updateLocation();

     //return () => clearInterval(locationInterval);

  }, []);
  socket.on('new-ride', (data) => {
    console.log("Ride request received:", data);
        setRide(data);
        setRidePopupPanel(true);


  })

 async function confirmRide() {
const response  = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {

  rideId:ride._id,
  captainId:captain.captain._id,


},{headers: {
  Authorization: `Bearer ${localStorage.getItem('token')}`,
}})
 setConfirmRidePopupPanel(true);
 setRidePopupPanel(false);

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
    <div className="h-screen ">
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
    <div className="h-2/5 p-6">   <CaptainDetails /></div>


      {/* RidePop Panel */}
      <div
        ref={ridePopupPanelRef}
        className="fixed w-full h-auto bottom-0 bg-white px-4 py-6 z-50 transform translate-y-full shadow-lg"
      >
        <RidePop
        ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
           confirmRide = {confirmRide}
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
